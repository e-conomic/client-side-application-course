var React = require("react");
var ReactDOM =require("react-dom");
var CustomerList = require("./CustomerList");
var CustomerTransactionList = require("./CustomerTransactionList");
var CustomerStore = require("../Stores/customer-store");
var CustomerTransactionStore = require("../Stores/customer-transactions-store");

function getCustomerState(){
    return {
        allCustomers: CustomerStore.getAllCustomers(),
        selectedCustomer: CustomerStore.getSelectedCustomer(),
    }    
}

// const TextCell = ({rowIndex, data, col, ...props}) => (
//   <Cell {...props}>
//     {data.getObjectAt(rowIndex)[col]}
//   </Cell>
// );

var App = React.createClass({
    getInitialState: function() {
        return {
                allCustomers: CustomerStore.getAllCustomers(),
                selectedCustomer: CustomerStore.getSelectedCustomer(),
                transactionsByCustomer: []
            };
    },
    
    componentDidMount: function() {
        CustomerStore.addChangeListener(this._onChange);
        CustomerTransactionStore.addChangeListener(this._onTransactionsChange);
    },
    
    componentWillUnmount: function() {
        CustomerStore.removeChangeListener(this._onChange);
        CustomerTransactionStore.removeChangeListener(this._onTransactionsChange);
    },
    
	render: function() {
        return  <div>
                    <h1>Customers</h1>
                    <CustomerList allCustomers={this.state.allCustomers} selectedCustomer={this.state.selectedCustomer} />
                    <div className="spacer"></div>
                    <CustomerTransactionList allCustomerTransactions={this.state.transactionsByCustomer}/>
                </div>
	},
    
    _onChange: function() {
        this.setState(getCustomerState());
    },
    
    _onTransactionsChange: function() {
        if (this.state.selectedCustomer > 0) {
            var transByCustomers = CustomerTransactionStore.getTransactionsByCustomer(this.state.selectedCustomer);
            this.setState({
                transactionsByCustomer: CustomerTransactionStore.getTransactionsByCustomer(this.state.selectedCustomer)
            });
        }
    }
    
 });

module.exports = App;

/*
                    // <ul className="nav nav-tabs">
                    //     <li className="active"><a data-toggle="tab" href="#transactions">Transactions</a></li>
                    //     <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
                    //     <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
                    //     <li><a data-toggle="tab" href="#menu3">Menu 3</a></li>
                    // </ul>

                    // <div className="tab-content">
                    //     <div id="transactions" className="tab-pane fade in active">
                    //         <h3>Transactions</h3>
                    //         <CustomerTransactionList allCustomerTransactions={this.state.transactionsByCustomer}/>
                    //     </div>
                    //     <div id="menu1" className="tab-pane fade">
                    //         <h3>Menu 1</h3>
                    //         <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    //     </div>
                    //     <div id="menu2" className="tab-pane fade">
                    //         <h3>Menu 2</h3>
                    //         <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                    //     </div>
                    //     <div id="menu3" className="tab-pane fade">
                    //         <h3>Menu 3</h3>
                    //         <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    //     </div>
                    // </div>
*/