var React = require('react');

var MessageList = require('./message-list');
var MessageActions = require('../actions/message-actions');

var GeneratedList = React.createClass({
	propTypes: {
		messageList: React.PropTypes.array,
	},

	onPressingEnter: function(e) {
		if (e.keyCode == 13) { this.submitNewMessage() };
	},

	submitNewMessage: function() {
		MessageActions.createMessage(this.props.data.id, this.refs.text.value);
		this.refs.text.value = '';
	},

	render: function() {
		return (
			<div className="generatedLists">
				<h3>{this.props.data.name}</h3>
				<h5>Add new message</h5>
				<input type="text" ref="text" onKeyDown={this.onPressingEnter} />
				<input type="button" value="add" onClick={this.submitNewMessage} />
				<MessageList myListKey={this.props.data.id} isSorted="false"/>
			</div>
		);
	}
});

module.exports = GeneratedList;