Assignment 5 - Providing REST api's
####

Your application is taking shape and collecting super valuable information. Other people will want access to this data, so now you'll provide REST API's they can use.

For now, you want to ensure data updates only happen through your application UI, so the new API's will support read-only actions to:

- get all items in your data set as JSON data,
- get details of a specific item in your data set as JSON data,

Your API's should be accessible to clients on other domains (cross-origin resource sharing), and should provide an appropriate error status & message in case the request fails.

Your main application file is getting a bit cluttered now, so you should also organize your routes (existing and new API's) into a dedicated 'routes.js' module that's called into the main application script.