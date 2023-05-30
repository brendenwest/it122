var leads = [
    {id: 0, company: "ibm", contact: "mike", amount: 50000, close_date: "05-24-2016"},
    {id: 1, company: "sap", contact: "sue", amount: 10000, close_date: "06-30-2016"},
    {id: 2, company: "msft", contact: "dave", amount: 75000, close_date: "07-12-2016"},
    ];

exports.get = (company) => {
    return leads.find((item) => {
       return item.company === company;
    });
}

exports.add = (newLead) => {
    var found = this.get(newLead.company);
    if (!found) {
        newLead.id = leads.length;
        leads.push(newLead);
    }
    var action = (found) ? "updated" : "added";
    return {"action": action, "total": leads.length };
}

exports.delete = (company) => {
    var len = leads.length;    
    leads = leads.filter( (item) => {
        return item.company !== company;
    });
    var action = (leads.length == len) ? "" : "deleted";
    return { "action": action, "total": leads.length };
}

exports.getAll = () => {
        return leads;
}