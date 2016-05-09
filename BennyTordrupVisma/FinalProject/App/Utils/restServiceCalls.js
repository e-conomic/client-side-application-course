var ServerActions = require("../Actions/customer-server-actions");
var request = require("superagent");

module.exports = {
    RESTGetCustomers: function() {
        var completeUrl = "http://localhost:59774/api/Customers"; 
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveCustomersResponse(response);
            });
    },
};