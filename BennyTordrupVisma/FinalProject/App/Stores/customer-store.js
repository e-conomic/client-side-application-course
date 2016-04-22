var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");

//var _customers = [];
var _customers = [{
    customerNo: 10000,
    name: 'Benny Tordrup',
    address1: 'Norgesvej 8',
    postCode: '4270',
    postalArea: 'Høng',
}, {
    customerNo: 10001,
    name: 'Ann Schjøts',
    address1: 'Norgesvej 8',
    postCode: '4270',
    postalArea: 'Høng',
}]

var CustomerStore = Object.assign({}, BaseStore, {
    getAllCustomers: () => {
        if (_customers.length == 0) {
            // Get from web service
        } else {
            return _customers;
            // var customers = _customers.slice();
            // return customers;
        }
    }
});

function customersReceived(payload) {
    var customersResponse = payload.response.text;
}

var registeredCallback = action => {
    switch (action.type) {
        case Constants.REQUEST_CUSTOMERS_RESPONSE:
            break;
            
        default:
            return;
    }
    
    CustomerStore.emitChange();
}

CustomerStore.dispatchToken = AppDispatcher.register(registeredCallback);

module.exports = CustomerStore;