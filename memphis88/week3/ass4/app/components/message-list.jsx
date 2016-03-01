var React = require('react');

var Message = require('./message');
var GeneratedListDropDown = require('./generated-list-dropdown');

var MessageList = React.createClass({

	handleMessageDelete: function(key) {
		this.props.onDeleteMessage(key);
	},

	handleMessageArchive: function(key) {
		this.props.onArchiveMessage(key);
	},

	onMoveMessage: function(msg, targetListKey) {
		this.props.onMoveMessage(msg, targetListKey);
	},

	render: function() {
		var createMessage = function(msg) {
			return (
				<tr key={msg.index}>
					<td><Message text={msg.text} /></td>
					<td><GeneratedListDropDown 
						generatedLists={this.props.generatedLists} 
						myListKey={this.props.myListKey} 
						msg={msg} 
						onMoveMessage={this.onMoveMessage} 
					/></td>
					<td><input type="button" value="X" onClick={this.handleMessageDelete.bind(this, msg.index)} /></td>
					<td><input type="button" value="Archive" onClick={this.handleMessageArchive.bind(this, msg.index)} /></td>
				</tr>
			);
		}
		return <table><tbody>{this.props.messageList.map(createMessage, this)}</tbody></table>;
	}
});

module.exports = MessageList;