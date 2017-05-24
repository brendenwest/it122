'use strict'

var express = require("express");
var app = express();
var Book = require("../models/book"); // use database model

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use((err, req, res, next) => {
  console.log(err)
})

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

app.get('/', (req,res) => {
    Book.find((err,books) => {
        if (err) return next(err);
        res.render('home', {books: books });    
    })
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/get', (req,res,next) => {
    Book.findOne({ title:req.query.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: book} ); 
    });
});

app.post('/get', (req,res, next) => {
    Book.findOne({ title:req.body.title }, (err, book) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {result: book} ); 
    });
});

app.get('/delete', (req,res) => {
    Book.remove({ title:req.query.title }, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        Book.count((err, total) => {
            res.type('text/html');
            res.render('delete', {title: req.query.title, deleted: result.result.n !== 0, total: total } );    
        });
    });
});

// api's
app.get('/api/v1/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Book.findOne({title: title}, (err, result) => {
        if (err || !result) return next(err);
        res.json( result );    
    });
});

app.get('/api/v1/books', (req,res, next) => {
    Book.find((err,results) => {
        if (err || !results) return next(err);
        res.json(results);
    });
});

app.get('/api/v1/delete/:title', (req,res, next) => {
    Book.remove({"title":req.params.title }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

app.get('/api/v1/add/:title/:author/:pubdate', (req,res, next) => {
    // find & update existing item, or add new 
    let title = req.params.title;
    Book.update({ title: title}, {title:title, author: req.params.author, pubdate: req.params.pubdate }, {upsert: true }, (err, result) => {
        if (err) return next(err);
        // nModified = 0 for new item, = 1+ for updated item 
        res.json({updated: result.nModified});
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});