var React = require('react');

var ListCheckboxes = React.createClass({
	render : function(){
		var listNodes = this.props.lists.map(function(list){
			return(
				<label key={list.listId}>ID: {list.listId} | Name: {list.listName}<input type="checkbox" value={list.listId} onChange={this.props.onCheckboxChange}/></label>
			)
		}.bind(this));
		return (
			<div>
			 	{listNodes}
			</div>
		);
	}
});

module.exports = ListCheckboxes;