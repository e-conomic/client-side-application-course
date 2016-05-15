var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var CustomerStore = require("./customer-store");
var Utils = require("../Utils/restServiceCalls");

var _customerTransactions = [];

var CustomerTransactionStore = Object.assign({}, BaseStore, {
    getAllTransactions: () => {
        return _customerTransactions;
    },
});

function customerTransactionsReceived(payload) {
    var customerTransactionsResponse = JSON.parse(payload.response.text);
    customerTransactionsResponse.map(ct => {
        _customerTransactions.push({
            voucherJournalNo: ct.VoucherJournalNo,
            auditNo: ct.AuditNo,
            customerNo: ct.CustomerNo,
            voucherDate : ct.VoucherDate,
            text: ct.Text,
            amount: ct.Amount,
            invoiceNo: ct.InvoiceNo,
            changedDateTime: ct.ChangedDateTime
        })
    });
}

function fetchCustomerTransactions(payload) {
    var customerNo = payload.customerNo;
    if (_customerTransactions.filter(t => t.customerNo == customerNo).length == 0) {
        Utils.RESTGetCustomerTransactions(customerNo);
    }
}

var registeredCallback = action => {
    switch (action.type) {
        case Constants.SELECT_CUSTOMER:
            AppDispatcher.waitFor([CustomerStore.dispatchToken]);
            if (CustomerStore.getSelectedCustomer() > 0) {
                fetchCustomerTransactions(action.payload);
            }
            break;
            
        case Constants.REQUEST_CUSTOMER_TRANSACTIONS_RESPONSE:
            customerTransactionsReceived(action.payload)
            break;
            
        default:
            return;
    }
    
    CustomerTransactionStore.emitChange();
}

CustomerTransactionStore.dispatchToken = AppDispatcher.register(registeredCallback);

module.exports = CustomerTransactionStore;