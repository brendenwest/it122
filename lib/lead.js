var leads = [
    {id: 0, company: "ibm", contact: "mike", amount: 50000, close_date: "05-24-2016"},
    {id: 1, company: "sap", contact: "sue", amount: 10000, close_date: "06-30-2016"},
    {id: 2, company: "msft", contact: "dave", amount: 75000, close_date: "07-12-2016"},
    ];

exports.get = function(company) {
    return leads.find(function(item) {
       return item.company === company;
    });
}

exports.add = function(newLead) {
    var found = false;
    leads.forEach(function(item,index){
        if (item.company == newLead.company) {
            leads[index] = newLead;
            found = true;
        }
    });
    if (!found) {
        leads.push(newLead);
    }
    return {"added": !found, "total": leads.length };
}

exports.delete = function(company) {
    var deleted = false;
    console.log(company)
    leads.forEach(function(item,index){
        if (item.company == company) {
            console.log(item)
            leads.splice(index, 1);
            deleted = true;
        }        
    });
    return { "deleted": deleted, "total": leads.length };
}

exports.getAll = function() {
        return leads;
}

exports.find = function(company) {
    return leads.filter(function(item) {
       return item.company === company;
    });
}
