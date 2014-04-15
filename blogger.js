var __ = require('underscore');
var fs = require('fs');
var yaml = require('js-yaml');
var marked = require('marked'); 
var formatDate = require('./lib/format-date');

module.exports = function (app, options) {
    options = __.extend({}, 
    // DEFAULTS
    {
      file_ext: '.md',
      summary_length: 500,
      article_path: 'articles',
      date_pattern: 'dd - MMM - YY'
    }, options);

    var articles = [];
    var article_categories = [];
    this.parseArticles = function () {
      // make sure all paths for article are using defined file_ext
      var article_paths = __.filter(fs.readdirSync(__dirname + '/' + options.article_path), function (path) {
        return new RegExp(options.file_ext +'$').test(path);
      });

      // each article is converted from markdown to html and processed for 
      // meta data in yaml date, category, author, and title 
      article_paths.forEach(function (path, i) {
        var article = {}; 

        // split out the meta data from the body
        var text = fs.readFileSync(__dirname + '/' + options.article_path + '/' + path, { encoding: 'utf8' });
        var split_text = text.split(/\n\n/);
        article.body = split_text.splice(1, split_text.length-1).join('\n\n');

        article.meta = yaml.safeLoad(split_text[0]);
        article.meta.path = path.replace(/\.md$/, '');

        // reject articles that don't have the appropriate information
        if (article.meta.date && article.meta.title && article.body) {

          article.summary = article.body.slice(0, options.summary_length);
          if (article.summary.length === 500) { article.summary_more = true; }
          article.summary = marked(article.summary);
          article.body = marked(article.body);

          article.meta.date = new Date(Date.parse(article.meta.date.replace('/','-')));
          
          if (article.meta.category && article_categories.indexOf(article.meta.category) === -1) 
            article_categories.push(article.meta.category);
          
          articles.push(article); 
        }
      });
    };
    this.parseArticles();

    this.routeRequests = function (app) {
      var getMatchingArticles = function (req_path) {
        if (req_path === '') {
          return articles;
        }
        return __.filter(articles, function (article) {
          return article.meta.path === req_path || article.meta.category === req_path;
        });
      };
      var handleRequest = function (req, res, next) {
        var req_path = req.originalUrl.replace(/^\//, '');
        var matching_articles = getMatchingArticles(req_path);
        // sort by date
        matching_articles.sort(function (a, b) {
          return b.meta.date.getTime() - a.meta.date.getTime();
        });
        var categories = {}, is_category, selected_category = {};
        article_categories.forEach(function (cat) { 
          if (cat === req_path) { 
            is_category = categories[cat] = true; 
            categories.selected_name = cat;
          }
        });
        var data = { 
          articles: matching_articles, 
          categories: categories,
          helpers: {
            format_date: function (opt) {
              var d = opt.fn(this);
              return formatDate(new Date(d), options.date_pattern);
            }
          }
        };
        var view; 
        if (req_path === '') {
          view = 'home';
        } else if (is_category) {
          view = 'category';
        } else {
          view = 'article';
        }

        return res.render(view, data);
      };
     
      /**
       * Handle Request Paths
       */
      app.get('*', handleRequest);
    };

    return this;
};
