'use strict'
var Book = require("../models/book");

// export MongoDb methods as promise functions
exports.getAll = () => {
    // find all documents 
    console.log('getall')
    return Book.find({}, (err, result) => {
        console.log(err)
        console.log(result)
        // output error if one occurred
        if (err) {
            console.log(err);
        } else {
            // otherwise output the array of documents
            return result;
        }
    });
};

exports.get = (title) => {
    return books.find((item) => {
        return item.title.toLowerCase() === title.toLowerCase();
    });
};

exports.delete = (title) => {
    // retain array length for later comparison after array modification
    const oldLength = books.length;
    books = books.filter((item) => {
        return item.title !== title;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== books.length, total: books.length };
};

exports.add = (newBook) => {
    const oldLength = books.length;
    // use existing get() method to check if book already in our list
    let found = this.get(newBook.title);
    if (!found) {
        books.push(newBook);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== books.length, total: books.length };
};
