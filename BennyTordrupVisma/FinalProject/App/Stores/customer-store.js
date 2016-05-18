var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var Utils = require("../Utils/restServiceCalls");

var _customers = [];
var _selectedCustomer = 0;

var CustomerStore = Object.assign({}, BaseStore, {
    getSelectedCustomer: () => {
        return _selectedCustomer;
    },
    
    getAllCustomers: () => {
        if (_customers.length == 0) {
            Utils.RESTGetCustomers();
        }
        return _customers;
    },
});

function selectCustomer(payload) {
    _selectedCustomer = payload.customerNo;
    console.log("Selected customer: " + _selectedCustomer);
}

function customersReceived(payload) {
    var customersResponse = JSON.parse(payload.response.text);
    customersResponse.map(c => {
        _customers.push({
            associateNo: c.AssociateNo,
            customerNo: c.CustomerNo,
            name: c.Name,
            address1 : c.Address1,
            address2 : c.Address2,
            address3 : c.Address3,
            address4 : c.Address4,
            postCode: c.PostCode,
            postalArea: c.PostalArea,
            phone: c.Phone,
            changedDateTime: c.ChangedDateTime
        })
    });
}

var registeredCallback = action => {
    switch (action.type) {
        case Constants.SELECT_CUSTOMER:
            selectCustomer(action.payload);
            break;
            
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