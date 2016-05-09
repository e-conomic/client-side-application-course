var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var Utils = require("../Utils/restServiceCalls");

var _customers = [];
// var _customers = [{
//    customerNo: 10000,
//    name: 'Benny Tordrup',
//    address1: 'Norgesvej 8',
//    postCode: '4270',
//    postalArea: 'Høng',
// }, {
//    customerNo: 10001,
//    name: 'Ann Schjøts',
//    address1: 'Norgesvej 8',
//    postCode: '4270',
//    postalArea: 'Høng',
// }]

var CustomerStore = Object.assign({}, BaseStore, {
    getAllCustomers: () => {
        if (_customers.length == 0) {
            Utils.RESTGetCustomers();
        }
        return _customers;
        // if (_customers.length == 0) {
        //     Utils.RESTGetCustomers();
        // } 
        // else {
        //     return _customers;
        // }
    }
});

function customersReceived(payload) {
    var customersResponse = JSON.parse(payload.response.text);
    customersResponse.map(c => {
        _customers.push({
            customerNo: c.CustomerNo,
            name: c.Name,
            address1 : c.Address1,
            postCode: c.PostCode,
            postalArea: c.PostalArea
        })
    });
}

var registeredCallback = action => {
    switch (action.type) {
        case Constants.REQUEST_CUSTOMERS_RESPONSE:
            customersReceived(action.payload)
            break;
            
        default:
            return;
    }
    
    CustomerStore.emitChange();
}

CustomerStore.dispatchToken = AppDispatcher.register(registeredCallback);

module.exports = CustomerStore;