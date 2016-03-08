var React = require('react');

var Message = require('./message');
var GeneratedListDropDown = require('./generated-list-dropdown');
var MessageStore = require('../stores/message-store');
var MessageListActions = require('../actions/message-actions');

var MessageList = React.createClass({

	getInitialState: function() {
		return {
			messageList: MessageStore.getAll()
		};
	},

	componentDidMount: function() {
		MessageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		MessageStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({messageList: MessageStore.getAll()});
	},

	onDeleteMessage: function(msgId) {
		MessageListActions.deleteMessage(msgId);
	},

	onArchiveMessage: function(msgId) {
		MessageListActions.archiveMessage(msgId);
	},

	render: function() {
		var messages = [];
		var myListKey = this.props.myListKey;
		messages = this.state.messageList.filter(function(msg) { return msg.listKey == myListKey });
		var createMessage = function(msg) {
			return (
				<tr key={msg.id}>
					<td><Message text={msg.message} /></td>
					<td><GeneratedListDropDown 
						myListKey={this.props.myListKey} 
						msgId={msg.id} /></td>
					<td><input type="button" value="X" onClick={this.onDeleteMessage.bind(this, msg.id)} /></td>
					<td><input type="button" value="Archive" onClick={this.onArchiveMessage.bind(this, msg.id)} /></td>
				</tr>
			);
		}
		return <table><tbody>{messages.map(createMessage, this)}</tbody></table>;
	}
});

module.exports = MessageList;