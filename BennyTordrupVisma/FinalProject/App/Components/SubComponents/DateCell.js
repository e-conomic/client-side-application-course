"use strict";

var React = require("react");
var ReactDOM =require("react-dom");

const {Table, Column, Cell} = require("fixed-data-table");

class DateCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {(new Date(data[rowIndex][field])).toLocaleDateString('da-DK')}
      </Cell>
    );
  }
}

module.exports = DateCell;