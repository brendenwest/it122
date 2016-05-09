var express = require("express");
var app = express();
var lead = require("../lib/lead");

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(require("body-parser").urlencoded({extended: true}));

// set template engine
var viewsPath = __dirname + '/../views';  
var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs', layoutsDir: viewsPath + '/layouts',  
  partialsDir: viewsPath + '/partials' });
app.engine('hbs', handlebars.engine);
app.set('views', viewsPath );
app.set('view engine', 'hbs' );

app.get('/', function(req,res){
    res.type('text/html');
    res.render('home', {leads: lead.getAll()} );    
});

app.get('/detail/:company', function(req,res){
    res.type('text/html');
    var found = lead.get(req.params.company);
    if (!found) {
        // note - new lead has no ID yet
        found = {company: req.params.company};
    }
    res.render('detail', {lead: found} );    
});

app.get('/about', function(req,res){
    res.type('text/html');
    res.render('about');
});

app.post('/search', function(req,res){
    res.type('text/html');
    var found = lead.get(req.body.company);
    if (!found) {
        // note - new lead has no ID yet
        found = {company: req.body.company};
    }
    res.render('detail', {lead: found} );    
});

app.post('/add', function(req,res) {
    res.type('text/html');
    // construct new 'lead' object for comparison against existing objects
    var newLead = {"company":req.body.company, "contact":req.body.contact, "amount":req.body.amount, "close_date":req.body.close_date}
    var result = lead.add(newLead);
    res.render('detail', {lead: newLead, result: result} );    
});

app.post('/delete', function(req,res){
    res.type('text/html');
    var result = lead.delete(req.body.company);
    res.render('detail', {result: result} );    
});


app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});