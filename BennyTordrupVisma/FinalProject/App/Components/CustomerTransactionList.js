"use strict";

var React = require("react");
var ReactDOM =require("react-dom");
var CustomerTransactionStore = require("../Stores/customer-transactions-store");

const {Table, Column, Cell} = require("fixed-data-table");

var TextCell = require("./SubComponents/TextCell");
var LinkCell = require("./SubComponents/LinkCell");
var DateCell = require("./SubComponents/DateCell");

class CustomerTransactionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: this.props.allCustomerTransactions,
        };
    }

    render() {
        return (
            <Table 
                rowHeight={30} 
                headerHeight={30} 
                rowsCount={this.state.dataList.length} 
                width={800} 
                height={500}
                {...this.props}
                >
                <Column 
                    header={<Cell>Cust. no.</Cell>}
                    cell={<TextCell data={this.state.dataList} field="customerNo" />}
                    fixed={true}
                    width={100}
                />
                <Column 
                    header={<Cell>Journal no.</Cell>}
                    cell={<TextCell data={this.state.dataList} field="voucherJournalNo" />}
                    width={100}
                />
                <Column 
                    header={<Cell>Audit no.</Cell>}
                    cell={<TextCell data={this.state.dataList} field="auditNo" />}
                    width={100}
                />
                <Column 
                    header={<Cell>Voucher date</Cell>}
                    cell={<DateCell data={this.state.dataList} field="voucherDate" />}
                    width={100}
                />
                <Column 
                    header={<Cell>Invoice no.</Cell>}
                    cell={<TextCell data={this.state.dataList} field="invoiceNo" />}
                    width={100}
                />
                <Column
                    header={<Cell>Text</Cell>}
                    cell={<TextCell data={this.state.datalist} field="text" />}
                    width={200}
                />
                <Column 
                    header={<Cell>Amount</Cell>}
                    cell={<TextCell data={this.state.dataList} field="amount" />}
                    width={100}
                />
            </Table>
        );
        /*
            voucherJournalNo: ct.VoucherJournalNo,
            auditNo: ct.AuditNo,
            customerNo: ct.CustomerNo,
            voucherDate : ct.VoucherDate,
            text: ct.Text,
            amount: ct.Amount,
            invoiceNo: ct.InvoiceNo,
            changedDateTime: ct.ChangedDateTime
        */
    }
  
}

module.exports = CustomerTransactionList;    