var ServerActions = require("../Actions/server-actions");
var request = require("superagent");
var Format = require("string-format-js");

const baseUrl = "http://localhost:59774/api";
const sCust = "Customers";
const sCustTrans ="CustomerTransactions";
const sCustOrders = "CustomerOrders";

module.exports = {
    RESTGetCustomers: function() {
        var completeUrl ="%s/%s".format(baseUrl, sCust); 
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveCustomersResponse(response);
            });
    },
    
    RESTAddCustomer: function(customer) {
        var completeUrl ="%s/%s".format(baseUrl, sCust); 
        request.post(completeUrl)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(customer))
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.editCustomerResponse(response);
            });
    },
    
    RESTUpdateCustomer: function(customer) {
        var completeUrl ="%s/%s/%d".format(baseUrl, sCust, customer.customerNo); 
        request.put(completeUrl)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(customer))
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.editCustomerResponse(response);
            });
    },
    
    RESTDeleteCustomer: function(customer) {
        var completeUrl ="%s/%s/%d".format(baseUrl, sCust, customer.customerNo); 
        request.del(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.deleteCustomersResponse(response);
            });
    },
    
    RESTGetCustomerTransactions: function(customerNo) {
        var completeUrl ="%s/%s/%d".format(baseUrl, sCustTrans, customerNo); 
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveCustomerTransactionsResponse(response);
            });
    },
    
    RESTGetCustomerOrders: function(customerNo) {
        var completeUrl ="%s/%s/%d".format(baseUrl, sCustOrders, customerNo); 
        request.get(completeUrl)
            .set('Accept', 'application/json')
            .end((err, response) => {
                if (err)
                    console.error(err);
                    
                ServerActions.receiveCustomerOrdersResponse(response);
            })
    }
};