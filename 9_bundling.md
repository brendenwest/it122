## App Bundling

### Reading

- https://webpack.js.org/concepts/
- https://webpack.js.org/guides/getting-started/
- https://blog.risingstack.com/using-react-with-webpack-tutorial/ 
- https://www.sitepoint.com/webpack-beginner-guide/

### Practice

- https://www.freecodecamp.org/news/an-intro-to-webpack-what-it-is-and-how-to-use-it-8304ecdc3c60/


### Learning Outcomes

- What is app bundling?
- Bundling app dependencies
- Hot reloading during development

### What is Bundling?

In the early days of web development, all `static` assets (JS, CSS, images, etc.) making up an application would be deployed and downloaded to the browser as separate files. 

Some project dependencies (e.g. web frameworks) would need to load from external web sites at run-time.

This presents various performance and workflow problems, so `bundlers` arose to address these. Bundlers can transpile code to support older browsers, concatenate multiple files into a single file, remove duplicated or unused code logic, and minify files by removing white space.

Webpack is a relatively modern and mature bundler that efficiently performs these tasks with minimal configuration, by identifying all the files in a project (the `dependency graph`) and using `loaders` (plugins) to handle specific types of dependencies.

