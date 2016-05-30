Week 6 - Data Storage with MongoDb
####

Reading
####
- Brown, Ch. 13 - Data Persistence & MongoDb
- http://www.tutorialspoint.com/mongodb/mongodb_overview.htm
- http://mongoosejs.com/docs/guide.html 
- https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications 
- https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html 
- https://docs.mongodb.com/manual/introduction/ 

Topics
####

- Data persistence overview
- Schema-less -v- relational databases
- MongoDb setup and connection
- Basic MongoDb commands
- Data models with Mongoose
- Data manipulation - create, find, update, delete

Schema-less (aka no-sql) databases work on concept of collections and documents, instead of tables and columns.

Database is a physical container for collections.

Collection - a group of documents. Similar to a SQL table, but has no defined schema.

Document - a set of key-value pairs in JSON format. Different documents can have different pairs. Can contain any valid JS datatypes (e.g. string, number, boolean, array, object, date)

Schema-less databases have several advantages over relational (aka structured or SQL) databases:

- lower upfront DB design effort. Easier to modify as requirements change,
- data in ready-to-use JSON format 

MongoDb
####
MongoDb is a popular schema-less database with well-defined frameworks for Node integration.

You can setup a free MongoDb database at http://mlab.com. 

Or, you can set up a MongoDb database on your local pc or Cloud9 workspace. In the latter case, this db will only be active while your workspace is active. 

When using a local database, you need to ensure the MongoDb server is running by entering the following terminal command:

$ mongod --bind_ip=$IP --nojournal
where the part is bold can be ommitted if running on a local pc.

If the mongo service starts without errors, you can open the mongo shell in a new Terminal window to run db commands:

$ mongo

See  - https://docs.c9.io/docs/setup-a-database and https://community.c9.io/t/setting-up-mongodb/1717 

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


Mongoose
####
Schema less databases offer great flexibility, but sometimes it’s useful to set some constraints on the data your application will use. 

Mongoose is a popular npm framework for mapping Node application objects to MongoDb documents. This involves several steps:

First, as with other npm modules you need to install mongoose for your application:
npm install mongoose --save

Then your application needs to use this module. In practice, you would create a script to contain your ‘model’ and include these commands there: 

    var mongoose = require(‘mongoose’);

Then you need to connect to a mongodb instance:

    mongoose.connect(connectionString, options);

Assuming your db is hosted remotely, the connection string would be something like this:

    mongodb://<USER>:<PASSWORD>@ds015962.mlab.com:15962/<DB_NAME>

‘options’ describe connection settings such as how long the connection should remain active.

We also need to define a data model (aka schema) for mongoose. Models are defined as JSON objects with key/value pairs, where values indicate the data type of each key:

var mySchema = mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    started: Date,
    Active: Boolean
});

module.exports = mongoose.model('Person', mySchema);


The data model can include custom methods:

mySchema.methods.prefix = function() {
  // add some stuff to the users name
  this.name = ‘Mr. ‘ + this.name; 
  return this.name;
};

The model can reference built-in mongodb methods like .save(), .find(), etc. Because DB operations can be long-running, they are invoked with a callback function to handle the results on completion:

// return all records
mySchema.find({}, function (err, items) {
    if (err) return next(err);
    console.log(items.length);
    // other code here
});

MongoDb queries can use regular expressions to perform more nuanced pattern matching (e.g. name like 'brown' or 'Brown').  The regular expression can be hardcoded or defined with a variable as below:


var my_pattern = new RegExp(search_term,"i");
Person.find({<field>: {$regex : my_pattern} }, function(err, results) {

}

// return a single record

Person.findOne({'name':'jones'}, function (err, item) {
if (err) return next(err);

console.log(item);

// other code here
});
The model can execute code before a built-in method with the ‘pre’ method: 

mySchema.pre('save', function(next) {
  // custom code
  next();
});

Exercises
####

Use the mongo shell to:

- Create a mongo db for your app (either locally or on mlab.com)
- Create a collection in the db to hold items for your app
- Show collections in your db
- Insert several new items (documents) into the collection for your app
- Save a document into your collection
- Find all documents in your collection
- Find documents in your collection using query expressions for:
    - Equality
    - Not equals
    - AND
    - OR
    - Greater than or Less than
- Sort the results of your Find operation
- Set an index on your collection
- Set a unique index on your collection
- Update an existing document with new values
- Delete a document from your collection
