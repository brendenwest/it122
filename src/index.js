'use strict'

import express from 'express';
import { Book } from "./models/book.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

import cors from 'cors';
app.use('/api', cors());

// set template engine
app.set("view engine", "ejs");

app.get('/', (req,res, next) => {
    Book.find({}).lean()
    .then((books) => {
        res.render('home', { books: JSON.stringify(books) });
    })
    .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

// api's
app.get('/api/v1/book/:title', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Book.findOne({title: title}, (err, result) => {
        if (err || !result) {
            res.status(404).json({"message":"not found"});
        } else {
            res.json( result );
         }
    });
});

app.get('/api/v1/book/id/:id', (req, res, next) => {
    Book.findOne({_id: req.params.id}, (err, result) => {
        if (err || !result) {
            res.status(404).json({"message":"not found"});
        } else {
            res.json( result );
         }
    });
});

app.get('/api/v1/books', (req,res, next) => {
    Book.find({}).lean()
    .then((books) => {
        res.json(books);
    })
    .catch(err => res.json({"error": err}));
});

app.get('/api/v1/delete/:id', (req,res, next) => {
    Book.deleteOne({"_id":req.params.id })
    .then(result => {
        res.json({"deleted": result});
    })
    .catch(err => res.json({"error": err}));
});

app.post('/api/v1/add/', (req,res, next) => {
    // find & update existing item, or add new
    Book.updateOne({ _id: req.body._id}, req.body, {upsert:true})
    .then(result => res.json(result))
    .catch(err => res.json({"error": err}));
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