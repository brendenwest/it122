var Book = require("../models/book");

// insert a new document into the database
//new Book({title:"dune", author:"frank herbert", amount: 10, pubdate: "05-21-1969"}).save();

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

