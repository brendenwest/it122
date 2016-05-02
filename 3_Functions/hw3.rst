Assignment 3 - Modular Design
####
Last week you built a form and search route, letting users find list items that match a specific entry.

This week, you'll extend this form to let users update the list and see more detail about list contents. You'll also encapsulate some list behavior into a separate module to make your main application script more readable.

- First, save out a copy of your server script from HW #2,
- Next, move your list data and methods into a dedicated node module, as shown in Ch.4 of the textbook,
- Call this new module into your index.js script,
- Now, extend your form, server routes, and module to let users:

    - add an item (if not already in the list)
    - remove an existing item,
    - update an existing item,

On completion of each action, your application should notify users with an appropriate success or failure message. For example, if you add a book to the list, you might notify users:

"[BOOK TITLE] added. N total books"

Tips:
####
- The 'Search' behavior from HW #2 should continue to work as before,
- For simplicity, assume one property identifies unique list items. For example, if you have a book list, book titles could be the unique property,
- Items that you update or remove may be anywhere in your list, so you'll need their array index value in order to make changes. See the Array.find() method reference for examples,
- When users add or update items, they should be able to enter values for all item properties. 
- Your form page will have multiple buttons. You can use JQuery 'onClick' events to submit the form to the appropriate route for each button,
- Storing the list to a DB or to disk is outside the scope of this assignment, so updates will only persist while your server script is running,
