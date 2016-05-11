Week 6 - Data Storage with MongoDb
####

Reading
####
- Brown, Ch. 13 - Data Persistence & MongoDb
- http://www.tutorialspoint.com/mongodb/mongodb_overview.htm
- https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications 
- https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html 
- https://docs.mongodb.com/manual/introduction/ 

Topics
####

- Data storage 
- Schema-less databases
- MongoDb setup and connection
- Basic MongoDb commands
- ODM & Mongoose
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

Commands
####
You can run mongodb locally in the Mongo shell and execute command-line:

> show dbs
> use DB_NAME
> show collections
> db.createCollection(NAME, options)
> db.COLLECTION_NAME.insert(document)

>db..COLLECTION_NAME.insert({
   _id: ObjectId(7df78ad8902c),
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by: 'tutorials point',
   url: 'http://www.tutorialspoint.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100
})

Note - If you don’t specify an Objectid, MongoDb will generate one.

> db.COLLECTION_NAME.update() - update an existing document
> db.COLLECTION_NAME.save() - insert or update a document
> db.COLLECTION_NAME.remove() - delete documents from the collection


Querying
####
> db.COLLECTION_NAME.find() - find all documents
> db.COLLECTION_NAME.find({key:value}) - find all docs matching key and value

Full documentation - http://www.tutorialspoint.com/mongodb/mongodb_query_document.htm 

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

The model can execute code before a built-in method with the ‘pre’ method: 

mySchema.pre('save', function(next) {
  // custom code
  next();
});
