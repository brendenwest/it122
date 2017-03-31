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
- Out-of-scope
- Client/server architecture
- What is Node.js?
- Installing Node.js
- Node Package Manager (npm)
- Basic Node.js server 
- Routes 
- Serving files

Out-of-scope
####
- Stuff you should know - JavaScript, HTML, JQuery, CSS
- Build tools - Grunt, Gulp, Bower, LESS/SASS, Webpack
- Other MVC frameworks - React, Ember, Ionic
- JS variants - TypeScript, CoffeeScript
- High-performance Node.js applications

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

Default node modules at https://nodejs.org/dist/latest-v6.x/docs/api/ 

Key Node.js modules
####
- Globals
- Filesystem
- HTTP / HTTPS

You can run Node.js interactively to execute JavaScript commands (REPL) at the command line. For example:

	$ node
	> var x = 1;

You can run JavaScript files with Node at the command line. Files can contain any valid JavaScript commands and can include core Node.js modules.

For example, a basic web server:

    var http = require("http"); 
    http.createServer(function(req,res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Aloha world');
    }).listen(process.env.PORT || 3000);

- includes Node’s core ‘http’ module for handling requests & responses
- starts a server application and listens for requests on a specific port.
- Uses whatever port is assigned by the operating system or ‘3000’ if none provided
- when the application receives a request, it sends a response with a ‘success’ status header and basic test

Basic Routes
####
Your application can send different responses according to details of the request. A common practice is to send different responses for different requested urls (routes). (Brown, p.15)

    var http = require("http"); 
    http.createServer(function(req,res) {
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

NPM
####
Node.js applications can include npm modules for additional functionality.

- You can find Node modules at - https://www.npmjs.com/ 
- Docs at https://docs.npmjs.com/ 
- Some useful npm modules - https://www.npmjs.com/browse/star 
    - express - framework to handle web requests
    - cheerio - server side JQuery for parsing html files
    - async - for organizing asynchronous tasks
    - lodash - functional javascript utilities

npm packages
####
All npm modules have a package.json file that describes the module
Rules for package.json at https://docs.npmjs.com/files/package.json 
- Packages are installed with - npm install <PACKAGE_NAME>
- Packages can be installed locally (in a node_modules sub-directory of the current folder) or globally. The latter are accessible for all node applications on the computer.
- Be sure to update .gitignore file to exclude node-modules directory

Useful npm commands:
****
- npm init - create a package.json file
- npm config list - show my Nodejs configuration
- npm list [global] - show what modules I have installed
- npm search <package> - search for packages by name
- npm install <options> <package>@<version>
- npm install -save <package>
- npm install -g <package>
- npm update <package> - update a package already installed. <package> must be listed as a dependency in package.json

Sample Exercises
####
- Run Node interactively from the terminal. Try various JS commands
- Create a javascript file (e.g. program.js) that you can execute from the command line with Node.js. In the file, apply various javascript commands and emit results to the console.
- https://github.com/workshopper/learnyounode 
