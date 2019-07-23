const credentials = require("../lib/credentials");
const mongoose = require("mongoose");

// remote db settings 
mongoose.connect(credentials.connectionString, { dbName: 'sccprojects', useNewUrlParser: true }); 

// local db settings 
// var ip = process.env.ip || '127.0.0.1';
// mongoose.connect('mongodb://' +ip+ '/itc230');

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    amount: Number,
    pubdate: Date,
});

module.exports = mongoose.model('Book', bookSchema);
