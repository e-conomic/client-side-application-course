var React = require('react');

var MessageActions = require('../actions/message-actions');

var GeneratedListDropDown = require('./generated-list-dropdown');

var Message = React.createClass({

	onDeleteMessage: function(msgId) {
		MessageActions.deleteMessage(msgId);
	},

	onArchiveMessage: function(msgId) {
		MessageActions.archiveMessage(msgId);
	},

	onExtractMessage: function(msgId) {
		MessageActions.extractMessage(msgId);
	},

	render: function() {
		if (this.props.message.isArchived) {
			return (
				<tr style={{color: this.props.message.color}}>
					<td>{this.props.message.message}</td>
					<td><input type="button" value="Extract" onClick={this.onExtractMessage.bind(this, this.props.message.id)} /></td>
				</tr>
			);
		} else {
			return (
				<tr style={{color: this.props.message.color}}>
					<td>{this.props.message.message}</td>
					<td><GeneratedListDropDown myListKey={this.props.message.listKey} msgId={this.props.message.id} /></td>
					<td>
						<input
							type="button"
							value="X"
							onClick={this.onDeleteMessage.bind(this, this.props.message.id)}
						/>
					</td>
					<td>
						<input
							type="button"
							value="Archive"
							onClick={this.onArchiveMessage.bind(this, this.props.message.id)}
						/>
					</td>
				</tr>
			);
		}
	}
});

module.exports = Message;