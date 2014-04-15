module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-open');

    var yaml = require('js-yaml');
    var formatDate = require('./lib/format-date');

    var config = {
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    // nodeArgs: ['--debug'],
                    ignoredFiles: ['node_modules/**', 'public/**', 'build/**'],
                    watchedExtensions: ['js','md'],
                    // watchedFolders: ['server'],
                    // delayTime: 1,
                    // legacyWatch: true,
                    // env: {
                    //   PORT: '8181'
                    // },
                    // cwd: __dirname
                }
            }
        },
        prompt: {
            post: {
                options: {
                    questions: [
                        {
                            config: 'write_post.options.title',
                            type: 'input',
                            message: 'Title: '
                        },
                        {
                            config: 'write_post.options.category',
                            type: 'input',
                            message: 'Category: '
                        }
                    ]
                }
            }            
        },
        write_post: {
            dir: 'articles',
            options: {}
        },
        open: {}
    };
    grunt.registerTask('default', ['nodemon']);

    grunt.registerTask('post', ['prompt:post','write_post']);
    grunt.registerTask('write_post', function () {
        var config = grunt.config('write_post');

        var meta = config.options;
        var now = new Date();
        var slug = meta.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            slug = slug.replace(/^-|-$/g, ''); 
        var path = config.dir + '/' + formatDate(now, 'YYYY-MM-dd') + '-' + slug+ '.md';
        
        meta.date = formatDate(now, 'MM/dd/YYYY');
        var head = yaml.safeDump(meta);

        grunt.file.write(path,'---\n'+head+'\n');

        grunt.config('open.file.path', path);
        grunt.task.run('open:file');
    });

    grunt.registerTask('parse_articles', function () {
        var blogger = require('./blogger')().parseArticles();
    });

    // sets the configuration in grunt
    grunt.initConfig(config);
};