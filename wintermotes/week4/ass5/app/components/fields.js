var React = require('react');
var List = require('./list');
var Messages = require('./message').Messages;
var Message = require('./message').Message; 
var archivedMessages = require('./message').ArchivedMessages;
var ArchivedMessage = require('./message').ArchivedMessage;

var ListStore = require('../stores/list-store');
var ListActions = require('../actions/list-actions');

var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions');

function getLists(){
	return {
		lists : ListStore.getAll()
	};
}

var CreateListField = React.createClass({
	handleText: function(event){
		this.setState({text: event.target.value})
	},
	submitList: function(event){
		event.preventDefault();
		ListActions.createList(this.state.text)
	},
	render:function() {
		return (
			<div>
				<p><b>CreateListField</b></p>
		        <input type="text" onChange={this.handleText} id=""  />
		      	<input type="submit" value="Create List" onClick={this.submitList} />
	      	</div>
		)
	}
});

var CreateMessageField = React.createClass({
	getInitialState : function(){
		return getLists(); 
	},
	handleText: function(event){
		this.setState({messageContent: event.target.value})
	},
	handleListId: function(event){
		console.log("Setting listId to: " + event.target.value.charAt(0))
		this.setState({listId: event.target.value.charAt(0)})
	},
	submitMessage: function(event){
		MessageActions.createMessage(this.state.messageContent, this.state.listId)
	},
	componentDidMount : function() {
		ListStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		ListStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState(getLists())
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

var MoveMessageField = React.createClass({
	getInitialState: function(){
		return {
			newListId : -1, 
		}
	},
	handleListOptionValues: function(event){
		this.setState({newListId : event.target.value})
	},
	handleMessageOptionValues : function(event){
		this.setState({messageId : event.target.value})
	},
	submitMessageChange : function (event){
		event.preventDefault();
		//this.props.onMessageChange(this.props.listId, this.state.newListId, this.state.messageId)
	},
	render: function() {
	    return (
	      <div>
	        <p><b>Move message from list: </b></p> 
			<select onChange={this.handleMessageOptionValues}>
	        	<option>Choose Message</option>
			</select>
			<select onChange={this.handleListOptionValues}>
	        	<option>Choose list</option>
			 </select>
			<input type="submit" value="Move Message" onClick={this.submitMessageChange} />
        </div>
	    );
	}
});

var DeleteMessageField = React.createClass({
	submitMessageDelete : function(event) {
		MessageActions.deleteMessage(this.props.messageId)
	},
	render: function(){
		return (
			<button type="submit" onClick={this.submitMessageDelete}>Delete Message</button>
		);
	}
});

var ArchiveMessageField = React.createClass({
	submitMessageArchive : function () {
		MessageActions.archiveMessage(this.props.messageId)
	},
	render: function(){
		return (
			<button type="submit" onClick={this.submitMessageArchive}>Archive</button>
		)
	}
});

var UnarchiveMessageField = React.createClass({
	submitMessageUnarchive : function () {
		MessageActions.unarchiveMessage(this.props.messageId)
	},
	render: function(){
		return (
			<button type="submit" onClick={this.submitMessageUnarchive}>Unarchive</button>
		)
	}
});

module.exports = {CreateListField, CreateMessageField, MoveMessageField, DeleteMessageField, ArchiveMessageField, UnarchiveMessageField};