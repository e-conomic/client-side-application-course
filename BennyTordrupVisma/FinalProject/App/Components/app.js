var React = require("react");
var ReactDOM =require("react-dom");
var Constants = require("../constants");
var CustomerList = require("./CustomerList");
var CustomerTransactionList = require("./CustomerTransactionList");
var CustomerOrderList = require("./CustomerOrderList");
var CustomerStore = require("../Stores/customer-store");
var CustomerTransactionStore = require("../Stores/customer-transactions-store");
var CustomerOrderStore = require("../Stores/customer-orders-store");
var CustomerEditForm = require("./Customer-Edit");

function getCustomerState(){
    return {
        allCustomers: CustomerStore.getAllCustomers(),
        selectedCustomer: CustomerStore.getSelectedCustomer(),
    }    
}

var App = React.createClass({
    getInitialState: function () {
        return {
                allCustomers: CustomerStore.getAllCustomers(),
                selectedCustomer: CustomerStore.getSelectedCustomer(),
                allTransactions: [],
                allOrders: [],
                isEditingCustomer: false,
                editCustomer: null
            };
    },
    
    componentDidMount: function () {
        CustomerStore.addChangeListener(this._onChange);
        CustomerTransactionStore.addChangeListener(this._onTransactionsChange);
        CustomerOrderStore.addChangeListener(this._onOrdersChange);
    },
    
    componentWillUnmount: function () {
        CustomerStore.removeChangeListener(this._onChange);
        CustomerTransactionStore.removeChangeListener(this._onTransactionsChange);
        CustomerOrderStore.removeChangeListener(this._onOrdersChange);
    },
    
	render: function () {
        return  <div>
                    {this.state.isEditingCustomer && 
                        <div>
                            <CustomerEditForm editCustomer={this.state.editCustomer} onFinishEdit={this._onFinishEdit} />
                        </div>}
                    {!this.state.isEditingCustomer &&
                        <div>
                            <CustomerList allCustomers={this.state.allCustomers} selectedCustomer={this.state.selectedCustomer} onEditCustomer={this._editCustomer} />
                            <div className="spacer"></div>
                            <ul className="nav nav-tabs">
                                <li className="active"><a data-toggle="tab" href="#transactions">Transactions</a></li>
                                <li><a data-toggle="tab" href="#orders">Orders</a></li>
                            </ul>

                            <div className="tab-content">
                                <div id="transactions" className="tab-pane fade in active">
                                    <CustomerTransactionList allTransactions={this.state.allTransactions} selectedCustomer={this.state.selectedCustomer}/>
                                </div>
                                <div id="orders" className="tab-pane fade">
                                    <CustomerOrderList allOrders={this.state.allOrders} selectedCustomer={this.state.selectedCustomer} />}
                                </div>
                            </div>
                        </div>}
                </div>
	},
    
    _editCustomer: function(customer) {
        this.setState({
            isEditingCustomer: true,
            editCustomer: customer
        })
    },
    
    _onFinishEdit: function() {
        this.setState({
            isEditingCustomer: false,
            editCustomer: null
        })
    },
    
    _onChange: function () {
        this.setState(getCustomerState());
    },
    
    _onTransactionsChange: function () {
        this.setState({
            allTransactions: CustomerTransactionStore.getAllTransactions()
        });
    },
    
    _onOrdersChange: function () {
        this.setState({
            allOrders: CustomerOrderStore.getAllOrders()
        })
    }
    
 });

module.exports = App;
