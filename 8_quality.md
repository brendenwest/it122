## Quality Assurance

### Reading

- Brown - Ch. 5 - Quality Assurance
- https://jestjs.io/docs/getting-started
- https://jestjs.io/docs/tutorial-react
- https://eslint.org/docs/user-guide/getting-started 
- https://blog.risingstack.com/node-hero-node-js-unit-testing-tutorial/
- https://medium.com/@natnael.awel/react-js-unit-testing-best-practices-and-tools-5454a01326ea
- https://www.freecodecamp.org/news/how-to-write-unit-tests-in-react/

### Reference
- https://codeutopia.net/docs/eslint/
- https://www.cypress.io/
- https://www.freecodecamp.org/learn/quality-assurance/
- https://testingjavascript.com/

### Learning Outcomes

- Static analysis & JavaScript linting
- Different types of software testing
- Unit testing in JavaScript
- Integration and UI testing
- Schema validation

### Overview

Professional developers are increasingly responsible for preliminary testing of their work and ensuring minimal quality levels.


### Static Analysis (Linting)

Linters find problematic code patterns or code that doesn’t adhere to certain styl guidelines.

- Linters can catch potential application errors automatically, before deployment.
- Enforcing style standards can simplify code handoff between developers on the same team,
- Common JavaScript Linters include JSHint, JSLint, ESLint

For this class, we'll use [ESLint](http://eslint.org/>), which you can install as part of your development environment for your current project:

    $ npm i eslint --save-dev

or globally for use in all projects on your computer:

    $ npm install -g eslint

ESLint behavior is controlled by a configuration file in the root folder of your application. The file can be in various formats (e.g. JSON or JavaScript). If you are using esm modules use **.eslintrc.cjs** instead of **.eslintrc.js**

You can create a configuration file in any text editor, or via command line:

    $ npx eslint --init

    ✔ How would you like to use ESLint? · problems
    ✔ What type of modules does your project use? · esm
    ✔ Which framework does your project use? · none
    ✔ Does your project use TypeScript? · **No** / Yes
    ✔ Where does your code run? · node
    ✔ What format do you want your config file to be in? · JSON

The above settings should result in an .eslintrc.json file like this:

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

     $ npx eslint somefile.js
     $ npx eslint lib/**

You can also define an npm script in your package.json like so:

     "scripts": {
         "lint": "eslint **/*.js" 
     } 

And then run ESlint like so:

     $ npm run lint


### Testing

Web software testing encompasses a broad range of tasks, but developers typically need to at least know basics of the following:

- **unit tests** - verify that single a component (function) works properly. Minimal dependencies.
- **integration tests* - verify that multiple system components (modules, services, databases, etc.) work properly together. Integration testing can include `UI automation`, that simulates user interaction with an application.

#### Unit Testing

There are a number of fine JavaScript unit-testing frameworks including [Jest](https://jestjs.io/docs/getting-started) & [Mocha](https://mochajs.org/). For this class we'll focus on Jest.

To get started, install Jest:

    npm install --save-dev jest

This installs Jest in your project directory and in your package.json file as a `dev` dependency.

Tests are typically stored in script files named <module>.test.js, with files stored in the same directory as the related components or in a `tests` subdirectory.

A test script `imports` the module being tested and compares the result of a module function against the expected value. For example, if you had a module with this function:

    const sum = (a, b) => {
        return a + b;
    }
    module.exports = sum;

Your test script would look like this:

    import * from './sum.js';
    
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

- it imports the module being tested
- each test is a function that takes 2 parameters - a description and a callback function
- `expect` runs the function being tested and compares the result to a `matcher`

#### UI Testing

UI testing - aka end-to-end (E2E) - tests anything that runs in a browser. A typical E2E test visits the application in a browser and performs actions via the UI just like a real user would.

`Cypress` and `Selenium` are commonly used to automate UI testing. We'll focus here on Cypress.

First, you'll need to install Cypress:

    npm install cypress --save-dev

And then open the test runner:

    npx cypress open

The Cypress Test Runner locates compatible browsers on your machine and lets you choose which to use for testing.

Cypress expects tests in files with this name convention - *something_spec.js*.


### Data Validation

Data validation ensures information provided to your application satisfies necessary requirements. For example, your application may require that certain data values are strings or numbers.

`Joi` is JavaScript library that lets you define a `schema` with rules describing valid data. For example:

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
