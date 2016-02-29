var React = require('react');

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
			if (this.props.myListKey == list.index) { return; }
			return <option key={list.index} value={list.index}>{list.name}</option>
		};
		return (
			<select onChange={this.onChange}>
				<option key="null" value="-" />
				{this.props.generatedLists.map(createDropdownList, this)}
			</select>
		);
	}
});

module.exports = GeneratedListDropDown;