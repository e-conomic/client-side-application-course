"use strict";

var React = require("react");
var ReactDOM =require("react-dom");
var CustomerOrderStore = require("../Stores/customer-orders-store");

const {Table, Column, Cell} = require("fixed-data-table");

var TextCell = require("./SubComponents/TextCell");
var DateCell = require("./SubComponents/DateCell");
var AmountCell = require("./SubComponents/AmountCell");

class CustomerOrderList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var dataList = this.props.allOrders.filter(t => t.customerNo == this.props.selectedCustomer);

        return (
            <Table 
                rowHeight={30} 
                headerHeight={30} 
                rowsCount={dataList.length} 
                width={1115} 
                height={500}
                {...this.props}
                >
                <Column 
                    header={<Cell>Cust. no.</Cell>}
                    cell={<TextCell data={dataList} field="customerNo" />}
                    fixed={true}
                    width={100}
                />
                <Column 
                    header={<Cell>Order no.</Cell>}
                    cell={<TextCell data={dataList} field="orderNo" />}
                    width={100}
                />
                <Column 
                    header={<Cell>Order date</Cell>}
                    cell={<DateCell data={dataList} field="orderDate" />}
                    width={125}
                />
                <Column 
                    header={<Cell>Req. delivery date</Cell>}
                    cell={<DateCell data={dataList} field="requiredDeliveryDate" />}
                    width={125}
                />
                <Column 
                    align='right'
                    header={<Cell>Inv. amount so far</Cell>}
                    cell={<AmountCell data={dataList} field="invoiceAmountSoFar" />}
                    width={200}
                />
                <Column 
                    align='right'
                    header={<Cell>Inv. amount in future</Cell>}
                    cell={<AmountCell data={dataList} field="invoiceAmountInFuture" />}
                    width={200}
                />
                <Column 
                    align='right'
                    header={<Cell>Inv. amount total</Cell>}
                    cell={<AmountCell data={dataList} field="invoiceAmountTotal" />}
                    width={200}
                />
            </Table>
        );
        /*
            orderNo: ct.OrderNo,
            orderDate: ct.OrderDate,
            customerNo: ct.CustomerNo,
            requiredDeliveryDate : ct.RequiredDeliveryDate,
            invoiceAmountSoFar: ct.InvoiceAmountSoFar,
            invoiceAmountInFuture: ct.InvoiceAmountInFuture,
            invoiceAmountTotal: ct.invoiceAmountTotal,
            changedDateTime: ct.ChangedDateTime
        */
    }
  
}

module.exports = CustomerOrderList;    
