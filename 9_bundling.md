## App Bundling

### Reading

- https://wpshout.com/best-javascript-build-tools-bundlers/#gref
- https://vite.dev/guide/
- https://webpack.js.org/guides/getting-started/
- https://www.sitepoint.com/webpack-beginner-guide/

### Watch
- https://www.youtube.com/watch?v=NgedfCAVBAY

### Practice

- https://www.freecodecamp.org/news/an-intro-to-webpack-what-it-is-and-how-to-use-it-8304ecdc3c60/


### Learning Outcomes

- What is JavaScript app bundling?
- JavaScript bundlers
- Bundling app dependencies
- Hot reloading during development

### What is Bundling?

In the early days of web development, `static` assets (JS, CSS, images, etc.) making up a front-end application would be deployed and downloaded to the browser as separate files. 

The browser would also need to load some project dependencies (e.g. web frameworks) from 3rd party websites at run-time.

This has performance and workflow problems that `bundlers` arose to address.

Common bundler functionality includes:

- **concatenate** multiple files into a single fil
- **minify** code by removing white space from files
- **transpile** code to support older browsers
- **tree-shaking** to remove unused or redundant code from bundle
- **code-splitting** - output bundle in chunks to support different entrypoints & minimize initial code download
- **plugin support** for specialized bundling

Some bundlers also support:

- running a local development server
- Hot reloading code modules without a full page refresh
- Watching files and generating builds automatically when detecting changes

Several mature bundlers are available and differ mostly in ease of use and feature complexity.

Webpack is perhaps the oldest & most mature of these, but involves some complexity to configure. Newer bundlers have focused on speed and simplified configuration.

- [Webpack](https://webpack.js.org/)
- [ESBuild](https://esbuild.github.io/getting-started/)
- [Parcel](https://parceljs.org/)
- [Rollup](https://rollupjs.org/)
- [Vite](https://vite.dev/guide/) (uses rollup)

### Getting Started with Rollup

```commandline
npm install -D rollup
npm install -D @rollup/plugin-json
npm install -D @rollup/plugin-node-resolve
npm install -D @rollup/plugin-commonjs
```

Sample config for a node.js app:
```commandline
// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json()
  ],
};
```

```commandline
npx rollup --config
```

### Getting Started with Webpack
Webpack is a relatively modern and mature bundler that efficiently performs these tasks with minimal configuration, by identifying all the files in a project (the `dependency graph`) and using `loaders` (plugins) to handle specific types of dependencies.


First, install webpack & related node modules:

```
npm install webpack webpack-cli style-loader --save-dev
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