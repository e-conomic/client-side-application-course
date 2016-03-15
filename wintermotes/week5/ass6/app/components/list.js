var React = require('react');
var Messages = require('./message').Messages
var Message = require('./message').Message 
var ArchivedMessages = require('./message').ArchivedMessages
var ArchivedMessage = require('./message').ArchivedMessage
var ListStore = require('../stores/list-store')
var ListActions = require('../actions/list-actions');

var MessageStore = require('../stores/message-store')
var MessageActions = require('../actions/message-actions');

var List = React.createClass({		
	render: function() {
		var listStyle = {
			border: '1px solid black',
		}
		return(
			<div style={listStyle}>
				<p><b>ListID: {this.props.data.listId} | ListName: {this.props.data.listName} |</b></p>
				<Messages listId={this.props.data.listId}/>
				<ArchivedMessages listId={this.props.data.listId}/>
			</div>
		);
	}
});

module.exports = List;