var credentials = require("../lib/credentials");
var mongoose = require("mongoose");

// remote db settings 
  var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }  } };
  mongoose.connect(credentials.mongo.development.connectionString, options);

// local db settings 
// var ip = process.env.ip || '127.0.0.1';
// mongoose.connect('mongodb://' +ip+ '/itc230');

var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));  

var bookSchema = mongoose.Schema({
    title: String,
    author: String,
    amount: Number,
    pubdate: Date,
});

module.exports = mongoose.model('Book', bookSchema);