"use strict";

var React = require("react");
var ReactDOM =require("react-dom");
var CustomerStore = require("../Stores/customer-store");
var CustomerActions = require("../Actions/customer-actions");

const {Table, Column, Cell} = require("fixed-data-table");

var TextCell = require("./SubComponents/TextCell");
var ButtonCell = require("./SubComponents/ButtonCell");

class CustomerList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var dataList = this.props.allCustomers;
        
        return (
            <div>
                <div>
                    <h1>Customers</h1>
                    <Table 
                        rowHeight={35} 
                        headerHeight={35} 
                        rowsCount={dataList.length} 
                        width={1675} 
                        height={300}
                        rowClassNameGetter={this._rowClassNameGetter.bind(this)}
                        onRowClick={this._onRowClick}
                        {...this.props}
                        >
                        <Column 
                            header={<Cell>Cust. no</Cell>}
                            cell={<TextCell data={dataList} field="customerNo" />}
                            fixed={true}
                            width={100}
                        />
                        <Column 
                            header={<Cell>Name</Cell>}
                            cell={<TextCell data={dataList} field="name" />}
                            fixed={true}
                            width={200}
                        />
                        <Column 
                            header={<Cell>Address 1</Cell>}
                            cell={<TextCell data={dataList} field="address1" />}
                            width={200}
                        />
                        <Column 
                            header={<Cell>Address 2</Cell>}
                            cell={<TextCell data={dataList} field="address2" />}
                            width={200}
                        />
                        <Column 
                            header={<Cell>Address 3</Cell>}
                            cell={<TextCell data={dataList} field="address3" />}
                            width={200}
                        />
                        <Column 
                            header={<Cell>Address 4</Cell>}
                            cell={<TextCell data={dataList} field="address4" />}
                            width={200}
                        />
                        <Column 
                            header={<Cell>Post code</Cell>}
                            cell={<TextCell data={dataList} field="postCode" />}
                            width={100}
                        />
                        <Column 
                            header={<Cell>Postal area</Cell>}
                            cell={<TextCell data={dataList} field="postalArea" />}
                            width={200}
                        />
                        <Column 
                            header={<Cell>Phone</Cell>}
                            cell={<TextCell data={dataList} field="phone" />}
                            width={100}
                        />
                        <Column
                            cell={<ButtonCell data={dataList} field="customerNo" label="Edit" onClick={this.props.onEditCustomer} />}
                            width={80}
                        />
                        <Column
                            cell={<ButtonCell data={dataList} field="customerNo" label="Delete" onClick={this.props.onDeleteCustomer} />}
                            width={95}
                        />
                    </Table>
                    <div style={{margin: '4px'}} />
                    <div>
                        <button onClick={this.props.onAddCustomer} >New customer</button>
                    </div>
                </div>
            </div>
        );
    }
      
    _onRowClick(event) {
        var items = event.currentTarget.innerText.split('\n');
        CustomerActions.selectCustomer(items[0]);        
    }
  
    _rowClassNameGetter(index) {
        var customer = this.props.allCustomers[index];
        if (this.props.selectedCustomer == customer.customerNo)
            return "selected";
    }
}

module.exports = CustomerList;