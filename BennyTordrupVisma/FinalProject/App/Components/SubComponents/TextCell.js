"use strict";

var React = require("react");
var ReactDOM =require("react-dom");

const {Table, Column, Cell} = require("fixed-data-table");

class TextCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        {data[rowIndex][field]}
      </Cell>
    );
  }
}

module.exports = TextCell;