var express = require("express");
var app = express();
var lead = require("../lib/lead");

var back_link = "<p><a href='/'>Back</a>";

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(require("body-parser").urlencoded({extended: true}));

app.get('/', function(req,res){
    res.type('text/html');
    // tell Express to use 'public' sub-folder in the week 2 directory
    var options = { root: __dirname + '/../public/' }
    res.sendFile('home.html', options);    
});

app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page' + back_link);
});

app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.company + '<br>';
    var found = lead.find(req.body.company);
    if (found) {
        res.send(header + "Found: " + found.length + back_link);
    } else {
        res.send(header + "Not found" + back_link);
    }
});

app.post('/add', function(req,res){
    res.type('text/html');
    var newLead = {"company":req.body.company, "amount":req.body.amount}
    var result = lead.add(req.body.company);
    if (result.added) {
        res.send("Added: " + req.body.company + "<br>New total = " + result.total + back_link);
    } else {
        res.send("Updated: " + req.body.company + back_link);
    }
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var result = lead.delete(req.body.company);
    if (result.deleted) {
        res.send("Deleted: " +  req.body.company + '<br>New total = ' + result.total + back_link);
    } else {
        res.send(req.body.company + " not found" + back_link);
    }
});


app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});