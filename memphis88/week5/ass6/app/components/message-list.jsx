var React = require('react');

var Message = require('./message');
var GeneratedListDropDown = require('./generated-list-dropdown');
var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions');

var MessageList = React.createClass({

	getInitialState: function() {
		return {
			messages: MessageStore.getAllForList(this.props.myListKey)
		};
	},

	componentDidMount: function() {
		MessageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MessageStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			messages: MessageStore.getAllForList(this.props.myListKey)
		});
	},

	render: function() {
		var createMessage = function(msg) {
			if (msg.isArchived) return;
			return <Message key={msg.id} message={msg} />;
		};
		var createArchivedMessage = function(msg) {
			if (!msg.isArchived) return;
			return <Message key={msg.id} message={msg} />;
		};
		return (
			<div>
				<table><tbody>{this.state.messages.map(createMessage, this)}</tbody></table>
				<table>
					<thead><tr><td colSpan="2">{"---Archive---"}</td></tr></thead>
					<tbody>
						{this.state.messages.map(createArchivedMessage, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = MessageList;