Assignment 4 - Templating with Handlebars
####

This week you learned to separate static content from your Node.js code with templates and Handlebars.

For this assignment you'll apply that knowledge and also organize your application into a master-detail structure. (See these references - https://en.wikipedia.org/wiki/Master%E2%80%93detail_interface & http://uisquare.com/ui-patterns/layouts/master-detail-pattern/ )

You have wide UI design latitude, but your revised application should have these common features:

Master (Home) page
####
- shows page title, footer, and site navigation (incl. link to your 'about' page)
- shows the full list of items in your application. User can select an item to view details,
- shows 'search' entry field
- shows 'new' button that allows user to add a new list item

Detail page
####
- Shows page title, footer, and site navigation (incl. link to home page)
- Shows full details of the current item
- Allows user to update or delete the current item
 
Your application should also exercise these templating capabilities:

- A default layout 
- Separate view templates for the master & detail pages
- a partial template that is used on both master & detail 
- #each iteration logic
- #if conditional logic
- template comment that won't appear in the final html
