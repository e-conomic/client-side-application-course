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

	onDeleteMessage: function(msgId) {
		MessageActions.deleteMessage(msgId);
	},

	onArchiveMessage: function(msgId) {
		MessageActions.archiveMessage(msgId);
	},

	render: function() {
		var createMessage = function(msg) {
			return (
				<tr key={msg.id}>
					<td><Message text={msg.message} /></td>
					<td><GeneratedListDropDown myListKey={this.props.myListKey}	msgId={msg.id} /></td>
					<td><input type="button" value="X" onClick={this.onDeleteMessage.bind(this, msg.id)} /></td>
					<td><input type="button" value="Archive" onClick={this.onArchiveMessage.bind(this, msg.id)} /></td>
				</tr>
			);
		}
		return <table><tbody>{this.state.messages.map(createMessage, this)}</tbody></table>;
	}
});

module.exports = MessageList;