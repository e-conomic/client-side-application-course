var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');

module.exports = {
    receiveCustomersResponse: function(response) {
        AppDispatcher.dispatch({
            type: Constants.REQUEST_CUSTOMERS_RESPONSE,
            payload: {
                response: response
            }
        });
    },
    
    editCustomerResponse: function(response) {
        AppDispatcher.dispatch({
            type: Constants.EDIT_CUSTOMER_RESPONSE,
            payload: {
                response: response
            }
        });
    },
    
    receiveCustomerTransactionsResponse: function(response) {
        AppDispatcher.dispatch({
            type: Constants.REQUEST_CUSTOMER_TRANSACTIONS_RESPONSE,
            payload: {
                response: response
            }
        });
    },
    
    receiveCustomerOrdersResponse: function(response) {
        AppDispatcher.dispatch({
            type: Constants.REQUEST_CUSTOMER_ORDERS_RESPONSE,
            payload: {
                response: response
            }
        });
    },
}