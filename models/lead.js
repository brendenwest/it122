var credentials = require("../lib/credentials");
var mongoose = require("mongoose");

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
mongoose.connect(credentials.mongo.development.connectionString, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  

var leadSchema = mongoose.Schema({
    company: String,
    contact: String,
    amount: Number,
    close_date: Date,
});

module.exports = mongoose.model('Lead', leadSchema);