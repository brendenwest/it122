var express = require("express");
var app = express();
var lead = require("./lib/lead");

var back_link = "<p><a href='/'>Back</a>";

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(require("body-parser").urlencoded({extended: true}));

// set template engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs' );

app.get('/', function(req,res){
    res.type('text/html');
    res.render('home', {leads: lead.getAll()} );    
});

app.get('/detail/:company', function(req,res){
    res.type('text/html');
    res.render('detail', {lead: lead.get(req.params.company)} );    
});

app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.company + '<br>';
    var found = lead.find(req.body.company);
    if (found) {
        res.send(header + "Found: " + found.length);
    } else {
        res.send(header + "Not found");
    }
});

app.post('/add', function(req,res) {
    res.type('text/html');
    // construct new 'lead' object for comparison against existing objects
    var newLead = {"company":req.body.company, "contact":req.body.contact, "amount":req.body.amount, "close":req.body.close}
    var result = lead.add(newLead);
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