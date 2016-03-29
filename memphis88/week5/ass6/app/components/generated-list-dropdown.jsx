var React = require('react');
var ListStore = require('../stores/list-store');
var MessageActions = require('../actions/message-actions');

var GeneratedListDropDown = React.createClass({
	propTypes: {
		generatedLists: React.PropTypes.array,
	},

	getInitialState: function() {
		return {
			lists: ListStore.getAll(),
			value: ''
		};
	},

	componentDidMount: function() {
		ListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ListStore.removeChangeListener(this._onChange);
	},

	onChange: function(e) {
		if (e.target.value == 'null') return;
		var color = ListStore.get(e.target.value).color;
		MessageActions.moveMessage(this.props.msgId, e.target.value, color);
	},

	_onChange: function() {
		this.setState({
			lists: ListStore.getAll()
		});
	},

	render: function() {
		var createDropdownList = function(list) {
			if (this.props.myListKey == list.id) return;
			return <option key={list.id} value={list.id}>{list.name}</option>
		};
		return (
			<select onChange={this.onChange}>
				<option key="null" value="null">Move to</option>
				{this.state.lists.map(createDropdownList, this)}
			</select>
		);
	}
});

module.exports = GeneratedListDropDown;