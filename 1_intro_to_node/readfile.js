const fs = require("fs");

function doneReading(err, data) {
   if (err) return console.error(err);
   console.log('2 - ' + data.toString());
}

console.log("1 - Program Start");
fs.readFile('intro.js', doneReading);

console.log("3 - Program Ended");