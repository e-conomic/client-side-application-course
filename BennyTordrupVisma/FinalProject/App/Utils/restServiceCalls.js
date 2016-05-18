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
    
    RESTUpdateCustomer: function(customer) {
        var completeurl = "http://localhost:59774/api/Customers/" + customer.customerNo;
        request.post(completeUrl)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(customer)
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                console.log(response);
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