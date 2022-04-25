Quality Assurance
====

Reading
====

- D'Mello - Testing Your Code
- https://eslint.org/docs/user-guide/getting-started 
- https://blog.risingstack.com/node-hero-node-js-unit-testing-tutorial/
- https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha

Practice
====

- https://www.freecodecamp.org/learn/quality-assurance/

Reference
====
- https://codeutopia.net/docs/eslint/
- https://www.cypress.io/
- https://joi.dev/
- https://testingjavascript.com/

Learning Outcomes
====

- Understand static analysis & JavaScript linting
- Understand basic unit testing in JavaScript
- Understand integration and UI testing
- Understand schema validation

Overview
====

Professional developers are increasingly responsible for preliminary testing of their work and ensuring minimal quality levels.


Static Analysis (Linting)
====

Linters find problematic code patterns or code that doesn’t adhere to certain styl guidelines.

- Linters can catch potential application errors automatically, before deployment.
- Enforcing style standards can simplify code handoff between developers on the same team,
- Common JavaScript Linters include JSHint, JSLint, ESLint

For this class, we'll use `ESLint <http://eslint.org/>`_, which you can install as part of your development environment for your current project:
::

    $ npm i eslint --save-dev

or globally for use in all projects on your computer:
::

    $ npm install -g eslint

ESLint behavior is controlled by a configuration file in the root folder of your application. The file can be in various formats (e.g. JSON or JavaScript). If you are using esm modules use **.eslintrc.cjs** instead of **.eslintrc.js**

You can create a configuration file in any text editor, or via command line:
::

    $ npx eslint --init

    ✔ How would you like to use ESLint? · problems
    ✔ What type of modules does your project use? · esm
    ✔ Which framework does your project use? · none
    ✔ Does your project use TypeScript? · **No** / Yes
    ✔ Where does your code run? · node
    ✔ What format do you want your config file to be in? · JSON

The above settings should result in an .eslintrc.json file like this:
::

 {
  "env": {
    "es2021": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "extends": "eslint:recommended",
    "rules": {
  }
 };

The default configuration uses **eslint:recommended** linting rules. A full description of configuration options are at http://eslint.org/docs/user-guide/configuring and rules are explained at http://eslint.org/docs/rules/. 

Once configured, you can run ESLint against JS files like so:
::

 $ npx eslint somefile.js
 $ npx eslint lib/**

You can also define an npm script in your package.json like so:
::

 "scripts": {
     "lint": "eslint **/*.js" 
 } 

And then run ESlint like so:
::

 $ npm run lint


Testing
====

Web software testing encompasses a broad range of tasks, but developers typically need to at least know basics of the following:

- unit tests - verify that single components (functions) work properly
- integration tests - verify that multiple system components (modules, services, databases, etc.) work properly together

`Mocha <https://mochajs.org>`_ is a JavaScript testing library commonly used for unit and integration testing.

Mocha is often used in conjunction with `Chai <https://chaijs.com>`_, a library that assists with test assertions. You can install both packages for development purposes like so:
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

UI Testing
====
UI testing - aka end-to-end (E2E) - tests anything that runs in a browser. A typical E2E test visits the application in a browser and performs actions via the UI just like a real user would.

Cypress and Selenium are commonly used tools for UI testing. We'll focus here on Cypress.

First, you'll need to install Cypress:

::

    npm install cypress --save-dev

And then open the test runner:

::
    npx cypress open

The Cypress Test Runner locates compatible browsers on your machine and lets you choose which to use for testing.

Cypress expects tests in files with this name convention - *something_spec.js*.


Data Validation
====

Data validation ensures information provided to your application satisfies necessary requirements. For example, your application may require that certain data values are strings or numbers.

`Joi` is JavaScript library that lets you define a `schema` with rules describing valid data. For example:
::

    import Joi from 'joi';

    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
        birthday: Joi.date().max('1-1-2004').iso()
    });

Email value is required and must be a valid `email` string.

Phone value is requried and must be a string with digits in the format of XXX-XXX-XXXX

Birthday is optional and must be a valid date in ISO 8601 format (e.g. "2006-01-01")

Joi can validate data against the schema before your application tries to use. Validation provides details for the first error encountered, and a formatted `value` object.

::

    // validate some data
    const data = {email: "", birthday: "2006-01-01"}

    // validate data
    const { error, value } = schema.validate(data);
    console.log(error);
    console.log(value);

    // alternatively
    try {
        const value = await schema.validateAsync(bad_data);
    }
    catch (err) {
        console.log(err)
    }
