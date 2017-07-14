'use strict'

let books = [
    {title: "dune", author:"frank herbert", pubdate:1969},
    {title: "it", author:"steven king", pubdate:1975},
    {title: "moby dick", author:"herman melville", pubdate:1869},
];

exports.getAll = () => {
    return books;
};

exports.get = (title) => {
    return books.find((item) => {
        return item.title === title;
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
