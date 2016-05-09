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
}