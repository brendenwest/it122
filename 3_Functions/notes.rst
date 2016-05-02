Week 3 - JavaScript Functions, Arrays & Modules
####

Reading
####
- Javascript, the Good Parts, Ch. 4 - Functions
- http://book.mixu.net/node/ch5.html (Arrays, Objects, JSON)
- http://www.w3schools.com/js/js_objects.asp 
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array [See the Array interation methods]
- Brown, Ch. 4 [Node Modules section]

Topics
####
- Javascript Functions
- Scope & closure
- Callbacks & Asynch operations
- Node modules
- Javascript Object Collections

Javascript functions
####
Javascript function and object behavior is central to Node.js programming. So it’s important to understand key functional concepts:
- Functions are defined with the ‘function’ keyword
- Functions can be ‘anonymous’ or named
- Functions can take parameters
	function (param1, param2) { return param1 + param2; }
	function myFunction(param1, param2) { return param1 + param2; }

- Functions can return a value to the step that called them
	var total = myFunction(3, 4); // total = 7
	
- Functions are objects that can be referenced and passed to other functions:
	var myFunction = function (param1, param2) { return param1 + param2; }
	xar x = anotherFunction(myFunction(param3, param4)); // calls 

- Functions within objects are called ‘methods’

Scope & Closure
####
Scope controls the visibility and lifecycle of Javascript objects to reduce naming conflicts and provide memory management. Scope in Javascript is a bit different than in other languages, and objects have ‘scope’ in the function where they are defined. Global objects are those defined outside of any funciton or object.
	var counter = 1; // counter is available throughout the app

	function myFunction() {
		var y = 2; // y is local to this function
		counter += y; 
	}
	
	myFunction(); 	// execute myFunction
	console.log(counter);	// counter = 3
	console.log(y);	// y is undefined here

Javascript’s approach to scope allows object methods to access variables local to the function that created them, even after the function has executed. For example:
var myObject = (function(){
	var counter = 0;
	return {
		increment: function(inc) {
			counter += inc;
		},
		getValue: function() {
			return counter;
		}
	};
});

Creates an object with 2 methods - 
myObject.increment(n); // increments the local variable ‘counter,
myObject.getValue(); // returns the current value of ‘counter’

With this approach, you can control how ‘counter’ is accessed and apply custom logic.

Callbacks
####
Node.js is designed around the concept of non-blocking input-output (I/O) and event-driven programming.
In Node, I/O operations such as reading a file, querying a database or making a web request, are performed asynchronously. This means you can initiate an operation, and specify the code (aka callback) Node should execute when the operation completes. While the operation executes in the background, Node will proceed with executing other code. The Node runtime executes an event loop that periodically checks for callbacks ready for attention.
Synchronous

var request = prepare_the_request( ); 
response = send_request_synchronously(request); // subsequent commands blocked until this completes
display(response); 

Asynchronous

An asynchronous function returns immediately, so the client isn’t blocked: 

request = prepare_the_request( );
send_request_async(request, function (response) {
display(response); 
}); 


We pass an anonymous function as a parameter (in bold) to the send_request_async function that will be called when the response is available.

Node Modules
####
Node applications use Javascript functions and closures to make modules that present and interface but hide their state and implementation. Modules are typically functions that have private variables and functions, and privileged functions accessible to outside code and that mediate access to the private variables/functions.

Node modules have a main javascript file and may have supporting scripts and assets. The main script name should clearly indicate the module purpose and often matches the object defines (e.g. ‘fortune’, ‘book’, etc.)

Modules internal to a Node application are usually stored in the /lib folder for consistency.

Node modules use the global ‘exports’ variable to expose objects or functions to code outside the module. For example, we might have a books.js module, with a method to list books by price:

var books = [
	{ title:‘Moby Dick’, price:20 },
	{ title:‘Tom Sawyer’, price:12 },
	{ title:‘War & Peace’, price:25 }
];

exports.byPriceAsc = function() {
	// return a sorted list of books
return this.books.sort(function(a, b) {
  return a.price - b.price;
});
}


Our Node application can encapsulate book-related behavior into this module to reduce complexity of the main script, and call in the module like so:

var book = require(‘./lib/book.js’);


Node packages are modules designed for installation by other Node applications, and have a package.json file that describes how to install them.

Object Collections
####
The basic structure of a Javascript object is:

{
key :  value,
key :  value
}

Keys must be strings,
Values can be any valid JavaScript data type (number, string, array, object, etc.),
String values are enclosed in double quotes,
Whitespace is ignored,
key-value pairs are separated by commas

{
name : “jim”,
age : 34,
classes : [“itc 298”, “web150”, “cs110”]
}


JavaScript objects can be stored in arrays for data-centric operations:

var students = [
{ name : “jim”, age : 34, classes : [“itc 298”, “web150”, “cs110”] },
{ name : “mary”, age : 32, classes : [“web150”, “cs110”, “web120”] },
{ name : “sue”, age : 28, classes : [“web150”, “web120”] }
];


JavaScript provides a variety of native Array methods for adding, removing and manipulating items:

.push() - adds one or more elements to the end of an array and returns the new length of the array
.pop() -  removes the last element from an array and returns that element
.shift() - removes the first element from an array and returns that element
.splice() - removes existing array elements and/or adds new elements. Returns the removed items.

array.splice(start, deleteCount[, item1[, item2[, ...]]]
students.splice(1, 1); // removes 2nd item in the students array
students.splice(1, 1, { name : “jeff”, age : 21, classes : [“web120”] } ); // replaces 2nd item in the students array


Some array methods are higher-order functions, which take functions as parameters. These allow greater control over the function behavior and are widely used in Node.js programming. Typical structure is:

array.method(callback);
Where the higher-order function executes the callback function for each item in the array. Different functions may pass other arguments to the callback, in addition to the array item.


.forEach() - executes a provided function once per array element.

functions showDetails(student) {
	console.log(“Student: “ + student.name +”<br>Age: ” + student.age + “<br>Courses: ” + student.classes.length);
}
students.forEach(showDetails);


.find() - returns the first array item that results in a ‘true’ value from the callback function.

functions findMillenial(student) {
	return student.age < 30;
}
console.log(students.find(findMillenial)); 
.filter() - returns all array items that result in a ‘true’ value from the callback function.

functions findOlder(student) {
	return student.age > 30;
}
var olderStudents = students.filter(findOlder); 
.sort() - sorts array items in place, according to the logic specified in the callback (comparison) function. .sort() provides two array items at a time to the comparison function as parameters.

var byAgeAsc = function(student1, student2) {
  // sorts students by age in ascending order
  return student1.age - student2.age;
}
console.log(students.sort(byAgeAsc));

.map() - creates a new array with the results of executing the callback function on every element in the original array.

var progress = students.map( function(student) {
	return { name : student.name, courses: student.classes.length }
}); 

.reduce() - executes a callback function with an accumulated value and each value of the array (from left-to-right) to reduce it to a single value.

var total_classes = students.reduce(function(previousValue, currentStudent) {
  return previousValue + currentStudent.classes.length;
});

Exercises
####
- Save a copy of index.js for HW #2,
- Move data and methods for your data from index.js into a dedicated module,
- Call your new module into index.js
- Add module methods, and corresponding server routes, to;
	- Return all data items
	- Return all data items with field matching,
	- Return all data items sorted by a specified field,
	- Return a count of data items,
	- Delete a data item that matches specified field value
- Add form fields corresponding to each field in your data object.
- Update your form with:
	- Entry fields corresponding to each property of your data object,
	- Buttons to add, remove, update
- Connect your buttons to corresponding server routes, to add, remove, and update data items.
- Add a date field to your data. Return data items with date mapped to an integer value (e.g. day, month, year)
