var React = require("react");
var ReactDOM =require("react-dom");
var CustomerList = require("./CustomerList");
var CustomerStore = require("../Stores/customer-store");

function getAppState(){
    return {
        allCustomers: CustomerStore.getAllCustomers(),
    }    
}

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    
    componentDidMount: function() {
        CustomerStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
        CustomerStore.removeChangeListener(this._onChange);
    },
    
	render: function() {
        return  <div>
                    <h1>Customers</h1>
                    <CustomerList allCustomers={this.state.allCustomers} />
                </div>
        // var jsonCustomers = JSON.stringify(this.state.allCustomers);
       
        // return  <div>
        //             <h1>Customers</h1>
        //             <CustomerList allCustomers={jsonCustomers} />
        //         </div>
	},
    
    _onChange: function() {
         this.setState(getAppState());
    },
    
 });

module.exports = App;