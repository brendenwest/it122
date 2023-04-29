## REST API's & Scraping


### Reading

- Brown - Ch. 15 REST APIs and JSON
- https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/
- Cheerio - https://github.com/cheeriojs/cheerio (optional)
 
### Watch

- [How to build a RESTful API with Node, Express, & MongoDB](https://www.youtube.com/watch?v=o3ka5fYysBM)

### Topics

- REST API’s overview
- Building an API
- Integrating with 3rd party APIs
- Web Scraping
- Calling API's from a browser client


### API’s overview

REST - stateless connection between client & server

API’s can return data in any format. Common formats are XML & JSON. JSON easier to work with. Express can return a json response like this, where the portion in parens is any valid json data:

    app.get('/api/students', (req,res) => {
        res.json(
            [
                { "name": "jim", "age": 32 },
                { "name": "sue", "age": 27 },
            ]
        );
    });


### Why bulld an API?

API's allow wide adoption of application data, including by mobile and single-page apps, and 3rd party users.

**Planning your api**

You can use a combination of HTTP method (e.g. POST, PUT, GET) and url to distinguish api calls. For example, both api routes below would accomplish the same goal,. The first requires the specific item identifier in the URL:

    DEL /api/book/:title

    POST /api/book/delete/

Your API should provide appropriate error status and message to the client so it can determine what to do with the error information.

Your API should allow **cross-origin resource sharing** for appropriate routes, so it can be used by applications not on your web-site domain:

First install the 'cors' package:

    npm install cors

Then update your server to use it:

    import cors from 'cors';
    app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

Your application will likely have API's corresponding to routes you set up previously, but simpler and returning only data or an error response.

For example this route:

    app.get('/api/books', (req,res) => {
        Book.find({}).lean()
          .then((books) => {
            res.json(books);
          .catch(err =>  {
            res.status(500).send('Database Error occurred');
          })
    });

Might return all books when invoked at http://localhost:3000/api/books

API routes can be designed to accept query-string parameters or url parameters as in this example:

    app.get('/api/books/:title', (req,res) => {
        Book.findOne({ title:req.params.title }).lean()
            .then((book) => {
               res.json(book);
            })
            .catch(err => {
                res.status(500).send('Database Error occurred');
            });
    });

might be invoked like so - http://localhost:3000/api/books/dune

#### Note:

- API routes that operate on a single item can have the item identifier in the URL, as in the above examples, or can derive the identifier from the request parameters (GET requests) or request body (POST requests)
- Some reference materials suggest using PUT method for update requests. This is optional.

You may want to filter item data in the API response, to avoid exposing internal information that clients shouldn’t see:

    res.json(books.map((a) => {
               return {
                   title: a.title,
                   author: a.author,
                   description: a.description

               }
           });
    });


Remember - the Array.map() method maps array items to a new array according to your custom logic.

### Making API requests

You can make requests from the browser client using `XMLHttpRequest` (AKA AJAX) or with the more modern `Fetch` functionality. 

`Fetch` is promised-based and has a simplified programming syntax compared to AJAX:

    fetch("/api/v1/books")
        .then((response) => response.json())
        .then(results => console.log(results));

- uses promises for asynchronous operations
- built-in processing of JSON results
- supports request configuration:


    let book = {title:'europe',author:'frommers',pubdate:1980}
    fetch("/api/v1/add/", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    })
        .then(res => res.json())
        .then((json) => { console.log(json) });

### Public API's

Many companies and institutions have public API's that developers can access. For example:

- https://www.programmableweb.com/
- https://data.seattle.gov/
- https://data.wa.gov/browse
- https://data.occrp.org/