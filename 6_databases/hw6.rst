Assignment 6 - Connecting MongoDb
####

This week we learned about storing your application data with MongoDb, and using Mongoose to mediate database interaction in Node.js.

To enable database storage for your application, let's first make sure you can manage database entries. 

Update your Node application by:

- installing the mongoose package,
- creating a 'models/<MODEL>.js file (where <MODEL>that;
    - connects to your database (local or remote)
    - defines a schema that matches your application data,
    - exposes (exports) your data model for use by other scripts,
- creating a file called 'test_db.js' in your project root folder. The file should:
    - include your data model definition,
    - insert several new items into your db, with syntax like this:

        new <MODEL>(<JSON_DATA>).save();

    - perform a 'find' to display all db items (output to console). 
    
We'll update your application routes and api's later.

For reference, see the steps in Brown, Ch.11 regarding Mongoose and Schemas. Keep in mind that the querying examples are a bit more complex than what's required for this assignment.