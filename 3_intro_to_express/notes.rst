Intro to Express
****

Reading
####
- Brown, Ch. 3 - Express
- Brown, Ch. 4 - npm & modules 
- Brown, Ch. 6 - Request & Response objects

Summary
####
- Installing Express & dependencies
- Configuring Express app (port, static folder)
- Working with routes
- Basic templating
- Processing forms

Express
####
Express provides 'scaffolding' to handle routine web server tasks, so you can focus on code specific to your application

First be sure to install current version of Express & update your package.json file:

    npm install --save express

Also make sure to exclude any node modules from your git repository, by adding this to your **.gitignore** file:

    #ignore files installed by npm
    node_modules

Now, your main application can be defined as an Express instance with configuration:

    'use strict'
    const express = require("express");
    const app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(__dirname + '/public')); // set location for static files

Route handlers are specified with app.get() or app.post(), & error handlers w/ app.use():

    // send static file as response
    app.get('/', function(req,res){
     res.type('text/html');
     res.sendFile(__dirname + '/public/home.html'); 
    });
    
    // send plain text response
    app.get('/about', function(req,res){
     res.type('text/plain');
     res.send('About page');
    });
    
    // define 404 handler
    app.use(function(req,res) {
     res.type('text/plain'); 
     res.status(404);
     res.send('404 - Not found');
    });

Note - the order of routes is important, so more specific routes should be listed before more generic routes. 

Once defined, the web server can be started like so:

    app.listen(app.get('port'), function() {
     console.log('Express started'); 
    });

Query & Forms handling
####

Express simplifies the work of getting querystring data and form submissions.

You can access querystring values with the req.query object like so:

    app.get('/get', function(req,res){
      console.log(req.query); // display parsed querystring object
    });

The body-parser plugin allows you to access form submissions with the req.body object like so:

    app.post('/get', function(req,res){
      console.log(req.body); // display parsed form submission
    });
 
Views & templating
####

Express can use a 'view' to render dynamic information that differs with each request. 

- Views can be composed of one or more 'layouts'.
- Express expects the views in a /views folder, and layouts in /views/layouts

If using handlebars, views and layouts are expected to have a **.handlebars** file extension but you can override that,

Views must be in the location and format required by the view engine you specify for the app. 

    let handlebars =  require("express-handlebars");
    app.engine(".html", handlebars({extname: '.html'}));
    app.set("view engine", ".html");

The Express render method sends a view in the client response:

    // send content of 'home' view
    app.get('/', (req,res) => {
     res.render('home');
    });

Express can render the view with dynamic content passed as a JSON object: 

    // send content of 'home' view
    app.get('/get', (req,res) => {
     let result = book.get(req.query.title);
     res.render('details', {title: "Dune", result: result });
    });

Where a /views/details.html template has {{ }} to identify placeholders to be replaced by values from the JSON object:

    <html>
    <body>
      <h2>Details for {{title}}</h2>
      {{#if result}}
        <li>Title: {{ result.title }}
        <li>Author: {{ result.author }}
        <li>Pubdate: {{ result.pubdate }}
      {{else}}
        not found
      {{/if}}
    </body>
    </html> 

We'll cover handlebars syntax in more detail later, but note:

- you can reference properties of the JSON object passed to the view,
- if the property is itself an object, you can use dot notation to reference its properties,
- handlebars supports conditional logic such as if...else