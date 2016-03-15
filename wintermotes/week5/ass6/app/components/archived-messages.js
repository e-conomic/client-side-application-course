var React = require('react');
var MessageActions = require('../actions/message-actions');
var MessageStore = require('../stores/message-store');
var MessageField = require('../components/message-field');

var archiveStyle = {
	margin: '48px 0 0 0',
	color: 'gray'
}

var ArchivedMessages = React.createClass({
	getInitialState : function() {
		return {
			archivedMessages : MessageStore.getMessagesFromId(this.props.listId, true)
		}
	},
	componentDidMount : function() {
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		MessageStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({archivedMessages : MessageStore.getMessagesFromId(this.props.listId, true)});
	},
	render : function () {
		var messageNodes = this.state.archivedMessages.map(function(message) {
			return(
				<ArchivedMessage key={message.messageId} messageId={message.messageId} content={message.content}/>
			)
		});
		return(
			<div style={this.state.archiveStyle}>
				archived message: 
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