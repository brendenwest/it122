var express = require("express");
var app = express();

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(require("body-parser").json()); 
app.use(require("body-parser").urlencoded({extended: true}));
app.use('/api', require('cors')());

// set template engine
var handlebars = require('express-handlebars').create({defaultLayout: 'main', extname: '.hbs', 
    helpers: {
        shortDate: function (date) { 
            if (typeof date == "string") { date = new Date(date); }
            if (!date) { date = new Date(); }
            var month = (date.getMonth() < 10) ? '0' + date.getMonth() : date.getMonth();
            var day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
            return date.getFullYear() + "-" + month + "-" + day; 
        },
    } 
    });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs' );

var routes = require("./lib/routes")(app);

app.use(function(req,res) {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
    console.log('Express started');    
});