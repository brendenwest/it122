module.exports = function(app) {
    var lead = require("../lib/lead");

    // UI routes
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
    
    // API routes
    app.get('/api/leads', function(req,res) {
        var leads = lead.getAll();
        if (leads) {
            res.json(leads);    
        } else {
            res.status(404).send("404 - not found");    
        }
    });

    app.get('/api/detail/:company', function(req,res) {
        var found = lead.get(req.params.company);
        if (found) {
            res.json(found);    
        } else {
            res.status(404).send("404 - not found");    
        }
    });
    
}