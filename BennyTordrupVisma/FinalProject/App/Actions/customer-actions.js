var Constants = require('../constants');
var AppDispatcher = require('../Dispatcher/appDispatcher');
var Utils = require("../Utils/restServiceCalls");


module.exports = {
    selectCustomer: customerNo => {
        AppDispatcher.dispatch({
            type: Constants.SELECT_CUSTOMER,
            payload: {
                customerNo: customerNo
            }
        });
    },
    
    editCustomer: customer => {
      AppDispatcher.dispatch({
          type: Constants.EDIT_CUSTOMER,
          payload: {
              customer: customer
          }
      })  
    },
    
    updateCustomer: customer => {
        Utils.RESTUpdateCustomer(customer);
    }
}