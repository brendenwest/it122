'use strict'

import http from 'http';
import { readFile } from 'fs';
import { parse } from "querystring";
import * as book from "../lib/book.js";

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  readFile(path, (err, data) => {
      if (err) {
        console.log(err)
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer((req,res) => {
  let url = req.url.split("?");  // separate route from query string
  let query = parse(url[1]); // convert query string to object
  let path = url[0].toLowerCase();

  switch(path) {
    case '/': 
      serveStatic(res, '../public/home.html', 'text/html');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About me: Call me Ishmael');
      break;
    case '/get':
      let found = book.getItem(query.title); // get book object
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = (found) ? JSON.stringify(found) : "Not found";
      res.end('Results for ' + query.title + "\n" + results);
      break;
    case '/delete':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('delete');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
  }
  
}).listen(process.env.PORT || 3000);