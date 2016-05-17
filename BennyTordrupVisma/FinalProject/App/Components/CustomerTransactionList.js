"use strict";

var React = require("react");
var ReactDOM =require("react-dom");
var CustomerTransactionStore = require("../Stores/customer-transactions-store");

const {Table, Column, Cell} = require("fixed-data-table");

var TextCell = require("./SubComponents/TextCell");
var DateCell = require("./SubComponents/DateCell");
var AmountCell = require("./SubComponents/AmountCell");

class CustomerTransactionList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var dataList = this.props.allTransactions.filter(t => t.customerNo == this.props.selectedCustomer);

        return (
            <Table 
                rowHeight={30} 
                headerHeight={30} 
                rowsCount={dataList.length} 
                width={815} 
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
                    header={<Cell>Journal no.</Cell>}
                    cell={<TextCell data={dataList} field="voucherJournalNo" />}
                    width={100}
                />
                <Column 
                    header={<Cell>Audit no.</Cell>}
                    cell={<TextCell data={dataList} field="auditNo" />}
                    width={75}
                />
                <Column 
                    header={<Cell>Voucher date</Cell>}
                    cell={<DateCell data={dataList} field="voucherDate" />}
                    width={125}
                />
                <Column 
                    header={<Cell>Invoice no.</Cell>}
                    cell={<TextCell data={dataList} field="invoiceNo" />}
                    width={100}
                />
                <Column
                    header={<Cell>Text</Cell>}
                    cell={<TextCell data={dataList} field="text" />}
                    width={200}
                />
                <Column 
                    align='right'
                    header={<Cell>Amount</Cell>}
                    cell={<AmountCell data={dataList} field="amount" />}
                    width={100}
                />
            </Table>
        );
    }
  
}

module.exports = CustomerTransactionList;    
