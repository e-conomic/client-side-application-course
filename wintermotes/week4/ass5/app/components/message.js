var React = require('react');

var MessageActions = require('../actions/message-actions');
var MessageStore = require('../stores/message-store')

//Question 1: I am sure there is a shorthand for checking whether we have any messages or not, so we only call map() if we have elements. Any suggestions?

function getMessages(id){
	return {
		messages : MessageStore.getMessagesFromId(id, false),
		listId : id
	}
}

function getArchivedMessages(id){
	return {
		archivedMessages : MessageStore.getMessagesFromId(id, true),
		listId : id, 
		archiveStyle :{margin: '48px 0 0 0',color: 'gray'}
	}
}

var Messages = React.createClass({
	getInitialState : function() {
		var messages = getMessages(this.props.listId)
		return messages; 
	},
	_onChange : function(){
		this.setState(getMessages(this.props.id))
	},
	render : function() {
		var messageNodes = null
		if(this.state.messages){
			messageNodes = this.state.messages.map(function(message) {
				return(
					<Message key={message.messageId} messageId={message.messageId} messageContent={message.messageContent}/>
				)
			});
		} 
		return(
			<div>
				Messages for list: {this.state.listId}
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
		var messages = getArchivedMessages(this.props.listId)
		return messages; 
	},
	render : function () {
		var messgageNodes = [];
		if(this.state.archivedMessages){ // If any archived messages
			var messageNodes = this.state.archivedMessages.map(function(message) {
				return(
					<ArchivedMessage key={message.messageId} messageId={message.messageId} messageContent={message.messageContent}/>
				)
			});
		} 
		return(
			<div style={this.state.archiveStyle}>
				Archived Messages for list: {this.state.listId}
				{messageNodes}
			</div>
		);		
	}
});

var ArchivedMessage = React.createClass({
	handleMessageUnarchive : function(){
	},
	render : function() {
		return(
			<span>
				<input style={{float : 'right'}} type="submit" value="Unarchive Message" onClick={this.handleMessageUnarchive} />
		        <p>id: {this.props.messageId} | text: {this.props.messageContent}</p>
			</span>
		);
	}
});


module.exports = {Message, Messages, ArchivedMessages, ArchivedMessage};