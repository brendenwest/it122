'use strict'

const Book = require("../models/book");

// find all documents
Book.find({}, (err, result) => {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(result);
    }
    return
});


/// ignore
const newBook = {title:"'howls moving castle'", author:"sam stein", amount: 3, pubdate: "05-21-1969"}
//Book.update({ title: newBook.title}, newBook, {upsert: true }, (err, result) => {
////  if (err) return handleError(err);
//  console.log('The  response from Mongo was ', result);
//});

//Book.find({title: "dune"}, (err, book, next) => {
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
//});

//console.log("step 1")
//Book.countDocuments((err, result) => {
//    console.log("step 2")
//    console.log(result + " db entries");
//});
//console.log("step 3")


