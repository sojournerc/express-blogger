
__Express Blogger__

A markdown based, git managed, express run, responsive blogging engine; blogging for node.js hackers. 

Get a fully customizable blog deployed in minutes using git source control and [Heroku](https://www.heroku.com/). 

**Getting Started**

__Clone this repository:__

    git clone git@github.com:sojournerc/express-blogger.git your_blog/ 
    cd your_blog/
    npm install

__Install grunt-cli:__

Follow this guide to get up and running with [Grunt. Getting Started](http://gruntjs.com/getting-started)

_Run the application for local development_

The following default command will start the express server, compile less, intitialize the blogging engine, and watch for changes in .js and .hbs files to automatically restart the server. 

    grunt

Visit [localhost:5000](http://localhost:5000) to view your blog


**Writing a Post**

Run

    grunt post

Follow the prompts for title and category. The file will open in your default markdown text editor. 

**Deploy to Heroku**

TODO



/**
Thanks to:
[toto](http://cloudhead.io/toto) a ruby blogging engine by which this was inspired.
[frameless](https://github.com/jonikorpi/Frameless) for providing the em based columns
and the wonderful node.js community providing these awesome tools. 
*/

The MIT License (MIT)

Copyright (c) 2014 chris **** at **** christopher-meyer.me

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
