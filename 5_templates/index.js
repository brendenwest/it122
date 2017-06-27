'use strict'

var express = require("express");
var app = express();
var book = require("../lib/book");

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(require("body-parser").urlencoded({extended: true}));

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

app.get('/', function(req,res) {
    res.render('home', {books: book.getAll() });    
});

app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.get('/get', function(req,res){
    res.type('text/html');
    var found = book.get(req.query.title);
    res.render('details', {result: found} );    
});

app.post('/get', function(req,res){
    res.type('text/html');
    var found = book.get(req.body.title);
    res.render('details', {result: found} );    
});

app.get('/delete', function(req,res){
    res.type('text/html');
    var result = book.delete(req.query.title);
    res.render('delete', {title: req.query.title, result: result} );    
});

app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});