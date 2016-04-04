var React = require('react');

var ListStore = require('../stores/list-store');
var MessageStore = require('../stores/message-store');

var Message = require('./message');
var MessageList = require('./message-list');

var FilteredMessageList = React.createClass({
	getInitialState: function() {
		return {
			allLists: ListStore.getAll(),
			allSortedMessages: MessageStore.getAllSorted(),
			filteredLists: []
		}
	},

	componentDidMount: function() {
		ListStore.addChangeListener(this._onChange);
		MessageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ListStore.removeChangeListener(this._onChange);
		MessageStore.removeChangeListener(this._onChange);
	},

	onChange: function() {
		var filteredLists = [];
		var elements = this.refs.filterForm.elements;
		for (var input in elements) {
			if (elements[input].checked) {
				filteredLists.push(parseInt(elements[input].value));
			}
		}
		this.setState({ filteredLists: filteredLists });
	},

	_onChange: function() {
		this.setState({
			allLists: ListStore.getAll(),
			allSortedMessages: MessageStore.getAllSorted(),
		});
	},

	render: function() {
		var renderAllListInputs = function(list) {
			var randomColor = { color: list.color };
			return (
				<li key={list.id} style={randomColor}>
					<input type="checkbox" value={list.id} />
					<span>{list.name}</span>
				</li>
			);
		};
		var renderMessages = function(message) {
			if (this.state.filteredLists.includes(message.listKey)) {
				return <Message key={message.id} message={message} />;
			}
		};
		var containerStyle = {
			borderStyle: 'solid',
			borderWidth: 3,
			borderColor: 'red'
		};
		return (
			<div style={containerStyle}>
				<form onChange={this.onChange} ref="filterForm">
					<ul>{this.state.allLists.map(renderAllListInputs)}</ul>
				</form>
				<div>
					<table><tbody>{this.state.allSortedMessages.map(renderMessages, this)}</tbody></table>
				</div>
			</div>
		);
	}

});

module.exports = FilteredMessageList;
