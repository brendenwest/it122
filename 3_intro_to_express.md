Intro to Express
****

Reading
####
- Brown - Chapter 3
- https://expressjs.com/en/starter/installing.html (through static files)
- https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application

Watch
####
- https://www.linkedin.com/learning/express-essential-training?u=2359778

Reference
####
- https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm
- https://expressjs.com/en/guide/routing.html 
- https://ejs.co/

Practice
####
- https://learn.freecodecamp.org/apis-and-microservices/basic-node-and-express

Learning Outcomes
####
- Installing & configuring Express
- Working with routes
- Views & templating
- Processing form submissions

Express
####
Express provides 'scaffolding' to handle routine web server tasks, so you can focus on code specific to your application

First be sure to install current version of Express & update your package.json file:
::

    npm install express

Also make sure to exclude any node modules from your git repository, by adding this to your **.gitignore** file:
::

    #ignore files installed by npm
    node_modules

Now, your main application can be defined as an Express instance with configuration:
::

    'use strict'
    import express from 'express';

    const app = express();
    app.set('port', process.env.PORT || 3000);
    app.use(express.static('./public')); // set location for static files
    app.use(express.urlencoded()); //Parse URL-encoded bodies

Route handlers are specified with app.get() or app.post(), & error handlers w/ app.use():
::

    // send static file as response
    app.get('/', (req,res) => {
      res.type('text/html');
      res.sendFile('./public/home.html');
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


Routes Overview
####

Routes are `virtual` urls - functions that receive a request & return a response. Routes don’t necessarily correspond to a physical page on the web site.

Routes can be exclusive, or can use the `next` method to pass control to the next applicable route in sequence. For example:
::

    app.get('/foo', (req,res,next) => {
           if(Math.random() < 0.5) return next();
           res.send('sometimes this');
    });
    app.get('/foo', (req,res) => {
           res.send('and sometimes that');
    });


or
::

    app.get('/foo',
           (req,res, next) => {
                   if(Math.random() < 0.5) return next();
                   res.send('red');
           },
           (req,res, next) => {
                   if(Math.random() < 0.5) return next();
                   res.send('green');
           },
    )


Route paths can contain regular expressions to match variations. For example, the below route would match /user or /username:
::

    app.get('/user(name)?', (req,res) => {
           res.render('user');
    });

Express routes support a subset of regular expression metacharacters: +, ?, *, (, and )

Routes can include parameters that are automatically added to the request.parameters collection:
::

    app.get('/user/:name', (req, res) => {

           let info = users.find((user) => {

               return user.name = req.params.name;

           })

           if(!info) return next();        // will eventually fall through to 404

           res.send(info);

    })

As your application grows, the number of routes can grow to the point where your main application file is un-readable. You can improve readability by organizing routes into a separate module:

In the main Express application file:
::

    import routes from './routes.js';
    const app_routes = routes(app); // passes ‘app’ instance to the routes module


In your `routes.js` file:
::

    export default = (app) => {
           app.get('/', (req,res) => {
                   app.render('home');
           }))
           //… other routes
    };


Query Strings & Form submissions
####

Express simplifies the work of handling querystring data and form submissions.

You can access querystring values with the req.query object like so:
::

    app.get('/get', (req,res) => {
      console.log(req.query); // display parsed querystring object
    });

The `express.urlencoded` method allows you to access form submissions with the `req.body` object like so:
::

    app.post('/get', (req,res) => {
      console.log(req.body); // display parsed form submission
    });
 
Templates
####

Express can use a template engine to render dynamic pages with information that differs with each request.

There are several engines to choose from but let's start with EJS.

First install EJS in your project:
::

    npm install ejs

Next, update your server application to use the EJS engine and render an HTML 'view' to the client :
::

    // set the view engine to ejs
    app.set('view engine', 'ejs');

    // send content of 'home' view to browser
    app.get('/', (req,res) => {
     res.render('home');
    });

- Express expects the views in a `/views` sub-folder
- Express can use partials for elements to display on multiple pages.
- EJS expects views and partials files to have a **.ejs** file extension,

Express can render the view with dynamic content passed as a JSON object: 
::

    // send content of 'home' view
    app.get('/get', (req,res) => {
     let result = book.getItem(req.query.title);
     res.render('details', {title: req.query.title, result: result });
    });

EJS uses <%=  %> syntax to identify placeholders in HTML that should be replaced with dynamic information. For example:
::
    <h2>Book title: <%= title %></h2>

Where 'title' is provided to the template by the `render()` command.

EJS templates can support basic programmatic operations like loops and flow control. Block commands are prefaced with # and end with /.
::

    <% if (title) { %>
      <h2>Book title: <%= title %></h2>
    <% } else { %>
      <h2>Please enter a title</h2>
    <% } %>

EJS supports loops. For example, if we have 'books' array, where each array item has a 'title' property:
::

      <% books.forEach(function(book) { %>
        <li> <%= book.title %> </li>
      <% }); %>


If the value for a given property is an object, you can use dot notation to reference its properties:
::

    <% if (result) { %>
        <li>Title: <%= result.title %>
        <li>Author: <%= result.author %>
        <li>Pubdate: <%= result.pubdate %>
    <% } else { %>
        not found
    <% } %>

Passing JavaScript Code
####

Sometimes it's useful to pass JavaScript data to a EJS template, so it can be used by scripts in the HTML. For example, the server might render data like so:
::

    let names = ['david','sue','aisha'];
    app.get('/', (req,res) => {
      res.type('text/html');
      res.render('home', {names: JSON.stringify(names)});
    });
    
Where the EJS template might look like this:
::

    <script>
    <% if (names) { %>
       var names = <%- names %>
       console.log(names.length())
    <% } %>
    </script>