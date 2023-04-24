## JavaScript Recap - ES6, Arrays, Objects, & Modules

Let's recap some code JavaScript functionality that will be essential in subsequent weeks.

### Reference

- https://www-freecodecamp-org.cdn.ampproject.org/c/s/www.freecodecamp.org/news/javascript-concepts-to-know-before-learning-react/amp/ 
- https://www.w3schools.com/js - functions, objects, closures, modules 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array  [Array iteration methods]
- https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import


### Learning Outcomes

- Key JS changes in ES6
- Arrays, objects, & higher-order functions
- Callbacks & async operations
- JS module exports & imports

### Practice

- https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/es6 
- https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/functional-programming 
 

### ES6

ES6 (ECMAScript 2015) is a significant update to JavaScript that introduces a number of features found in other modern languages. It's not required that you use these features, but you should be familiar with several that can be useful.

This example highlights several key ES6 features:

	// ES5 syntax
	function fullName(title, first, last) {  
		if (!title) { title = 'Honorable')  
		return title + " " + first + " " + last;
	}
	
	// ES6 syntax
	const fullName = (title='Honorable', first, last) => {
	  return `${title} ${first} ${last}`
	}
	
- **const** variable definition (more on this below)
- **arrow functions** - enable shorter function syntax
- **default values** for function parameters
- **string template literals** - note the **backtick** character

**Block-scoped variables** (let & const)

Classic JavaScript allows variables to be defined with either of these approaches:

	var age = 27; 
	age = 27;
	
ES6 introduces two new commands:

	let age = 27; // value of 'age' may change later in the program
	const pi = 3.14; // value of 'pi' won't change 

This new approach limits chances of over-writing variables and speeds program execution. 

It also changes how variables are scoped. In classic JavaScript, variables are 'scoped' to the nearest enclosing function:

	function func() {
	    if (true) {
	        var tmp = 123;
	    }
	    console.log(tmp); // prints 123
	}

This can sometimes cause problems, so in ES6 **let** and **const** are block-scoped – they only exist within the innermost block that surrounds them:

	const func = () => {
	    if (true) {
	        const tmp = 123;
	    }
	    console.log(tmp); // ReferenceError: tmp is not defined
	}


### Closures

JavaScript **closures** allow functions to access variables that are in scope when the function was defined. For example:

	const myCounter = () => {
		let counter = 0;
		return {
			increment: (inc=1) => {
				counter += inc;
			},
			getValue: () => {
				return counter;
			}
		};
	};

Invoking **myCounter** returns an object with 2 methods that can access the local variable **counter** after the myCounter method has executed.

- const counter = myCounter();
- counter.increment(n); // increments the local variable ‘counter,
- counter.getValue(); // returns the current value of ‘counter’

Closures allow for JavaScript objects with **private** variables and methods. Learn more at - https://community.risingstack.com/explaining-javascript-closure-scope-chain-examples/ 


### Callbacks

Node.js is designed around the concept of **non-blocking input-output (I/O)** and event-driven programming.

Node.js mostly performs I/O operations - such as reading a file, querying a database or making a web request - asynchronously. This means you can initiate an operation and specify the code (aka callback) Node should execute when the operation completes. While the operation executes in the background, Node will proceed with executing other code. The Node runtime executes an event loop that periodically checks for callbacks ready for attention.

**Synchronous**

	const response = send_api_request_sync(request); // other operations blocked until request completes
	display(response); 

**Asynchronous**

An asynchronous function returns immediately, so the client isn’t blocked:

	const send_api_request_async = (request, (response) => {
	  // commands to execute when request completes
	  display(response); 
	}); 

This example passes an anonymous function as a parameter to the *send_request_async* function, to be called when the response is available.


### Objects, Collections & Higher-order Functions

The basic structure of a JavaScript object is:

	{
	key :  value,
	key :  value
	}

- Keys must be strings,
- Values can be any valid JavaScript data type (number, string, array, object, etc.),
- String values are enclosed in double quotes,
- Whitespace is ignored,
- key-value pairs are separated by commas


	{
      name : "jim",
      age : 34,
	  classes : ["itc 298", "web150", "cs110"]
	}


JavaScript objects can be stored in arrays for data-centric operations:

	let students = [
	{ name : "jim", age : 34, classes : ["itc 298", "web150", "cs110"] },
	{ name : "mary", age : 32, classes : ["web150", "cs110", "web120"] },
	{ name : "sue", age : 28, classes : ["web150", "web120"] }
	];


JavaScript provides a variety of native Array methods for adding, removing and manipulating items:

- .push() - adds one or more elements to the end of an array and returns the new length of the array
- .pop() -  removes the last element from an array and returns that element
- .shift() - removes the first element from an array and returns that element
- .splice() - removes existing array elements and/or adds new elements. Returns the removed items.



	array.splice(start, deleteCount[, item1[, item2[, ...]]]
	students.splice(1, 1); // removes 2nd item in the students array
	students.splice(1, 1, { name : "jeff", age : 21, classes : ["web120"] } ); // replaces 2nd item in the students array

Some array methods are **higher-order functions**, which take a function as parameter. The calling function executes the callback function for each item in the collection. Higher-order functions can use a named callback


	array.method(callback);

or an anonymous callback:

	array.method((item) => { 
	  // code to execute for each array item
	});


#### Array Methods

**.forEach()** - executes a provided function once per array element.

	students.forEach((student) => {  
	    console.log('Student: ' + student.name + '<br>Age: ' + student.age + '<br>Courses: ' + student.classes.length);
	});

**.find()** - returns the first array item that results in a ‘true’ value from the callback function.

	let found = students.find((student) => {  
		return student.name === 'mary';
	});
	console.log(found);

**.findIndex()** - returns index position of the first item that results in a ‘true’ value from the callback function.

	let foundIndex = students.findIndex((student) => {
		return student.name === 'mary';
	});
	console.log(foundIndex);

**.filter()** - returns all array items that result in a ‘true’ value from the callback function.

	// with anonymous function
	let olderStudents = students.filter((student) => {
	  return student.age > 30;
	});
	
	// with a named function
	const findOlder = (student) => { 
	  return student.age > 30;
	}
	let olderStudents = students.filter(findOlder);

**.sort()** - sorts array items in place, according to the logic specified in the callback (comparison) function. .sort() provides two array items at a time to the comparison function as parameters.

	const byAgeAsc = (student1, student2) => {
	  // sorts students by age in ascending order
	  return student1.age - student2.age;
	}
	console.log(students.sort(byAgeAsc));

**.map()** - creates a new array with the results of executing the callback function on every element in the original array.

	const progress = students.map((student) => {
		return { name : student.name, courses: student.classes.length }
	}); 

**.reduce()** - executes a callback function with an accumulated value and each value of the array (from left-to-right) to reduce it to a single value.

	const total_classes = students.reduce((previousValue, currentStudent) => {
	  return previousValue + currentStudent.classes.length;
	});

### JavaScript Modules

JS applications can use **modules** to organize code for re-use and readability.

Modules are files with a .js extension that contain logically related functions and data.

Modules are typically named according to their purpose or the data object they define - e.g. `movie.js`, `person.js`, `login.js`, etc.

Modules in a complex Node.js application are often organized in the **/lib** folder for consistency.

Your JS project **must** use a single approach for export/import syntax. If using the ES6 Modules syntax, be sure to add this line in your package.json file:

    "type": "module",

#### Exports 

Modules can **export** methods and data for use by other modules. This allows a module to present a public **interface** while keeping state and implementation private.

Exports can be **named** (zero or more exports per module) or use a single **export** command;

    let myVariable = 123;

    const myFunction = (title) => {
		return title.toUpperCase();
	}

    // use a single export statement
    export { myFunction, myVariable };

Or by exporting each object explicitly;

    // export a variable
    export let myVariable = 123;

    export const myFunction = (title) => {
	    // search the books array
		return title.toUpperCase();
	}

Or with a single **default** export (one per module);

    const myFunction = (title) => {
		return title.toUpperCase();
	}

    // Default exports
    export default myFunction;

#### Imports

JS modules can import other modules to leverage their functionality.

Prior to Node.js 12, modules could be imported with **commonJS** syntax, as in this example:

    const data = require("data"); // .js file extension assumed

Because that syntax differs from syntax used in browser applications Node.js adopted **ES6 modules** import syntax:

    import * from './data.js'; // import all exports from data 
    myfunction('title');  // execute function imported from data module


    import * as 'data' from './data.js'; // use 'data' as namespace for imports
    data.myfunction('title');  // execute function imported from data module

    import {myFunction, myVariable} from './data.js'; // import only certain exports from data
    myfunction('title');  // execute function imported from data module

Import names need to match the names exported by the module
