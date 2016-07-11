Assignment #8 - Intro to AngularJS
#####

This week introduced AngularJS as a tool for building single-page-applications. With this new knowledge you can begin moving application logic from the server (Node) into the client. 

We'll start by applying some Angular concepts on a simplified version of your app's Home page. This version doesn't need all the features you've built to date. 

Using the sample template below, and key Angular techniques:

- bind a search entry field to a model variable,
- update an HTML element with the search entry as the user types
- display a list of the items in your data array
- display the total # of items in your list
- display more information about an item when clicked, without leaving the page

Note:

For this assignment simplicity and focus on Angular concepts is key. To that end:

- Use an in-page data array in your controller, with structure similar to what your list app uses, but can be a subset,
- See the class notes on Controllers and invoking controller methods
- You don't need to match the UI of your list app from previous assignments. Add styling and UI complexity only after you satisfy the requirements for this assignment.
 

Sample Template

<!DOCTYPE html>
<html lang="en-US">
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
<script>
var listApp = angular.module('listApp',[]);
listApp.controller('ListController', ['$scope', function($scope) {
$scope.mydata = [ ];

// sample method
$scope.myMethod = function() { 
// code here to update any variables referenced by the view template 
};
}]);
</script>

<!--View template. Add necessary Angular directives -->
<body ng-app="listApp">
<div ng-controller="ListController">
<p>Search : <input type="text"></p>

<b>Total: </b>

</div>
</body>
</html>