var React = require('react');
var MessageActions = require('../actions/message-actions');
var MessageStore = require('../stores/message-store');

function getArchivedMessages(id){
	return {
		archivedMessages : MessageStore.getMessagesFromId(id, true),
		listId : id, 
		archiveStyle :{margin: '48px 0 0 0',color: 'gray'}
	}
}

var ArchivedMessages = React.createClass({
	getInitialState : function() {
		var messages = getArchivedMessages(this.props.listId)
		return messages; 
	},
	componentDidMount : function() {
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		MessageStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState(getArchivedMessages(this.props.listId))
	},
	render : function () {
		var messgageNodes = [];
			var messageNodes = this.state.archivedMessages.map(function(message) {
				return(
					<ArchivedMessage key={message.messageId} messageId={message.messageId} content={message.content}/>
				)
			});
		return(
			<div style={this.state.archiveStyle}>
				Archived Messages for LIST: {this.state.listId}
				{messageNodes}
			</div>
		);		
	}
});

var ArchivedMessage = React.createClass({
	render : function() {
		return(
			<div style={{color : 'gray'}} key={this.props.messageId}>
				<MessageField action='unarchive' text='unarchive' messageId={this.props.messageId}/>
		        <p>id: {this.props.messageId} | text: {this.props.content}</p>
			</div>
		);
	}
});
module.exports = {ArchivedMessages, ArchivedMessage};