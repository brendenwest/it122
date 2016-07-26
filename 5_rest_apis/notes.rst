Week 5 - REST API's & Scraping
####

Reading
####
- Brown, Ch. 14 - Routing
- Brown, Ch. 15 - REST APIs
- Brown, Ch. 19 - 3rd party APIs
- Cheerio - https://github.com/cheeriojs/cheerio
 

Topics
####
- Organizing routes
- REST API’s overview
- Building an API
- Integrating with 3rd party APIs
- Web Scraping 
 

Twitter credentials
####
This week, we'll explore Node.js interaction with Twitter's REST api's. If you want to follow along and run the code yourself, you will need to obtain Twitter access credentials by following these steps:

1 - make sure you have a Twitter account,
2 - go to https://apps.twitter.com/ and sign in,
3 - create a new app. Read-only permissions are fine.
4 - go to the app details screen and select 'keys & access tokens' tab,
5 - copy the 'Consumer Key' and 'Consumer Secret' values,
6 - add these values into the 'credentials.js' file provided in my sample code. DO NOT share these values or commit credentials.js to your github repo.

 

Routes overview
####

Routes are ‘virtual’ handlers for URLs that might receive a user’s request. Routes don’t necessary correspond to a physical page on the web site.

Routes can be exclusive, or can use the ‘next’ method to pass control to the next applicable route in sequence. For example:

app.get('/foo', function(req,res,next){
       if(Math.random() < 0.5) return next();
       res.send('sometimes this');
});
app.get('/foo', function(req,res){
       res.send('and sometimes that');
});

 

Or

app.get('/foo',
       function(req,res, next){
               if(Math.random() < 0.5) return next();
               res.send('red');
       },
       function(req,res, next){
               if(Math.random() < 0.5) return next();
               res.send('green');
       },
)

 

Route paths can contain regular expressions, to match variations. For example, the below route would match /user or /username:

app.get('/user(name)?', function(req,res){
       res.render('user');
});

Express route paths support a subset of regular expression metacharacters: +, ?, *, (, and )

 

Routes can include parameters that are automatically added to the request.parameters collection:

 

app.get('/user/:name', function(req, res) {

       var info = users.find(function(user){

           return user.name = req.params.name;

       })

       if(!info) return next();        // will eventually fall through to 404

       res.send(info);

})




As your application grows, the number of routes can grow to the point where your main application file is un-readable. You can improve readability by organizing routes into a separate module:

 

In the main Express application file:

var routes = require('./routes.js')(app); // passes ‘app’ instance to the routes module


In your routes.js file:

 

module.exports = function(app){

       app.get('/', function(req,res){
               app.render('home');
       }))

       //… other routes

};




API’s overview

 

REST - stateless connection between client & server

 

API’s can return data in any format. Common formats are XML & JSON. JSON easier to work with. Express can return a json response like this, where the portion in parens is any valid json data:

 

res.json(

[

{

“name”: “jim”,

“age’: 32,

},

{

“name”: “sue”,

“age”: 27,

},

]

);




Why bulld an API?
####
Allows wide adoption of your data, including mobile devices, native apps, and 3rd party apps.

Planning your api

 

You can use a combination of HTTP method (e.g. POST, PUT, GET) and url to distinguish api calls. For example, both api routes below would accomplish the same goal,. The first requires the specific item identifier in the URL:

 

DEL /api/book/:title

 

POST /api/book/delete/




Your API should provide appropriate error status and message to the client. Client will determine what to do with the error information.

 

Your API should allow cross-origin resource sharing for appropriate routes, so it can be used by applications not on your web-site domain:

app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route

Your list application will likely have API handling for these basic methods. The field used to identify unique list items will be specific to your application. These are similar to routes we set up previously, but simpler and return only data or an error response.




Get all items
 

GET /api/books

 

app.get('/api/books', function(req,res){

  var books = book.getAll(); // return all items in book array

  if (books) {

// res.json sets appropriate status code and response header

  res.json(books);

  } else {

      return res.status(500).send('Error occurred: database error.');

  }

});

 

Get a single item by specified key property
 

GET /api/book/:title

 

Add or Update item
 

POST /api/book/:title

 

Delete item by key property
 

DEL /api/book/:title




Note:

API routes that operate on a single item can have the item identifier in the URL, as in the above examples, or can derive the identifier from the request parameters (GET requests) or request body (POST requests)
Our textbook suggests using PUT method for updating. This is optional and useful in more complicated systems.
 

- you may want to filter item data in the API response, to avoid exposing internal information that clients shouldn’t see:

 

res.json(books.map(function(a){

           return {

               title: a.title,

               author: a.author,

               description: a.description

           }

       });

});


Remember - the Array.map() method maps array items to a new array according to your custom logic.