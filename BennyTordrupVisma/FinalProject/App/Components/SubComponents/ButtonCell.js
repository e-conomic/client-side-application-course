"use strict";

var React = require("react");
var ReactDOM =require("react-dom");

const {Table, Column, Cell} = require("fixed-data-table");

class ButtonCell extends React.Component {
  render() {
    const {rowIndex, field, data, label, onClick, ...props} = this.props;
    return (
      <Cell {...props}>
        <button style={{width:'80%', height:'25px', margin:'0px'}} onClick={this.props.onClick.bind(null, data[rowIndex])}>{this.props.label}</button> 
      </Cell>
    );
  }
}

module.exports = ButtonCell;