'use strict'

var Book = require("../models/book");

Book.update({ title: 'dune'}, {title:"dune", author:"frank herberd", amount: 10, pubdate: "05-21-1969"}, {upsert: true }, (err, result) => {
//  if (err) return handleError(err);
  console.log('The  response from Mongo was ', result);
});

Book.find({title: "dune"}, (err, book, next) => {
/*    if (err) return next(err);
    if (book) {
        console.log
        book.author = author;
        book.pubdate = pubdate;
    } else {
        let book = new Book({title:"dune", author:"frank herbert", amount: 10, pubdate: "05-21-1969"})
    }
    console.log(book)
    book.save((err) =>{
        if (err) {
        console.log(err);
        } else {
          console.log("Book saved")
        }
    });
*/
/*    
    new Book({title:"dune", author:"frank herbert", amount: 10, pubdate: "05-21-1969"})
  tank.size = 'large';
  tank.save(function (err, updatedTank) {
    if (err) return handleError(err);
    res.send(updatedTank);
  });
*/
});

/*
// insert a new document into the database
new Book({title:"dune", author:"frank herbert", amount: 10, pubdate: "05-21-1969"}).save((err) =>{
  if (err) {
	console.log(err);
  }
  else {
  	console.log("Post saved");
  }
});
*/
Book.count((err, result)=>{
    console.log(result);
});

// find all documents 
Book.find((err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
});

