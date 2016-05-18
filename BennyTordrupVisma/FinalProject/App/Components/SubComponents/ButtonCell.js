"use strict";

var React = require("react");
var ReactDOM =require("react-dom");

const {Table, Column, Cell} = require("fixed-data-table");

class ButtonCell extends React.Component {
  render() {
    const {rowIndex, field, data, onClick, ...props} = this.props;
    var customer = data[rowIndex];
    var custNo = data[rowIndex][field];
    return (
      <Cell {...props}>
        <button style={{width:'80%', height:'25px', margin:'0px'}} onClick={this.props.onClick.bind(null, customer, rowIndex)}>Edit</button> 
      </Cell>
    );
  }
}

module.exports = ButtonCell;