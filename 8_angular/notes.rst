AngularJS & SPA's
####

Reading
####
- https://thinkster.io/a-better-way-to-learn-angularjs 
- https://docs.angularjs.org/guide 
- http://www.w3schools.com/angular/angular_intro.asp
- https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular 
 

Topics

- Single-page web applications
- What is Angular.js?
- Key Angular.js concepts
- Templates - https://docs.angularjs.org/guide/templates 
- Directives - https://docs.angularjs.org/guide/directive 
- Expressions - https://docs.angularjs.org/guide/expression 
- Scope - https://docs.angularjs.org/guide/scope 
- Controllers - https://docs.angularjs.org/guide/controller 
- Filters - https://docs.angularjs.org/guide/filter 
- DOM manipulation - http://www.w3schools.com/angular/angular_htmldom.asp
- 
 

Single-page Applications (SPA)
####
A single-page application (SPA) fits on a single web page (Links to an external site.) with the goal of providing a more fluid user experience similar to a native application. The page does not reload or transfer to another page during user interaction.

 

All necessary resources are retrieved with a single page load, or dynamically loaded from a web server and added to the page as necessary, usually in response to user actions.

A number of client-side JavaScript frameworks enable SPA functionality, including  AngularJS (Links to an external site.), Ember.js (Links to an external site.), Meteor.js (Links to an external site.), ExtJS (Links to an external site.) and React (Links to an external site.).

SPA’s can load resources from any server, typically via RESTful api’s

 

What is Angular?

Angular is a javascript framework that handles all of the DOM manipulation and AJAX code for web-service integration. Angular decorates HTML elements with custom attributes and elements to ensure consistency with HTML markup.

Angular is optimal for CRUD (Create, Read, Update, Delete) applications that integrate with a data model. It’s not well suited for apps with complex UI (e.g. games).

General areas handled by Angular:

Data-binding
basic templating directives
DOM manipulation & event handling
form validation
routing
deep-linking
reusable components
dependency injection
 

Angular simplifies coding and application code by reducing the need to:

Register callbacks
Manipulate the DOM programmatically
Marshal data to & from the server
Write initialization code
 

Framework

 

The Angular library is typically loaded into HTML pages either in the <HEAD> or at the start of the <BODY> to ensure it’s loaded before any HTML elements that use Angular directives or expressions.

 

<!DOCTYPE html>

<html lang="en-US">

<scriptsrc="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>

<body>

 

<div ng-app="">

<p>Name : <input type="text" ng-model="name"></p>

<h1>Hello {{name}}</h1>

Did you say <span ng-bind="name"</span>?

</div>

 

</body>

</html>

 

Directives -  apply special behavior to attributes or elements in the HTML. Angular apps should only access the DOM via directives to ensure testability. Key Angular directives are:

 

ng-app - defines an Angular module. Can be blank if the page will have only one Angular module.

ng-model - binds the value of HTML controls (input, select, textarea) to application data (model).

ng-bind - binds an element’s innerHTML to the value of a variable in the data model

ng-repeat - clones the HTML element once for each item in a collection specified in the directive expression.

ng-click - defines a click handler (javascript code) for the HTML element

ng-controller - binds an html element to a controller (Javascript code) that is responsible for the element and all of the element's children.




You can also define custom Angular directives.

 

Expressions -

Angular can replace expressions written inside double braces -  {{ expression }} - in the HTML template with data (variable values). Works the same as ng-bind.

 

Angular expressions are like JavaScript expressions and can contain literal values, variables, & operators. But there are some differences:

 

Angular expressions don’t support conditional logic, loops or exceptions.
You cannot declare functions or create regular expressions in an Angular expression
Angular expressions do not have access to global variables like window, document or location
 

http://www.w3schools.com/angular/angular_expressions.asp (Links to an external site.)

 

Expressions have access to variables within the current application scope. These variables can be any valid JS data, including objects. Examples of valid Angular expressions:

 

{{ 1 + 2 }}

{{ firstname + “ ” + lastname }}

{{ person.name }}

{{ items[0] }}

 

Scope

 

Angular applications have a ‘scope’ object that refers to the application model and mediates between the application controller and the view. Scopes are arranged in hierarchical structure which mimic the DOM structure of the application. Besides maintaining application data, scopes can watch expressions and propagate events.

You can think of the scope and its properties as the data which is used to render the view. The scope is the single source-of-truth for all things view related.

Scopes inherit the properties of their parent scopes. That means if a property exists on the parent scope, and a child scope modifies it, then all other scopes that inherit from the same parent will also see the same modification and their views will be updated automatically by Angular

From a testability point of view, the separation of the controller and the view is desirable, because it allows us to test the behavior without being distracted by the rendering details.




Controllers
####

A controller is a javascript module attached to the DOM via the ng-controller (Links to an external site.) directive. Controllers in Angular are simple functions that have one job only, which is to manipulate the scope.

They are stored in .js files and should contain only the business logic needed for a single view. Files are typically named with lower-case, and in the script controller names begin with upper-case.

For example, using our earlier template example:

 

<!DOCTYPE html>

<html lang="en-US">

<scriptsrc="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js (Links to an external site.)"></script>

<script src="app.js"></script>

<body>

<div ng-app="myApp" ng-controller=”GreetingController”>

<p>Name : <input type="text" ng-model="name"></p>

<h1>Hello {{name}}</h1>

Did you say <span ng-bind="name"</span>?

<button ng-click="resetForm()">{{buttonText}}</button>

</div>




var myApp = angular.module('myApp',[]);
myApp.controller('GreetingController', ['$scope', function($scope) {
 $scope.buttonText = 'Reset';

 $scope.resetForm = function() {

   $scope.qty=0;

   $scope.cost=0;

};

}]);

 

The controller is defined with a name and an array of dependencies
The controller can define objects and methods,
Objects and methods are prefixed with $scope
Controller objects and methods can be referenced in the template managed by this controller,
Try exercises at http://www.w3schools.com/angular/angular_controllers.asp (Links to an external site.) 

Services
####

In AngularJS, services are functions, or objects, called into another component (controller, service, filter or directive) as a dependency.

AngularJS has ~30 built-in services. You can also make your own custom services.


$http is a key Angular service for making http requests without reloading the page. It behaves much like an AJAX request in JQuery.  Detailed discussion of service options are at - https://docs.angularjs.org/api/ng/service/$http 

First, you need to include $http (or any other services) as a dependency for your controller:

   myApp.controller('AppController', function($scope, $http) {



You can load content or data from a remote web site with a simple GET request. For example;

$http.get('/my_get_api').then(function successCallback(response) {
    // update list of items in $scope
    $scope.items = response.data
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

You can also post information back to a server. This method takes a JSON object and sends it a as part of the request body. 

// POST example:
$http.post('/my_post_api', data_object).then(function successCallback(response) {
    // update $scope based on successful post 
    $scope.result = response.data
  }, function errorCallback(response) {
    // error handling
  });

Exercises
####
Create a basic HTML template that:

- Calls in latest Angular 1.x codebase,
- Defines an Angular app,
- Binds one or more input fields to a data value,
- Emits data values through use of an expression,
- Emits repeated HTML elements based on a data array,
- Uses expressions & data model to control CSS properties,
- Uses a controller object that:

  - sets initial values for your scope variables
  - handles a click event from the template