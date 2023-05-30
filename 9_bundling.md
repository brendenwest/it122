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

### Getting Started

First, install webpack node modules:

```
npm install webpack webpack-cli --save-dev
```

Next, let's restructure your project a bit. Webpack expects project source code in a `/src` sub-directory, like this:

```commandline
myproject
  |- package.json
  |- package-lock.json
  |- /src
    |- index.js
    |- /models
    |- /public
    |- /views
```

Webpack versions 4+ can work without configuration for simple projects. But when updating a project with some backend functionality, some configuration is needed.

You can use Webpack's built-in config generator, but it may try to overwrite some of your existing project files and defaults to CommonJS syntax.

Here is a very basic config file that tells webpack to:

- look for project dependencies starting at /src/index.js
- compile CSS with the `css-loader` middleware
- export bundled code to /dist/main.js
- ignore node modules that won't be used in the browser

```commandline
import path from 'path'
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const stylesHandler = "style-loader";

export default {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
    ],
  },
  resolve: {
    fallback: {
      "crypto": false,
      "fs": false,
      "http": false,
      "net": false,
      "path": false,
      "querystring": false,
      "stream": false,
      "url": false,
      "util": false,
      "zlib": false,
    },
  }
};
```

Next, add a `build` script to your `package.json` file:

```json
   "scripts": {
    "test": "jest",
    "build": "webpack"
   },
```

Now you can generate a bundle with this command:

```commandline
npm run build
```