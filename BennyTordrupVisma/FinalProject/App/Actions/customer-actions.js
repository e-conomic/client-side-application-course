var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');

module.exports = {
    selectCustomer: function(customerNo) {
        AppDispatcher.dispatch({
            type: Constants.SELECT_CUSTOMER,
            payload: {
                customerNo: customerNo
            }
        });
        
        AppDispatcher.dispatch({
            type: Constants.REQUEST_CUSTOMER_TRANSACTIONS,
            payload: {
                customerNo: customerNo
            }
        });
    }
}