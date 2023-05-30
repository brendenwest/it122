'use strict'
import { expect } from 'chai';
import * as book from "../lib/book.js";

describe("Book", function() {
    
    it("returns requested book", function() {
        let result = book.getItem("dune");
        expect(result).to.deep.equal({title: "Dune", author:"frank herbert", pubdate:1969});
    });
    
    it("fails to return an w/ invalid book", function() {
        let result = book.getItem("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new book", function() {
        let result = book.addItem({title: "dune emperor", author:"frank herbert", pubdate:1969});
        expect(result.added).to.be.true;
    });
    it("fails to add an existing book", function() {
        let result = book.addItem({title: "Dune", author:"frank herbert", pubdate:1969});
        expect(result.added).to.be.false;
    });

    it("deletes an existing book", function() {
        let result = book.deleteItem("Dune");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid book", function() {
        let result = book.deleteItem("travels with charlie");
        expect(result.deleted).to.be.false;
    });

});