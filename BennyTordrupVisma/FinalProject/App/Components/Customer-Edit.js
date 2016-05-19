var React = require("react");
var ReactDOM =require("react-dom");
var CustomerActions = require("../Actions/customer-actions");

var CustomerEditForm = React.createClass({
    getInitialState:  function () {
        return {
            customer: this.props.editCustomer,
            originalCustomer: this.props.editCustomer
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
                    <table>
                        <tr>
                            <td><label>Customer no: </label></td><td><label>{this.props.isNewCustomer ? 'Not assigned' : this.state.customer.customerNo}</label></td>
                        </tr>
                        <tr>
                            <td><label>Name: </label></td><td><input type="text" name="name" onChange={this._onValueChange} value={this.state.customer.name} /></td>
                        </tr>
                        <tr>
                            <td><label>Address 1: </label></td><td><input type="text" name="address1" onChange={this._onValueChange} value={this.state.customer.address1} /></td>
                        </tr>
                        <tr>
                            <td><label>Address 2: </label></td><td><input type="text" name="address2" onChange={this._onValueChange} value={this.state.customer.address2} /></td>
                        </tr>
                        <tr>
                            <td><label>Address 3: </label></td><td><input type="text" name="address3" onChange={this._onValueChange} value={this.state.customer.address3} /></td>
                        </tr>
                        <tr>
                            <td><label>Address 4: </label></td><td><input type="text" name="address4" onChange={this._onValueChange} value={this.state.customer.address4} /></td>
                        </tr>
                        <tr>
                            <td><label>Post code: </label></td><td><input type="text" name="postcode" onChange={this._onValueChange} value={this.state.customer.postCode} /></td>
                        </tr>
                        <tr>
                            <td><label>Postal area: </label></td><td><input type="text" name="postalarea" onChange={this._onValueChange} value={this.state.customer.postalArea} /></td>
                        </tr>
                        <tr>
                            <td><label>Phone: </label></td><td><input type="text" name="phone" onChange={this._onValueChange} value={this.state.customer.phone} /></td>
                        </tr>
                    </table>
                    
                    <div>
                        <button onClick={this._onHandleSave}>Submit</button>
                        <button onClick={this._onHandleCancel}>Cancel</button>
                    </div>
                </div>
    },
    
    _onValueChange(event) {
        var customerToChange = this.state.customer;
        switch (event.target.name) {
            case "name":
                customerToChange.name = event.target.value;
                break;
            
            case "address1":
                customerToChange.address1 = event.target.value;
                break;
            
            case "address2":
                customerToChange.address2 = event.target.value;
                break;
            
            case "address3":
                customerToChange.address3 = event.target.value;
                break;
            
            case "address4":
                customerToChange.address4 = event.target.value;
                break;
            
            case "postcode":
                customerToChange.postCode = event.target.value;
                break;
            
            case "postalarea":
                customerToChange.postalArea = event.target.value;
                break;
            
            case "phone":
                customerToChange.phone = event.target.value;
                break;
                
            default:
                return;
        }
        this.setState({
            customer: customerToChange
        });
    },
    
    _onHandleSave() {
        if (this.props.isNewCustomer) {
            CustomerActions.addCustomer(this.state.customer)
        } else {
            CustomerActions.updateCustomer(this.state.customer);
        }
        this.props.onFinishEdit();
    },
    
    _onHandleCancel() {
        var origCustomer = this.state.originalCustomer;
        this.setState({
            customer: origCustomer
        });
        this.props.onFinishEdit();
    }
    
});

module.exports = CustomerEditForm;
