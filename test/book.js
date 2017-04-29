var expect = require("chai").expect;
var book = require("../lib/book");

describe("Book", function() {
    it("get returns requested book", function() {
        var result = book.get("dune");
        expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
    });
    
    it("get fails w/ invalid book", function() {
        var result = book.get("fake");
        expect(result).to.be.undefined;
    });

});