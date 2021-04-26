Quality Assurance
====

Reading
====

- D'Mello - Testing Your Code
- https://eslint.org/docs/user-guide/getting-started 
- https://blog.risingstack.com/node-hero-node-js-unit-testing-tutorial/
- https://codeutopia.net/docs/eslint/  
- https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha 

Practice
====

- https://learn.freecodecamp.org/information-security-and-quality-assurance/quality-assurance-and-testing-with-chai

Learning Outcomes
====

- Understand static analysis & JavaScript linting
- Understand basic unit testing in JavaScript

Overview
====

Professional developers are increasingly responsible for preliminary testing of their work and ensuring minimal quality levels.


Static Analysis (Linting)
====

Linters find problematic code patterns or code that doesn’t adhere to certain styl guidelines.

- Linters can catch potential application errors automatically, before deployment.
- Enforcing style standards can simplify code handoff between developers on the same team,
- Common JavaScript Linters include JSHint, JSLint, ESLint

For this class, we'll use `ESLint<http://eslint.org/>`_, which you can install globally for use in all projects on your computer:
::

    $ npm install -g eslint

Or as part of your development environment for your current project:
::

    $ npm i eslint --save-dev

ESLint behavior is controlled by a configuration file in the root folder of your application. The file can be in various formats, but for this class we'll use the .js format (e.g. .eslintrc.js). You can create a configuration file in any text editor, or via command line:
::

    $ eslint --init

The init process can use common configurations from major companies, or settings based on answers to questions about your coding style. A full description of configuration options are at http://eslint.org/docs/user-guide/configuring and rules are explained at http://eslint.org/docs/rules/. But for this class, let's use this example:
::

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
::

 $ eslint somefile.js
 $ eslint lib/**

You can also run ESLint with NPM to check all your project files by updating the package.json like so:
::

 "scripts": {
     "lint": "eslint **/*.js" 
 } 

And then run ESlint checks like so:
::

 $ npm run lint

Testing
====

Web software testing encompasses a broad range of tasks, but developers typically need to at least know basics of the following:

- unit tests - verify that single components (functions) work properly
- integration tests - verify that multiple system components (modules, services, databases, etc.) work properly together

`Mocha <https://mocha.org>`_ is a JavaScript testing library commonly used for unit and integration testing.

Mocha is often used in conjunction with `Chai<https://chaijs.com>`_, a library that assists with test assertions. You can install both packages for development purposes like so:
::

 $ npm install mocha --save-dev
 $ npm install chai --save-dev

Node application test scripts are typically stored as .js files in a /test directory in the root of your project.

A test script 'requires' any supporting libraries as well as modules being tested. The script then describes one or more test cases, where each case corresponds to a module being tested. The case can have one more tests of expected unit behavior. Tests should account for both success & failure conditions:
::

 import { expect } from 'chai';
 import * as book from "../lib/book.js";

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
::

 $ mocha test/**

Or by adding a command to the package.json file:
::

 "scripts": {
     "lint": "eslint **/*.js",
     "test": "mocha test/**"
 } 

and executing with npm:
::

 $ npm run test
