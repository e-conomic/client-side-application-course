var React = require('react');

var Messages = React.createClass({
	render: function() {
		var messageNodes = this.props.messages.map(function(message){
			return (
				<Message listId={message.listId} messageId={message.messageId} messageText={message.messageText} archived={message.archived} />	
			);
		});
		return(
			<div>
				{messageNodes}
			</div>
		);
		
	}
});

var ArchivedMessage = React.createClass({
	handleMessageUnarchive : function(){
		this.props.onMessageUnarchive(this.props.listId, this.props.messageId)
	},
	render : function() {
		var boolToString = this.props.archived.toString() 
		return(
			<span>
				<input style={{float : 'right'}} type="submit" value="Unarchive Message" onClick={this.handleMessageUnarchive} />
				<p>messageId: {this.props.messageId} | Text: {this.props.messageText} | Archived: {boolToString} | ListId: {this.props.listId}</p>
			</span>
		);
	}
});

var ArchivedMessages = React.createClass({
	render : function () {
		// Question 4: how to achieve "border-top" property without causing a syntax? 
		var archiveStyle = {
			margin: '48px 0 0 0',
			color: 'gray'
		}
		var unarchiveFunction = this.props.onMessageUnarchive
		var messageNodes = this.props.archivedMessages.map(function(message){
			return (
				<span>

					<ArchivedMessage listId={message.listId} messageId={message.messageId} messageText={message.messageText} archived={message.archived} 
					 onMessageUnarchive={unarchiveFunction}/>		
				</span>
			);
		});
		return (
			<div style={archiveStyle}>
				<p><b>Archived Messages: </b></p>
				{messageNodes}
			</div>
		);
	}
});

var Message = React.createClass({
	render: function() {
		var boolToString = this.props.archived.toString() 
	    return (
	        <p>messageId: {this.props.messageId} | Text: {this.props.messageText} | Archived: {boolToString} | ListId: {this.props.listId}</p>
	    );
	}
});

module.exports = {Message, Messages, ArchivedMessages, ArchivedMessage};