var ServerActions = require("../Actions/server-actions");
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
    
    RESTGetCustomerTransactions: function(customerNo) {
        var completeUrl = "http://localhost:59774/api/CustomerTransactions/" + customerNo;
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveCustomerTransactionsResponse(response);
            });
    },
    
    RESTGetCustomerOrders: function(customerNo) {
        var completeUrl = "http://localhost:59774/api/CustomerOrders/" + customerNo;
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveCustomerOrdersResponse(response);
            })
    }
};