var React = require('react');
var ListStore = require('../stores/list-store');

var GeneratedListDropDown = React.createClass({
	propTypes: {
		generatedLists: React.PropTypes.array,
	},

	getInitialState: function() {
		return {
			value: ''
		};
	},

	handleMessageMove: function(msg, targetListKey) {
		this.props.onMoveMessage(msg, targetListKey);
	},

	onChange: function(e) {
		this.handleMessageMove(this.props.msg, e.target.value);
	},

	render: function() {
		var createDropdownList = function(list) {
			if (this.props.myListKey == list.id) { return; }
			return <option key={list.id} value={list.id}>{list.name}</option>
		};
		return (
			<select onChange={this.onChange}>
				<option key="null" value="-" />
				{ListStore.getAll().map(createDropdownList, this)}
			</select>
		);
	}
});

module.exports = GeneratedListDropDown;