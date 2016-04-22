"use strict";

var React = require("react");
var ReactDOM =require("react-dom");
var CustomerStore = require("../Stores/customer-store");

const {Table, Column, Cell} = require("fixed-data-table");

var TextCell = require("./SubComponents/TextCell");

class CustomerList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: this.props.allCustomers,
        };
    }
  
    render() {
        //var {dataList} = this.state;
        
        return (
            <Table 
                rowHeight={30} 
                headerHeight={30} 
                rowsCount={this.state.dataList.length} 
                width={750} 
                height={500}
                {...this.props}
                >
                <Column 
                    header={<Cell>Cust. no</Cell>}
                    cell={<TextCell data={this.state.dataList} field="customerNo" />}
                    fixed={true}
                    width={100}
                />
                <Column 
                    header={<Cell>Name</Cell>}
                    cell={<TextCell data={this.state.dataList} field="name" />}
                    width={150}
                />
                <Column 
                    header={<Cell>Address 1</Cell>}
                    cell={<TextCell data={this.state.dataList} field="address1" />}
                    width={200}
                />
                <Column 
                    header={<Cell>Post code</Cell>}
                    cell={<TextCell data={this.state.dataList} field="postCode" />}
                    width={100}
                />
                <Column 
                    header={<Cell>Postal area</Cell>}
                    cell={<TextCell data={this.state.dataList} field="postalArea" />}
                    width={200}
                />
            </Table>
        );
    }
  
}

module.exports = CustomerList;