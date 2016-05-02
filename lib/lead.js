var leads = [
    {id: 0, company: "ibm", amount: 50000},
    {id: 1, company: "sap", amount: 10000},
    {id: 2, company: "msft", amount: 75000},
    ];

exports.get = function(company) {
    return leads.find(function(item) {
       return item.company === company;
    });
}

exports.addLead = function(newLead) {
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

exports.deleteLead = function(company) {
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

exports.getLeads = function(company) {
    if (!company) {
        return leads;
    }
    return leads.filter(function(item) {
       return item.company === company;
    });
}
