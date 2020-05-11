Week 6 - Data Storage with MongoDB
####

Reading
####
- D'Mello - Persisting Data with MongoDB
- http://www.tutorialspoint.com/mongodb/mongodb_overview.htm
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose

Practice
####
- https://learn.freecodecamp.org/apis-and-microservices/mongodb-and-mongoose

Reference
####
- MongoDb - https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
- https://github.com/mongolab/mongodb-driver-examples/blob/master/nodejs/mongooseSimpleExample.js
- https://www.w3schools.com/nodejs/nodejs_mongodb.asp
- Mongoose - http://mongoosejs.com/docs/guide.html 

Learning Outcomes
####
- Data persistence overview
- Schema-less -v- relational databases
- Setting up MongoDB database and connection
- Data models with Mongoose
- Basic Data queries - create, find, update, delete

**Schema-less** (aka no-sql) databases work on concept of collections and documents, instead of tables and columns.

**Database** is a physical container for collections.

**Collection** - a group of documents. Similar to a SQL table, but has no defined schema.

**Document** - a set of key-value pairs in JSON format. Different documents can have different pairs. Can contain any valid JS datatypes (e.g. string, number, boolean, array, object, date)

Schema-less databases have several advantages over relational (aka structured or SQL) databases:

- lower upfront DB design effort. Easier to modify as requirements change,
- data in ready-to-use JSON format 

MongoDb
####
MongoDb is a popular schema-less database with well-defined frameworks for Node integration.

A hosted database on https://cloud.mongodb.com may be simplest (choose the free sandbox option). You should use a generic name for your database (e.g 'sccprojects') and create a collection specific to your class topic.

In order to connect to your hosted database from your node application, you should also:

- create a 'Database User' - be sure to use a name & password easy to remember
- set a 'universal' value in the IP whitelist

Alternatively, you can create a local database either on your PC or Cloud9, but that db will only be active while your application is running.


Mongoose
####
Schema-less databases offer great flexibility, but sometimes it’s useful to set some constraints on the data your application will use.

Mongoose is a popular object-relational mapping (ORM) framework for mapping Node application objects to MongoDb documents.

As with other npm modules you need to install mongoose for your application:
::
    npm install mongoose --save

Then define a data-model script file.These scripts are typically stored in a /models folder and named according to the data object they describe (e.g. Person.js). The data-model script describes how to connect to the database and how the data will be structured:
::

    const mongoose = require(‘mongoose’);

    // remote db connection settings. For security, connectionString should be in a separate file not committed to git
    //const connectionString = "mongodb+srv://<dbuser>:<dbpassword>@<cluster>.mongodb.net/test?retryWrites=true";

    // local db connection settings
    // const ip = process.env.ip || '127.0.0.1';
    // const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

    mongoose.connect(connectionString, { dbName: <dbname>, useNewUrlParser: true });

    mongoose.connection.on('open', () => {  console.log('Mongoose connected.');});

    // define Book model in JSON key/value pairs
    // values indicate the data type of each key
    const mySchema = mongoose.Schema({
        title: { type: String, required: true },
        author: String,
        count: Number,
        pubdate: Date,
        inStore: Boolean
    });

    module.exports = mongoose.model('Book', mySchema);

- the above example shows both local or remote database configuration, but you should use just one approach,
- mongoose assumes the collection name is a lower-case, plural version of the model name (e.g. 'books'). If your collection differs from this convention, you need to specify it explicitly,
- if using a remote database, the credentials (user name & password) should be stored in a separate file that's not committed into github, to ensure they remain private,
- ‘options’ describe connection settings such as how long the connection should remain active.

The data model can include custom methods:
::
    mySchema.methods.prefix = function() {
      // add some stuff to the users name
      this.name = ‘Mr. ‘ + this.name;
      return this.name;
    };

Your application scripts can perform database operations via the model, and using built-in mongodb methods like .save(), .find(), etc. Because database operations can be long running, they are invoked with a callback function that handles the results on completion:
::
    const Book = require("../models/book");

    // return all records
    Book.find({}).lean()
      .then((items) => {
        console.log(items.length);
      })
      .catch(err => next(err));
    });

    // return all records that match a condition
    Book.findOne({"title": "Dune" }).lean()
      .then((book) => {
        console.log(book);
      })
      .catch(err => next(err));

    // insert or update a single record
    const newBook = {'title':'dune', 'author':'frank herbert', 'pubdate': 1963 }
    Book.update({'title':'dune'}, newBook, {upsert:true}, (err, result) => {
      if (err) return next(err);
      console.log(result);
      // other code here
    });


MongoDb queries can use regular expressions to perform more nuanced pattern matching (e.g. name like 'brown' or 'Brown').  The regular expression can be hardcoded or defined with a variable as below:
::

    const search_pattern = new RegExp(search_term,"i");
    Book.find({"title": {$regex : search_pattern} }).lean()
      .then((books) => {
        console.log(books);
      })
      .catch(err => next(err));


The model can execute code before a built-in method with the ‘pre’ method:

mySchema.pre('save', function(next) {
  // custom code
  next();
});

Express Routes Integration
####

Your Express application routes can invoke MongoDB data methods directly. For example:
::

    app.get('/', (req, res, next) => {
        Book.find({}).lean()
          .then((books) => {
            res.render('home', { books });
          .catch(err => next(err))
    });

Mongo Shell
####
You can issue commands directly to your database through MongoShell. For a local db, simply type:

> mongo

You can connect the Mongo shell with a remote DB like so:

> mongo <hostname>:<port>/<dbname> -u <dbuser> -p <dbpassword>

Common shell commands are:

> show dbs
> use DB_NAME
> show collections
> db.createCollection(NAME, options)
> db.COLLECTION_NAME.insert(DOCUMENT)
> db.COLLECTION_NAME.update(DOCUMENT) - update an existing document
> db.COLLECTION_NAME.save(DOCUMENT) - insert or update a document
> db.COLLECTION_NAME.remove(DOCUMENT) - delete documents from the collection

Where DOCUMENT is a valid JSON object of key:value pairs that should be saved or matched. For example:

{
  _id: ObjectId(7df78ad8902c),
  title: 'MongoDB Overview',
  description: 'MongoDB is no sql database',
  by: 'tutorials point',
  url: 'http://www.tutorialspoint.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 100
}

Note - MongoDb will generate an Objectid if you don't specify one when inserting a new document.

Querying
####
> db.COLLECTION_NAME.find() - find all documents
> db.COLLECTION_NAME.find({key:value}) - find all docs matching key and value

Full documentation - http://www.tutorialspoint.com/mongodb/mongodb_query_document.htm

Indexes can speed database queries and are important for large datasets. In MongoDb you can set indexes like so:

>db.COLLECTION_NAME.ensureIndex({KEY:1})

Where ‘KEY’ is the field you want to index on, and the number indicates sort order (1=ascending, -1=descending)

The index can use multiple fields:

>db.COLLECTION_NAME.ensureIndex({"field_1":1,"field_2":-1})

Also, the index can ensure index field values are unique and prevent duplicate entries:

>db.COLLECTION_NAME.ensureIndex({"field_1":1,"unique":true})