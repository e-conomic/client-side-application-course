"use strict";

var React = require("react");
var ReactDOM =require("react-dom");

const {Table, Column, Cell} = require("fixed-data-table");

class LinkCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props;
    return (
      <Cell {...props}>
        <a href={data[rowIndex][field]}>{data[rowIndex][field]}</a>
      </Cell>
    );
  }
}

module.exports = LinkCell;