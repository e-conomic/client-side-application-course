var React = require("react");
var ReactDOM =require("react-dom");
var CustomerActions = require("../Actions/customer-actions");

var CustomerEditForm = React.createClass({
    getInitialState:  function () {
        return {
            customer: this.props.editCustomer
            /*
            customerNo: this.props.editCustomer.customerNo,
            name: this.props.editCustomer.Name,
            address1 : this.props.editCustomer.Address1,
            address2 : this.props.editCustomer.Address2,
            address3 : this.props.editCustomer.Address3,
            address4 : this.props.editCustomer.Address4,
            postCode: this.props.editCustomer.PostCode,
            postalArea: this.props.editCustomer.PostalArea,
            phone: this.props.editCustomer.Phone
            */
        };
    },
    
    render: function () {
        return  <div>
                    <h1>Customer details</h1>
                    <div>
                        <label>Customer no: </label>
                        <label>{this.state.customer.customerNo}</label>
                    </div>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={this.state.customer.name} />
                    </div>
                    <div>
                        <label>Address 1: </label>
                        <input type="text" value={this.state.customer.address1} />
                    </div>
                    
                    <div>
                        <button onClick={this._onHandleSave()}>Submit</button>
                        <button onClick={this.props.onFinishEdit()}>Cancel</button>
                    </div>
                </div>
    },
    
    _onHandleSave() {
        CustomerActions.updateCustomer(this.state.customer);
        //this.props.onFinishEdit();
    }
});

module.exports = CustomerEditForm;

/*
                        <button onClick={this._onHandleSave()}>Submit</button>


            name: c.Name,
            address1 : c.Address1,
            address2 : c.Address2,
            address3 : c.Address3,
            address4 : c.Address4,
            postCode: c.PostCode,
            postalArea: c.PostalArea,
            phone: c.Phone,
*/