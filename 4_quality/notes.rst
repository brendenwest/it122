Quality Assurance
====

Reading
====

- Brown Ch. 5 - Quality Assurance
- https://codeutopia.net/docs/eslint/  
- https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha 

Goals
====

- Understand JavaScript Linting
- Understand basic unit testing

Professional developers are increasingly responsible for preliminary testing of their work and ensuring minimal quality levels.

Linting
====

Linters are tools that find problematic code patterns or code that doesn’t adhere to certain style guidelines.

- Linters can catch potential application errors automatically, before deployment.
- Enforcing style standards can simplify code handoff between developers on the same team,
- Common Linters include JSHint, JSLint, ESLint
 

For this class, we'll use ESLint, which you can install globally: 

 $ npm install -g eslint

Or as part of your application (for dev installations only):

 $ npm i eslint --save-dev

ESLint behavior is controlled by a configuration file (e.g. .eslintrc.js) in the root of your application. A full description of configuration options are at http://eslint.org/docs/user-guide/configuring and rules are explained at http://eslint.org/docs/rules/. But for this class, let's use this example:

 module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "extends": "eslint:recommended",
    "rules": {
    "prefer-arrow-callback": "warn",
    "no-var": "warn"
  }
 };

You can run ESLint against JS files like so:

 $ eslint somefile.js
 $ eslint lib/**

You can also run ESLint against your application files by updating the package.json like so:

 "scripts": {
     "lint": "eslint **/*.js" 
 } 

And then run lint checks like so:

 $ npm run lint

Testing
====

Web software testing encompasses a broad range of tasks, but developers typically need to at least know basics of the following:

- unit tests - verify that single components (functions) work properly
- integration tests - verify that multiple system components (modules, services, databases, etc.) work properly together `Mocha <https://mocha.org>`_ is a JavaScript testing library commonly used for unit and integration testing.

Mocha is often used in conjunction with `Chai<https://chaijs.com>`_, a library that assists with test assertions. You can install both packages for development purposes like so:

 $ npm install mocha --save-dev
 $ npm install chai --save-dev

Node application test scripts are typically stored as .js files in a /test directory in the root of your project.

A test script 'requires' any supporting libraries as well as modules being tested. The script then describes one or more test cases, where each case corresponds to a module being tested. The case can have one more tests of expected unit behavior. Tests should account for both success & failure conditions:

 var expect = require("chai").expect;
 var book = require("../lib/book");
 describe("Book module", () => {
  it("returns requested book", function() {
    var result = book.get("dune");
    expect(result).to.deep.equal({title: "dune", author:"frank herbert", pubdate:1969});
  });
  
  it("fails w/ invalid book", () => {
    var result = book.get("fake");
    expect(result).to.be.undefined;
  });
 });

See http://chaijs.com/api/bdd/ for a full listing of 'expectation' options.

Once you've defined test scripts, you can execute them directly: 

 $ mocha test/**

Or by adding a command to the package.json file:

 "scripts": {
     "lint": "eslint **/*.js",
     "test": "mocha test/**"
 } 

and executing with npm:

 $ npm run test
