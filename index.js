var express = require("express");
var app = express();

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

app.get('/', function(req,res){
    res.type('text/html');
    res.sendfile('./public/home.html');    
});

app.get('/about', function(req,res){
    res.type('text/plain');
    res.send('About page');
});

var leads = [
    {id: 0, name: "ibm", amount: 50000},
    {id: 1, name: "sap", amount: 10000},
    {id: 2, name: "msft", amount: 75000},
    ];

app.post('/search', function(req,res){
    res.type('text/html');
    var header = 'Searching for: ' + req.body.search_term + '<br>';
    var found = leads.find(function(item) {
       return item.name == req.body.search_term;
    });
    
    if (found) {
        res.send(header + "Amount: " + found.amount);
    } else {
        res.send(header + "Not found");
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