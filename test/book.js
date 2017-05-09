'use strict'
const expect = require("chai").expect;
const book = require("../lib/book");

describe("Book", function() {
    
    it("returns requested book", function() {
        let result = book.get("dune");
        expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
    });
    
    it("fails to return an w/ invalid book", function() {
        let result = book.get("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new book", function() {
        let result = book.add({title: "dune emperor", author:"frank herbert", pubdate:1969});
        expect(result.added).to.be.true;
    });
    it("fails to add an existing book", function() {
        let result = book.add({title: "dune", author:"frank herbert", pubdate:1969});
        expect(result.added).to.be.false;
    });

    it("deletes an existing book", function() {
        let result = book.delete("dune");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid book", function() {
        let result = book.delete("travels with charlie");
        expect(result.deleted).to.be.false;
    });

});