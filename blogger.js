var _ = require('underscore');
var fs = require('fs');
var yaml = require('js-yaml');
var marked = require('marked'); 
var formatDate = require('./lib/format-date');
var XMLWriter = require('xml-writer');
var Handlebars = require('express3-handlebars');

module.exports = function (options) {
    // DEFAULTS
    options = _.extend({}, 
    {
      file_ext: '.md',
      summary_length: 500,
      article_path: 'articles',
      date_pattern: 'dd MMM, YYYY',
      rss_out: 'public/rss.xml',
      site: {
        blog_name: 'An Express Blogger Site',
        blog_description: 'Blog in node.js with express in minutes - without a database',
        blog_url: 'http://your-url-here.com',
        blog_category: '',
      }
    }, options);

    var articles = [];
    var article_categories = [];
    this.parseArticles = function () {
      // make sure all paths for article are using defined file_ext
      var article_paths = _.filter(fs.readdirSync(__dirname + '/' + options.article_path), function (path) {
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

    this.writeXMLForRSS = function () {
      var xw = new XMLWriter();
      xw.startDocument('1.0', 'UTF-8');
      
      // header 
      xw.startElement('rss').writeAttribute('version', '2.0');
      
      //channel
      xw.startElement('channel').writeElement('title', options.site.blog_name)
        .writeElement('link', options.site.blog_url)
        .writeElement('description', options.site.blog_description)
        .writeElement('category', options.site.blog_category)
        .writeElement('lastBuildDate', new Date().toString());
      
      //posts
      articles.forEach(function (article, i) {
        xw.startElement('item');
        xw.writeElement('title', article.meta.title);
        xw.writeElement('description', article.summary);
        xw.writeElement('link', options.site.blog_url + '/' + article.meta.path);
        xw.endElement();
      });

      fs.writeFileSync(options.rss_out, xw.toString());
    };

    this.routeRequests = function (app) {
      var getMatchingArticles = function (req_path) {
        if (req_path === '') {
          return articles;
        }
        return _.filter(articles, function (article) {
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
        var categories = [], is_category;
        article_categories.forEach(function (cat) { 
          var ret_cat = { name: cat };
          if (cat === req_path) { 
            is_category = cat;
            ret_cat.selected = true; 
          }
          categories.push(ret_cat);
        });
        
        var data = { 
          articles: matching_articles, 
          article: (matching_articles.length === 1) ? matching_articles[0] : false,
          
          categories: categories,
          category: (is_category) ? is_category : false,
          
          site: options.site,

          svg_source: fs.readFileSync('svgs/combined-icons.svg'),

          helpers: {
            format_date: function (opt) {
              var d = opt.fn(this);
              return formatDate(new Date(d), options.date_pattern);
            },

            icon: function (icon) {
              return '<svg viewBox="0 0 32 32" class="icon '+ icon +'"><use xlink:href="#' + icon + '"/></svg>';
            }
          }
        };

        var view; 
        if (req_path === '') { view = 'home'; } 
        else if (is_category) { view = 'category'; } 
        else { view = 'article'; }

        return res.render(view, data);
      };
     
      /**
       * Handle Request Paths
       */
      app.get('*', handleRequest);
    };

    this.init = function (app) {
      this.parseArticles();
      this.writeXMLForRSS();
      this.routeRequests(app);
    };

    return this;
};
