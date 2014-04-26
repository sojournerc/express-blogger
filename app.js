
var express = require('express'),
    app = module.exports.app = express(),
    http = require('http'),
    path = require('path'),
    exphbs  = require('express3-handlebars');
    Blogger = require('./blogger');

  // templating
var hbs = exphbs.create({
    defaultLayout: 'index',
    extname:".hbs"
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.enable('view cache');

// compress responses
app.use(express.compress());

// static assets
app.use(express.static(path.join(__dirname, 'public')));
// route pages
app.use(app.router);

// route requests to the blogger
new Blogger({
  // options go here 
  // blog_name: ''
}).init(app);

// handle errors
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'blurp, something went wrong');
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Listening on port ' + port);
