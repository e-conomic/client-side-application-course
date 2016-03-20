var React = require('react');
var Message = require('./message');
var MessageStore = require('../stores/message-store');

var MessageContainer = React.createClass({
	getInitialState : function () {
		return {
			messages : MessageStore.getMessagesFromId(this.props.listId, this.props.archived)
		}
	},
	componentDidMount : function() {
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		MessageStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({messages : MessageStore.getMessagesFromId(this.props.listId, this.props.archived)});
	},
	render : function() {
		console.log("archived: " + this.props.archived);
		var messageNodes = this.state.messages.map(function(message) {
			return(
				<Message key={message.messageId} messageId={message.messageId} content={message.content} archived={this.props.archived}/>
			)
		}.bind(this));
		return(
			<div>
				{messageNodes}
			</div>
		);		
	}
});


module.exports = MessageContainer