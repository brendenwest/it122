Assignment 2
####
This week, you'll apply your knowledge of Express and request/response objects to create a simple Search feature for your ‘list’ application. 

- Convert your index.js script from week 1 HW to Express application syntax,
- Install the body-parser npm module as a dependency for your application,
- Define a javascript array with information about items in your list (see Brown p.66 for an example),
- Update your home.html page to display a ‘Search’ form with a text field corresponding the array field you want to search. For example, if your application is a book list, users could search for a book title.
- When submitted, the form should post to a ‘/search’ route in your application. This route should display:

    - the user’s entry (e.g. ‘Searching for [BOOK TITLE]’)
    - item details, if found in the array,
    - a not-found message if item is not in the array (e.g. ‘No records found’)
 

Tips:
####
- To serve up your home.html page via Express, you can use the 'sendFile() method described here - http://www.hacksparrow.com/how-to-server-static-html-files-in-express-js.html  
- To get values in the form submission, you'll need to configure Express to use the body-parser middleware. Ch. 8 has an example of the syntax under 'Form Handling with Express'
- Keep your search field simple. For example, requiring entries to have spaces (e.g ‘firstname lastname’) or mixed case to match items in your list will unnecessarily complicate your work,
- Client-side form validation isn’t required for this assignment, but you can use HTML5 field attributes like ‘required’ and ‘maxlength’ to prevent the most basic errors.
- For this assignment, the array of list items (or even the type of list) can be temporary. Don't worry about making it just right for your final application,
- Make code changes incrementally and get each step working before moving to the next. When you get a step working, commit your work to GIT so you can roll back if things get messy,
- Focus on the assignment's functional requirements before refining the UI appearance, so you don't run out of time.