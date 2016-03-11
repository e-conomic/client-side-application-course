var React = require('react');

var DeleteMessageField = require('../components/fields').DeleteMessageField
var ArchiveMessageField = require('../components/fields').ArchiveMessageField
var UnarchiveMessageField = require('../components/fields').UnarchiveMessageField
var MoveMessageField = require('../components/fields').MoveMessageField

var MessageActions = require('../actions/message-actions');
var MessageStore = require('../stores/message-store')


function getMessagesById(id){
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
		return getMessagesById(this.props.listId)
	},
	componentDidMount : function() {
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		MessageStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState(getMessagesById(this.props.listId))
	},
	render : function() {
		var messageNodes = this.state.messages.map(function(message) {
			return(
				<Message key={message.messageId} messageId={message.messageId} content={message.content}/>
			)
		});
		return(
			<div>
				{messageNodes}
			</div>
		);		
	}
});


var Message = React.createClass({
	render: function() {
	    return (
		    <div style={{marginTop : '60px', border : '1px solid blue'}}>
		        <p>id: {this.props.messageId} | text: {this.props.content}</p>
				<DeleteMessageField messageId={this.props.messageId}/>
				<ArchiveMessageField messageId={this.props.messageId}/>
				<MoveMessageField messageId={this.props.messageId} />
		    </div>
	    );
	}
});

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
	handleMessageUnarchive : function(){
	},
	render : function() {
		return(
			<div style={{color : 'gray'}} key={this.props.messageId}>
				<UnarchiveMessageField messageId={this.props.messageId}/>
		        <p>id: {this.props.messageId} | text: {this.props.content}</p>
			</div>
		);
	}
});
module.exports = {Message, Messages, ArchivedMessages, ArchivedMessage};