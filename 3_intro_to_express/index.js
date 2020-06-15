"use strict"

let book = require("../lib/book.js");

const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

const exphbs =  require("express-handlebars");
app.engine('hbs', exphbs({defaultLayout: false}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    res.render('home', {books: book.getAll()}); 
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

app.get('/detail', function(req,res){
    console.log(req.query)
    var found = book.get(req.query.title);
    res.render("details", {
        title: req.query.title, 
        result: found
        }
    );
});

// handle POST
app.post('/detail', function(req,res){
    console.log(req.body)
    var found = book.get(req.body.title);
    res.render("details", {title: req.body.title, result: found, books: book.getAll()});
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