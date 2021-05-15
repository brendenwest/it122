'use strict'

import express from 'express';
import handlebars from "express-handlebars"
import { Book } from "../models/book.js";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static('./public')); // allows direct navigation to static files
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

import cors from 'cors';
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route

app.engine('hbs', handlebars({defaultLayout: "main.hbs"}));
app.set("view engine", "hbs");

app.get('/', (req,res) => {
    Book.find({}).lean()
        .then((books) => {
            res.render('home', { books });
        })
        .catch(err => next(err));
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about');
});

app.get('/detail', (req,res,next) => {
    Book.findOne({ title:req.query.title }).lean()
        .then((book) => {
            res.render('details', {result: book} );
        })
        .catch(err => next(err));
});

app.post('/detail', (req,res, next) => {
    Book.findOne({ title:req.body.title }).lean()
        .then((book) => {
            res.render('details', {result: book} );
        })
        .catch(err => next(err));
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

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});