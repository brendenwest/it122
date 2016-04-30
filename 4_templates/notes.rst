Week 4 - Templates
####

Reading
####
- Brown, Ch. 7 - Templating w/ Handlebars
- Brown, Ch. 16 - Static files

Topics
####
- Templates overview
- Handlebars
  - Views
  - Layouts
  - Partials
  - Variables
  - Programmatic logic
  - Escaping code

Templates overview
####
You can use ‘templates’ in Node to send different content to the client, while keeping code and static layout (somewhat) separate.

Node uses a template engine to interpret templates, and can recognize a number of different engines. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an text response sent to the client. 

Handlebars -v- Jade - Handlebars templates can contain normal HTML and are more readable.
Handlebars

Installation
####

You can install server-side Handlebars like any other Node module:

npm install --save express-handlebars

Setup
####

You also need to tell your Node application what template engine to use:

var handlebars = require(‘express-handlebars’).create({defaultLayout: ‘main’ });
app.engine(‘handlebars’, handlebars.engine);
app.set(‘view engine’, ‘handlebars’ );

You can override the default file extension ‘.handlebars’ by passing this into the ‘create’ context object:

{ extname: ‘.hbs’ }.

Views
####

A template view represents an individual page. 

Express looks for views in the /views sub-directory


Layouts
####

Layouts are optional templates for templates, that allow sharing recurring layout between views.

Express looks for layouts in the /views/layouts sub-directory


Rendering views
####

app.get(‘/’, function(req, res) { 
	res.render(‘home’);  // renders home view using default layout
});

app.get(‘/’, function(req, res) { 
	res.render(‘home’, { layout: null }) // no layout;
});

app.get(‘/’, function(req, res) { 
	res.render(‘home’, { layout: ‘home’  }) // uses home.handlebars layout
});


Context variables
####

Variables are passed from Node to the Handlebars template in a context object that can contain any JavaScript objects. 

app.get(‘/’, function(req, res) { 
	res.render(‘home’, { name: ‘Dave’, children: [“amy”, “sue”, “fred”]  } ); 
});


Alternatively, you can use the response.locals object, which is passed to your rendering engine. Properties of the locals object will be 'global' in the render, so they can be referenced without prefix.

app.get(‘/’, function(req, res) { 
	res.locals.name = ‘Dave’;
	res.render(‘home’); 
});


Template Syntax
####

Handlebars uses {{ }} syntax to replace placeholders in HTML with variables. For example:

<p>Hello {{name}}</p>

A server-side Handlebars template can have comments that won’t appear in the resulting HTML.

{{! server-side comment }}

A template block can perform basic programmatic operations like loops and flow control. Block commands are prefaced with # and end with /.

{{#if name}}
  <h2>Hello {{name}}</h2>
{{else}}
  <h2>Please enter a name</h2>
{{/if}}


<ul>
{{#each children}}
  <!- write value of current context -->
  <li>{{.}} 
{{/each}}
</ul>

Context refers to the current item. You can reference the parent context with ../ syntax.



Partials
####

Partials render a portion of a page and allow reusing a UI component on multiple pages.

Partials are usually stored in /views/partials sub-directory.

You include a partial into a view like so:

{{> partial_name}}


Passing JS code
####

var my_data = { “name”:”david”, “age”:”23”}
 
app.get('/', function(req,res){
    res.type('text/html');
    res.locals.json_data = JSON.stringify(my_data);
    res.render('home' );    
});


<script>
    {{#if json_data}}
        var my_data = {{{json_data}}}
    {{/if}}
</script>



Exercises
####

- Create a default layout for your application with header & footer elements
- Implement a template comment that won’t appear in your final html
- Create a view for your home page that can display all items in your list
- Use #each to display info about each list item
- Use #if to show some information conditionally
- Pass a data array or dictionary to your html page for client-side execution
- Create a view, and corresponding route, to edit details of a list item
- Create a separate view for your about page
- Create a partial template you can include into each view
