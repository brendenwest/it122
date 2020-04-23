Intro to Express
****

Reading
####
- D'Mello - Introducing Express
- https://github.com/express-handlebars/express-handlebars

Watch
####
- https://www.linkedin.com/learning/express-essential-training?u=2359778

Reference
####
- https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm  
- https://expressjs.com/en/starter/static-files.html 
- https://expressjs.com/en/starter/basic-routing.html 
- https://expressjs.com/en/guide/routing.html 
- https://handlebarsjs.com/

Summary
####
- Installing Express & dependencies
- Configuring Express app (port, static folder)
- Working with routes
- Basic templating
- Processing forms

Practice
####
- https://learn.freecodecamp.org/apis-and-microservices/basic-node-and-express

Learning Outcomes
####
- Installing Express
- configuring app (port, static folder)
- routes - get, post, use
- routes - ordering and wildcards
- Views & templating
- Processing forms

Express
####
Express provides 'scaffolding' to handle routine web server tasks, so you can focus on code specific to your application

First be sure to install current version of Express & update your package.json file:
::

    npm install --save express

Also make sure to exclude any node modules from your git repository, by adding this to your **.gitignore** file:
::

    #ignore files installed by npm
    node_modules

Now, your main application can be defined as an Express instance with configuration:
::

    'use strict'
    const express = require("express");
    const bodyParser = require("body-parser")
    
    const app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(express.static(__dirname + '/public')); // set location for static files

Route handlers are specified with app.get() or app.post(), & error handlers w/ app.use():
::

    // send static file as response
    app.get('/', (req,res) => {
     res.type('text/html');
     res.sendFile(__dirname + '/public/home.html'); 
    });
    
    // send plain text response
    app.get('/about', (req,res) => {
     res.type('text/plain');
     res.send('About page');
    });
    
    // define 404 handler
    app.use((req,res) => {
     res.type('text/plain'); 
     res.status(404);
     res.send('404 - Not found');
    });

**Note** - the order of routes is important, so more specific routes should be listed before more generic routes. 

Once defined, the web server can be started like so:
::

    app.listen(app.get('port'), () => {
     console.log('Express started'); 
    });

Query & Forms handling
####

Express simplifies the work of getting querystring data and form submissions.

You can access querystring values with the req.query object like so:
::

    app.get('/get', (req,res) => {
      console.log(req.query); // display parsed querystring object
    });

The **body-parser** plugin allows you to access form submissions with the req.body object like so:
::

    app.post('/get', (req,res) => {
      console.log(req.body); // display parsed form submission
    });
 
Templates
####

Express can use a 'view' to render dynamic information that differs with each request. 

- Views can be composed of one or more 'layouts'.
- Express expects the views in a **/views** folder, and layouts in /views/layouts
- express-handlebars expects views and layouts to have a **.handlebars** file extension but you can override that,
- Views must be in the location and format required by the view engine you specify for the app. 
::

    let exphbs =  require("express-handlebars");
    app.engine("handlebars", exphbs({defaultLayout: false}));
    app.set("view engine", "handlebars");

The Express **render** method sends a view to the client as HTML:
::

    // send content of 'home' view
    app.get('/', (req,res) => {
     res.render('home');
    });

Express can render the view with dynamic content passed as a JSON object: 
::

    // send content of 'home' view
    app.get('/get', (req,res) => {
     let result = book.get(req.query.title);
     res.render('details', {title: req.query.title, result: result });
    });

Handlebars uses {{ }} syntax to identify placeholders in HTML that should be replaced with dynamic information. For example:
::
    <h2>Book title: {{title}}</h2>

Where 'title' is a property of the JSON context object provided to the template by the render() command.

Handlebars templates can also have comments that won’t appear in the resulting HTML.
::
    {{! server-side comment }}

A template **block** can perform basic programmatic operations like loops and flow control. Block commands are prefaced with # and end with /.
::
    {{! if..else block }}
    {{#if title}}
      <h2>Book title: {{title}}</h2>
    {{else}}
      <h2>Please enter a title</h2>
    {{/if}}

Handlebars supports loops. For example, if we have 'books' array, where each array item has a 'title' property:
::
    {{#each books}}
     <li>{{title}}</li>
    {{/each}}

If the value for a given property is an object, you can use dot notation to reference its properties:
::
    {{#if result}}
        <li>Title: {{ result.title }}
        <li>Author: {{ result.author }}
        <li>Pubdate: {{ result.pubdate }}
    {{else}}
        not found
    {{/if}}

Passing JavaScript Code
####

Sometimes it's useful to pass JavaScript data to a Handlebars template, so it can be used by scripts in the HTML. For example, the server might render data like so:
::
    var names = ['david','sue','aisha'];
    app.get('/', (req,res) => {
      res.type('text/html');
      res.locals.names = JSON.stringify(names);
      res.render('home');
    });
    
Where the Handlebars template might look like this:
::
    <script>
     {{#if json_data}}
       var names = {{{names}}}
       console.log(names.length())
     {{/if}}
    </script>