
Express Blogger
===

A markdown based, git managed, express run, responsive blogging engine; blogging for node.js hackers. 

Get a fully customizable blog deployed in minutes using git source control and [Heroku](https://www.heroku.com/). 

Getting Started
===

### Install grunt-cli:


Follow [this guide](http://gruntjs.com/getting-started) to get up and running with Grunt.

### Run the application for local development


The following default command will start the express server, compile less, intitialize the blogging engine, and watch for changes in .js and .hbs files to automatically restart the server. 

    grunt

Visit [localhost:5000](http://localhost:5000) to view your blog

Customize
===

### Style


`/public/css/main.css` is compiled from LESS source files in `/less`:

    less
    ├── color.less
    ├── frameless.less
    ├── layout.less
    ├── main.less
    └── text.less

Files in the less directory are named according to their function. [`frameless.less`](http://framelessgrid.com/) is used for a column-based responsive layout defined in `layout.less`. 

When running your local server with `grunt`, changes to less files will automatically re-compile to `/public/css/main.css`

### Layout


Layouts are defined in `/views`:

    views
    ├── article.hbs
    ├── category.hbs
    ├── home.hbs
    └── layouts
        └── index.hbs

`index.hbs` is the main layout containing the navigation column, external links, header, and footer. Update this file to point towards your social media urls, rss feed, etc. All .svg icons in `/svgs` are available within templates by inserting {{{icon "{file-name}"}}}.

Direct children of `views` occupy the `{{{body}}}` tag within `index.html`. They are used as indicated by the file name. 


Writing a Post
===

Run

    grunt post

Follow the prompts for title and category. The file will open in your default markdown text editor. 

All articles are located in `/articles`. Each file must have a header containing at least title and date in yaml format followed by an empty line:

    title: {title}
    category: {category}
    date: {date}


Posts with the same category will be displayed together by navigating to http://{host}/{category}. Categories are automatically added to the navigation bar. 

Express Blogger parses markdown and converts it to HTML for display. 

`<pre>` tags are also colored using [pretty print]() for nice readable code snippets. Indent twice after an empty line or use "`" to denote code. 

[Learn more about markdown.](https://daringfireball.net/projects/markdown/basics).

Commit your new article: 
  
    git add . 
    git commit -m 'your message here'

and push it to your production server

Deploy to Heroku
===

This package includes a Procfile which will start the application when deployed to a Heroku dyno. Follow [this guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs) to setup a node application.

###Check it out, you're ready to blog! 

###Thanks to:

[toto](http://cloudhead.io/toto) a ruby blogging engine by which this was inspired.
[frameless](https://github.com/jonikorpi/Frameless) for providing the em based columns
and the wonderful node.js community providing these awesome tools. 


###license

The MIT License (MIT)

Copyright (c) 2014 chris \*\*\*\* at \*\*\*\* christopher-meyer.me

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
