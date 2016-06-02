var Lead = require("../models/lead");

// insert several new docs into the database
new Lead({company:"Ibm", contact:"fred", amount: 10000, close_date: "05-21-2016"}).save();
new Lead({company:"google", contact:"sue", amount: 70000, close_date: "05-28-2016"}).save();

// find all documents 
Lead.find(function(err, leads) {
    // output error if one occurred
    if (err) {
        console.log(err);
    } else {
        // otherwise output the array of documents
        console.log(leads);
    }
});

