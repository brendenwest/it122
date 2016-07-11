Assignment #9 - Converting to SPA
####

Now that you're familiar with Angular, it's time to convert your list app into a full-fledged single-page application. 

For posterity and future reference, leave your existing handlebars-based app in place.

- create a new .html page that includes the UI for both your master and detail screens. 
- Use AngularJS to hide/show each screen (master or detail) as appropriate. For example, the master should be visible when the app first launches. Detail should become visible when the user selects an item from your list.
- Use AngularJS to load your list data (hint: via $http request to your API), and to populate screens with appropriate information without reloading the app,
- Use AngularJS to add, update, and delete selected items without reloading the app

NOTE:

- Since your full list of items is loaded into the HTML page, you can perform 'search' in the client (no server request needed)
- You can use Angular's $http service to communicate with your server to add, update, and delete items,
- You'll need new API routes for add, update, & delete, which can be similar to your existing routes, but returning a JSON-formatted response instead of fully-formed HTML
- You can simplify data changes by assigning the selected item to a $scope variable, binding your form fields to properties of that variable, and passing that variable as the 'data' element in your $http post requests.  
- Including this line in your main application file will allow your server to parse the submitted data element into key/value pairs and attach them to the request body:

    app.use(require("body-parser").json());  