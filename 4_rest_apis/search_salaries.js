var http = require('http'),
	express = require('express'),
	salaries = require("../lib/salaries");

var app = express();
app.set('port', process.env.PORT || 3000);

// set template engine
var handlebars = require('express-handlebars').create({extname: '.hbs' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs' );

app.get('/', function(req,res){
    res.type('text/html');
    res.render('search_salaries');
});

app.get('/api/salaries/:kw/:loc', function(req,res){
    salaries.getSalaries(req.params.kw, req.params.loc, function(salary_data) {
	    res.send(salary_data); 
    });
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});