var React = require('react');

var MessageActions = require('../actions/message-actions');
var MessageStore = require('../stores/message-store')

function getMessagesToList(id){
	return {
			messages : MessageStore.getMessagesFromId(id)
	}
}

function getArchivedMessagesToList(id){
	return {
			messages : MessageStore.getArchivedMessagesFromId(id)
	}
}

var Messages = React.createClass({
	getInitialState : function() {
		var messages = getMessagesToList(this.props.listId)
		return messages; 
	},
	getMessageNodes : function() {
		messages = this.state.messages
	},
	_onChange : function(){
		this.setState(getMessagesState())
	},
	render : function() {
		var listId = this.props.listId
		console.log("ListId from props: " + listId)
		var messageNodes = this.state.messages.map(function(message) {
			return(
				<Message key={message.messageId} messageId={message.messageId} messageContent={message.messageContent}/>
			)
		});
		return(
			<div>
				Messages for list: {listId}
				{messageNodes}
			</div>
		);		
	}
});

var Message = React.createClass({
	render: function() {
	    return (
	    <div>
	        <p>id: {this.props.messageId} | text: {this.props.messageContent}</p>
	    </div>
	    );
	}
});

var ArchivedMessages = React.createClass({
	getInitialState : function() {
		var messages = getArchivedMessagesToList(this.props.listId)
		return messages; 
	},
	render : function () {
		var archiveStyle = {
			margin: '48px 0 0 0',
			color: 'gray'
		}
		return (
			<div style={archiveStyle}>
				<p><b>Archived Messages: </b></p>
			</div>
		);
	}
});

var ArchivedMessage = React.createClass({
	handleMessageUnarchive : function(){
		//this.props.onMessageUnarchive(this.props.listId, this.props.messageId)
	},
	render : function() {
		var boolToString = this.props.archived.toString() 
		return(
			<span>
				<input style={{float : 'right'}} type="submit" value="Unarchive Message" onClick={this.handleMessageUnarchive} />
				<p> Archived Message goes here: </p>
			</span>
		);
	}
});





module.exports = {Message, Messages, ArchivedMessages, ArchivedMessage};