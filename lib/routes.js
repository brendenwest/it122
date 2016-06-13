module.exports = function(app) {
    var Lead = require("../models/lead");
    var path = require('path');

    // UI routes
    
    // old handlebars version
    app.get('/old', function(req,res){
        Lead.find(function (err, leads) {
            if (err) return next(err);
            if (!leads) return next();
            res.type('text/html');
            res.render('home', {leads: leads } );
        });
    });

    // new Angular version
    app.get('/', function(req,res){
            res.type('text/html');
            res.sendFile(path.join(__dirname, '../8_angular', 'index.html'));
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
        Lead.findByIdAndUpdate({_id:req.body.id}, new_lead, function(err, result) {
            if (err) {
                new Lead(new_lead).save(function(err){
                action = "Added";
                 res.render('detail', {lead: new_lead, result: "Added"} );            
                });
            } else {
             res.render('detail', {lead: new_lead, result: "Updated"} ); 
            }
        });
    });

    app.post('/delete', function(req,res) {
        Lead.remove({"_id":req.body.id }, function(err) {
            var action = (err) ? err : "Deleted";
            res.type('text/html');
            res.render('detail', {lead: {}, result: action} );            
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

    app.post('/api/add', function(req,res) {
        console.log(req.body);
        var new_lead = {"company":req.body.company, "contact":req.body.contact, "amount":req.body.amount, "close_date":req.body.close_date };
        Lead.findByIdAndUpdate({_id:req.body._id}, new_lead, function(err, result) {
            if (err) {
                new Lead(new_lead).save(function(err){
                res.json({"result":"added"});    
                });
            } else {
                res.json({"result":"updated"});    
            }
        });
    });
    
    app.post('/api/delete', function(req,res) {
        Lead.remove({"_id":req.body._id }, function(err) {
            if (err) {
                res.json({"result":err});
            } else {
                res.json({"result":"deleted"});
            }
        });
    });

    
}