var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var CustomerStore = require("./customer-store");
var Utils = require("../Utils/restServiceCalls");

var _customerOrders = [];

var CustomerOrderStore = Object.assign({}, BaseStore, {
    getAllOrders: () => {
        return _customerOrders;
    },
});

function customerOrdersReceived(payload) {
    var customerOrdersResponse = JSON.parse(payload.response.text);
    customerOrdersResponse.map(ct => {
        _customerOrders.push({
            orderNo: ct.OrderNo,
            orderDate: ct.OrderDate,
            customerNo: ct.CustomerNo,
            requiredDeliveryDate : ct.RequiredDeliveryDate,
            invoiceAmountSoFar: ct.InvoiceAmountSoFar,
            invoiceAmountInFuture: ct.InvoiceAmountInFuture,
            invoiceAmountTotal: ct.InvoiceAmountTotal,
            changedDateTime: ct.ChangedDateTime
        })
    });
}

function fetchCustomerOrders(payload) {
    var customerNo = payload.customerNo;
    if (_customerOrders.filter(t => t.customerNo == customerNo).length == 0) {
        Utils.RESTGetCustomerOrders(customerNo);
    }
}

var registeredCallback = action => {
    switch (action.type) {
        case Constants.SELECT_CUSTOMER:
            AppDispatcher.waitFor([CustomerStore.dispatchToken]);
            if (CustomerStore.getSelectedCustomer() > 0) {
                fetchCustomerOrders(action.payload);
            }
            break;
            
        case Constants.REQUEST_CUSTOMER_ORDERS_RESPONSE:
            customerOrdersReceived(action.payload)
            break;
            
        default:
            return;
    }
    
    CustomerOrderStore.emitChange();
}

CustomerOrderStore.dispatchToken = AppDispatcher.register(registeredCallback);

module.exports = CustomerOrderStore;