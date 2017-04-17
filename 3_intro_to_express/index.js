'use strict'

let book = require("../lib/book.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true}));

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

// handle form post
app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.title + '<br>';
    var found = book.get(req.body.title);
    if (found) {
        res.send(header + "" + JSON.stringify(found));
    } else {
        res.send(header + "Not found");
    }
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