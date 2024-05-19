'use strict'

import { Book } from "./models/book.js";

// find all documents
console.log("step 1")
//Book.find({}).lean()
//.then((books) => {
//    console.log(books)
//})
//.catch(err => console.log(err));

//Book.deleteOne({"title": "Wicked" })
//  .then((result) => {
//      console.log(result);;
//  })
//  .catch(err => console.log(err));

// count # of docs
//Book.countDocuments((err, result) => {
//    console.log("step 2")
//    console.log(result + " db entries");
//});
console.log("step 3")

// insert or update a single record
const newBook = {'title':'Dune Messiah', 'author':'Frank Herbert', 'pubdate': 1970 }
//Book.updateOne({ title: newBook.title}, newBook, {upsert:true})
//.then(result => console.log(result))
//.catch(err => console.log(err));

