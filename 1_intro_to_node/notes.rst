Week 1 - Introduction to Node.js
****
Reading
####
- Brown, Ch. 1 - Skip sections on Express
- Brown, Ch. 2 - Getting Started with Node
- Brown, Ch. 4 - NPM packages section

Topics
####
- Class overview
- Client/server architecture
- Node.js intro
- Basic web server 
- Handling routes 
- Serving static files
- Node Package Manager (npm)

Class Overview
----
This class covers client-server (full-stack) web development with JavaScript technologies, focused on Node.js. It assumes prior knowledge of basic web development (JS, HTML, CSS, DOM, HTTP, etc.)

Because the JavaScript ecosystem is huge, we won't have time to cover some interesting topics:
- Build tools - Grunt, Gulp, Bower, LESS/SASS, Webpack
- Other common JS frameworks - Angular, Ember, Ionic, VueJS, D3
- JS variants - TypeScript, CoffeeScript

Client-server architecture
####
- Client = browser = front-end
- Server = a remote ‘back-end’ computer 
- Full-stack = front-end & back-end
- Clients send ‘requests’ to server and receive ‘responses’ back
- Server may run any number of applications in a variety of programming languages (e.g. Node.js, Java, C#, PHP, Python)
- Server may connect to other specialized back-end computers (e.g. database, file storage, image server, message queue, etc.)

What is Node.js?
####
Node.js is a run-time engine that executes JavaScript code outside the browser. Originally intended as a web server, but also commonly used for web development tools and automation. 

- Installation https://nodejs.org/en/ (v8.x)
- Documentation - https://nodejs.org/dist/latest-v8.x/docs/api/

You can run Node.js **interactively** to execute JavaScript commands at the command line (aka REPL). For example:

	$ node
	> var x = 1;
	> console.log(x)

This is less useful for multi-line commands. So you can also run javascript files from the OS with Node like so:

    $ node index.js

Where the .js file is plain text, can contain any valid JavaScript commands, and can include Node.js modules.

For example, a basic web server:

    var http = require("http"); 
    http.createServer((req,res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Aloha world');
    }).listen(process.env.PORT || 3000);

- includes Node’s core ‘http’ module for handling requests & responses
- starts a server application and listens for requests on a specific port.
- Uses whatever port is assigned by the operating system or ‘3000’ if none provided
- when the application receives a request, it sends a response with a ‘success’ status header and basic test

When you run this script at the command prompt, Node.js will start a server **process** and wait for requests. You can make requests to the server via a web browser at http://localhost:3000 or http://127.0.0.1:3000

Basic Routes
####
Your web server can send different responses for different types of requests. Requests usually differ by url (aka route). (Brown, p.15)

For example, this script sends different responses based on the url property of the request object:

    var http = require("http"); 
    http.createServer((req,res) => {
        var path = req.url.toLowerCase();    
        switch(path) {
            case '/':
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Home page');
                break;
            case '/about':
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('About page');
                break;
            default:
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Not found');
                break;
        }    
    }).listen(process.env.PORT || 3000);

Serving files
####
Your Node.js application can read files from the filesystem and send file contents in the http response (see Brown p. 16). Note - be sure your file references match the actual file locations.

Node Package Manager (NPM)
####
Node.js applications can include npm modules for additional functionality.

- You can find Node modules at -  https://www.npmjs.com/browse/star 
- Docs at https://docs.npmjs.com/ 
- Some key npm modules: 
    - express - framework to handle web requests
    - express-handlebars - template handler
    - cheerio - server side JQuery for parsing html files
    - async - for organizing asynchronous tasks
    - lodash - functional javascript utilities

npm packages
####
All npm modules have a package.json file that describes the module. 
- Rules for package.json at https://docs.npmjs.com/files/package.json
- node modules are installed with:

    $ npm install <MODULE_NAME>

- modules can be installed and package.json updated at the same time:

    $ npm install --save <MODULE_NAME>

- modules can be installed locally (in a node_modules sub-directory of the current folder) or globally. The latter are accessible for all node applications on the computer.
- Be sure to update the **.gitignore** file to exclude node-modules directories

Useful npm commands:
****
- npm init - create a package.json file
- npm config list - show my Nodejs configuration
- npm list [global] - show what modules I have installed
- npm search <module> - search for modules by name
- npm install <options> <module>@<version>
- npm install --save <module>
- npm install --save-dev <module> - install module as a **dev** dependency
- npm install -g <module>
- npm update <module> - update a module already installed. <module> must be listed as a dependency in package.json

Sample Exercises
####
- Run Node interactively from the terminal. Try various JS commands
- Create a javascript file (e.g. program.js) that you can execute from the command line with Node.js. In the file, apply various javascript commands and emit results to the console.
- https://github.com/workshopper/learnyounode 
