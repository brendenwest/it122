module.exports = function(app) {
    var Lead = require("../models/lead");

    // UI routes
    app.get('/', function(req,res){
        Lead.find(function (err, leads) {
            if (err) return next(err);
            if (!leads) return next();
            res.type('text/html');
            res.render('home', {leads: leads } );
        });
    });

    app.get('/detail/:company', function(req,res){
        var company = req.params.company;
        Lead.findOne({"company": company}, function (err, found_lead) {
            if (err) return next(err);
            if (!found_lead) {
                found_lead = {company: company};
            }
            res.type('text/html');
            res.render('detail', {lead: found_lead } );
        });
    });

    app.get('/about', function(req,res){
        res.type('text/html');
        res.render('about');
    });
    
    app.post('/search', function(req,res){
        var company = req.body.company;
        Lead.findOne({'company': company}, function (err, found_lead) {
            if (err) return next(err);
            if (!found_lead) {
                // requested item not found. pre-fill detail with text from search req
                found_lead = {'company': company, 'close_date': new Date() };
            }
            res.type('text/html');
            res.render('detail', {lead: found_lead } );
        });
    });
    
    app.post('/add', function(req,res) {
        var new_lead = {"company":req.body.company, "contact":req.body.contact, "amount":req.body.amount, "close_date":req.body.close_date };
        var lead_id = (req.body.id) ? req.body.id : "";
        Lead.update({"id":lead_id }, new_lead, {upsert:true}, function(err, numberAffected) {
             var action = (numberAffected) ? "updated" : "added";
             res.render('detail', {lead: new_lead, result: {'action': action}} );            
        });
    });
    
    app.post('/delete', function(req,res) {
        console.log(req.body.id);
        Lead.remove({"_id":req.body.id }, function(err) {
        console.log(err);
            var action = (err) ? err : "deleted";
            res.type('text/html');
            res.render('detail', {result: action} );            
        });
    });
    
    // API routes
    app.get('/api/leads', function(req,res) {
        Lead.find(function (err, leads) {
            if (err) return next(err);
            if (leads) {
                res.json(leads);    
            } else {
                res.status(404).send("404 - not found");    
            }
        });
    });

    app.get('/api/detail/:company', function(req,res) {
        Lead.findOne({"company": req.params.company}, function (err, found) {
            if (found) {
                res.json(found);    
            } else {
                res.status(404).send("404 - not found");    
            }
        });
    });
    
}