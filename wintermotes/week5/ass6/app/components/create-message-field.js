var React = require('react');
var ListStore = require('../stores/list-store');
var MessageActions = require('../actions/message-actions');
var MessageStore = require('../stores/message-store');


var CreateMessageField = React.createClass({
	getInitialState : function(){
		return {
			lists : ListStore.getAllLists(), 
			messages : MessageStore.getAllMessages()
		}; 
	},
	handleText: function(event){
		this.setState({messageContent: event.target.value})
	},
	handleListId: function(event){
		this.setState({listId: event.target.value.charAt(0)}) // First char is listId
	},
	submitMessage: function(event){
		MessageActions.createMessage(this.state.messageContent, this.state.listId, this.state.messages)
	},
	componentDidMount : function() {
		ListStore.addChangeListener(this._onChange);
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		ListStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		console.log("Adding change CreateMessageField")
		this.setState({
			lists : ListStore.getAllLists(), 
			messages : MessageStore.getAllMessages()
		})
	},
	render: function() {
		var listChoices = this.state.lists.map(function(list){
			return(
				<option key={list.listId} onChange={this.handleListId}>{list.listId + " : " + list.listName}</option>
			)
		}.bind(this));
		return (
		<div>
			<p>Add a new message to one of the lists</p>
	        <input type="text" onChange={this.handleText} />
	        <select name="list" onChange={this.handleListId}>
	        	<option>Choose List: </option>
	        	{listChoices}
			</select>
			<button onClick={this.submitMessage} type="button">Create Message</button>
      	</div>
		);
	}
});

module.exports = CreateMessageField;