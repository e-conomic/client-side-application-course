"use strict";

var React = require("react");
var ReactDOM =require("react-dom");

const {Table, Column, Cell} = require("fixed-data-table");

class AmountCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {(new Number(data[rowIndex][field])).toLocaleString('da-DK', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </Cell>
    );
  }
}

module.exports = AmountCell;