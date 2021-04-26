'use strict'

let books = [
    {title: "Dune", author:"frank herbert", pubdate:1969},
    {title: "it", author:"steven king", pubdate:1975},
    {title: "moby dick", author:"herman melville", pubdate:1869},
];

const getAll = () => {
    return books;
};

const getItem = (title) => {
    return books.find((item) => {
        return item.title.toLowerCase() === title.toLowerCase();
    });
};

const deleteItem = (title) => {
    // retain array length for later comparison after array modification
    const oldLength = books.length;
    books = books.filter((item) => {
        return item.title !== title;
    });
    // if old & new array lengths differ, item was deleted
    return {deleted: oldLength !== books.length, total: books.length };
};

const addItem = (newBook) => {
    const oldLength = books.length;
    // use existing get() method to check if book already in our list
    let found = getItem(newBook.title);
    if (!found) {
        books.push(newBook);
    }
    // if old & new array lengths differ, item was added
    return {added: oldLength !== books.length, total: books.length };
};

export { getAll, getItem, addItem, deleteItem }