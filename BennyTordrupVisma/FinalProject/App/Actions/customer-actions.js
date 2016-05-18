var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');
var Utils = require("../Utils/restServiceCalls");


module.exports = {
    selectCustomer: function(customerNo) {
        AppDispatcher.dispatch({
            type: Constants.SELECT_CUSTOMER,
            payload: {
                customerNo: customerNo
            }
        });
        
        // AppDispatcher.dispatch({
        //     type: Constants.REQUEST_CUSTOMER_TRANSACTIONS,
        //     payload: {
        //         customerNo: customerNo
        //     }
        // });
    },
    
    updateCustomer: function(customer) {
        Utils.RESTUpdateCustomer(customer);
        // AppDispatcher.dispatch({
        //     type: Constants.UPDATE_CUSTOMER,
        //     payload: {
        //         customer: customer
        //     }
        // });
    }
}