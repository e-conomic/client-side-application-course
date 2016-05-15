var AppDispatcher = require("../Dispatcher/appDispatcher");
var Constants = require("../constants");
var BaseStore = require("./base");
var CustomerStore = require("./customer-store");
var Utils = require("../Utils/restServiceCalls");

var _customerTransactions = [];

var CustomerTransactionStore = Object.assign({}, BaseStore, {
    getTransactionsByCustomer: (customerNo) => {
        var custTrans = _customerTransactions.filter(t => t.customerNo == customerNo);
        if (custTrans.length == 0) {
            Utils.RESTGetCustomerTransactions(customerNo);
        }
        return custTrans;
    }
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

var registeredCallback = action => {
    switch (action.type) {
        case Constants.SELECT_CUSTOMER:
            AppDispatcher.waitFor([CustomerStore.dispatchToken]);
            if (CustomerStore.getSelectedCustomer() > 0) {
                CustomerTransactionStore.getTransactionsByCustomer(action.payload.customerNo);
            }
            break;
            
        // case Constants.REQUEST_CUSTOMER_TRANSACTIONS:
        //     CustomerTransactionStore.getTransactionsByCustomer(action.payload.customerNo);
        //     break;
            
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