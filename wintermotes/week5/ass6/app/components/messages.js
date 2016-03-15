var React = require('react');
var MessageActions = require('../actions/message-actions');
var MessageStore = require('../stores/message-store');

var MessageField = require('../components/message-field');
var MoveMessageField = require('../components/move-message-field');

var Messages = React.createClass({
	getInitialState : function () {
		return {
			messages : MessageStore.getMessagesFromId(this.props.listId, false)
		}
	},
	componentDidMount : function() {
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		MessageStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({messages : MessageStore.getMessagesFromId(this.props.listId, false)});
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
		        <MessageField action='delete' text='delete' messageId={this.props.messageId}/>
		        <MessageField action='archive' text='archive' messageId={this.props.messageId}/>
				<MoveMessageField messageId={this.props.messageId} />
		    </div>
	    );
	}
});

module.exports = {Messages, Message}