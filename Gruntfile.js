module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-open');

    var yaml = require('js-yaml');
    var formatDate = require('./lib/format-date');

    var config = {
        watch: {
            css: {
                files: ['**/*.less'],
                tasks: ['less']
            }
        },
        less: {
            dev: {
                options: {
                    // compress: true,
                    // cleancss: true,
                    // sourcemap: true,
                    // ieCompat: false
                },
                files: {
                    "public/css/main.css": "less/main.less"
                }
            }
        },
        concurrent: {
          dev: {
            tasks: ['nodemon', 'watch'/*, 'node-inspector'*/],
            options: {
              logConcurrentOutput: true
            }
          }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    // nodeArgs: ['--debug'],
                    ignoredFiles: ['node_modules/**', 'public/**', 'build/**'],
                    watchedExtensions: ['js','hbs'],
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
        svgstore: {
            options: {
                prefix : 'icon-', // This will prefix each ID
                svg: {
                    class: 'svg-import'
                }
            },
            dflt : {
              files: {
                'svgs/combined-icons.svg': ['svgs/*.svg'],
              },
            },
        },
        write_post: {
            dir: 'articles',
            options: {}
        },
        open: {}
    };
    grunt.registerTask('default', ['less','concurrent']);

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