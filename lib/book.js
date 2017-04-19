'use strict'

let books = [
    {title: "dune", author:"frank herbert", pubdate:1969},
    {title: "it", author:"steven king", pubdate:1975},
    {title: "moby dick", author:"herman melville", pubdate:1869},
];

exports.get = (title) => {
    return books.find((item) => {
        return item.title === title;
    });
};

exports.delete = (title) => {
    const oldLength = books.length;
    let newBooks = books.filter((item) => {
        return item.title !== title;
    });
    books = newBooks;    
    return {deleted: oldLength !== books.length, total: books.length };
};
