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

import NotificationBar from '../components/notification-bar'

function getLists(){
	return ListStore.getAllLists();
}

function getNotifications(){
	return MessageStore.getNotifications()
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
		return {
			lists : getLists(), 
		}; 
	},
	handleText: function(event){
		this.setState({messageContent: event.target.value})
	},
	handleListId: function(event){
		this.setState({listId: event.target.value.charAt(0)}) // First char is listId
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
		this.setState({lists : getLists()})
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
	getInitialState : function(){
		return {lists : getLists()}; 
	},
	handleListId: function(event){
		var listId = event.target.value.charAt(event.target.value.search(/\d/))
		this.setState({listId: listId })
	},
	submitMoveMessage : function(){
		MessageActions.moveMessage(this.state.listId, this.props.messageId)
	},
	componentDidMount : function() {
		ListStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		ListStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({lists : getLists()})
	},
	render: function() {
		var listChoices = this.state.lists.map(function(list){
			return(
				<option key={list.listId} >move message to list: {list.listId + " : " + list.listName}</option>
			)
		}.bind(this));
	    return (
	      <div>
	        <p></p> 
			<select  style={{display: 'inline-block', marginRight : '10px'}} onChange={this.handleListId}>
	        	<option>Choose list</option>
	        	{listChoices}
			 </select>
			<input type="submit" value="Move Message" onClick={this.submitMoveMessage} />
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
			<button type="submit" style={{display: 'inline-block', marginRight : '10px'}} onClick={this.submitMessageDelete}>Delete Message</button>
		);
	}
});

var ArchiveMessageField = React.createClass({
	submitMessageArchive : function () {
		MessageActions.archiveMessage(this.props.messageId)
	},
	render: function(){
		return (
			<button type="submit"  style={{display: 'inline-block', marginRight : '10px'}} onClick={this.submitMessageArchive}>Archive</button>
		)
	}
});

var UnarchiveMessageField = React.createClass({
	submitMessageUnarchive : function () {
		MessageActions.unarchiveMessage(this.props.messageId)
	},
	render: function(){
		return (
			<button type="submit"  style={{display: 'inline-block', marginRight : '10px'}} onClick={this.submitMessageUnarchive}>Unarchive</button>
		)
	}
});

var ListCheckboxes = React.createClass({
	render : function(){
		var listNodes = this.props.lists.map(function(list){
			return(
				<label key={list.listId}>ID: {list.listId} | Name: {list.listName}<input type="checkbox" value={list.listId} onChange={this.props.onCheckboxChange}/></label>
			)
		}.bind(this));
		return (
			<div>
				Here are the checkboxes:
			 	{listNodes}
			</div>
		);
	}
});

var NotificationBox = React.createClass({
	getInitialState : function() {
		return {notifications : getNotifications()}
	},
	componentDidMount : function() {
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		ListStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({notifications : getNotifications()})
	},
	render : function(){
		if(this.state.notifications.length > 0){
			var notifications = this.state.notifications.map(function(notification){
				return (
					<Notification key={notification.id} id={notification.id} message={notification.message} isError={notification.isError} />
				)
			}.bind(this))
			return (
				<div>
					{notifications}
				</div>
				)
		} else {
			return (
				null
			)
		}
	}
});

var Notification = React.createClass({
	dismissNotification : function() {
		MessageActions.dismissNotification(this.props.id)
	},
	render : function(){
		return(
			<div>
				<NotificationBar key={this.props.id} message={this.props.message} isError={this.props.isError} onDismissed={this.dismissNotification} />
			</div>
		)
	}
})

module.exports = {CreateListField, CreateMessageField, MoveMessageField, DeleteMessageField, ArchiveMessageField, UnarchiveMessageField, ListCheckboxes, NotificationBox};