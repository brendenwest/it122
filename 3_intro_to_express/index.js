'use strict'

let book = require("../lib/book.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', function(req,res){
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html'); 
});

// send plain text response
app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

// handle GET 
app.get('/delete', function(req,res){
    let result = book.delete(req.query.title); // delete book object
    res.render('delete', {title: req.query.title, result: result});
});

// handle POST
app.post('/get', function(req,res){
    console.log(req.body)
    var header = 'Searching for: ' + req.body.title + '<br>';
    var found = book.get(req.body.title);
    res.render("details", {title: req.body.title, result: found});
});

// define 404 handler
app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});