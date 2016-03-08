var React = require('react')
var List = require('./list')
var Messages = require('./message').Messages
var Message = require('./message').Message 
var archivedMessages = require('./message').ArchivedMessages
var ArchivedMessage = require('./message').ArchivedMessage

var CreateListField = React.createClass({
	handleText: function(event){
		this.setState({text: event.target.value})
	},
	submitList: function(event){
		event.preventDefault();
		this.props.onListSubmit(this.state.text)
	},
	render:function() {
		return (
			<div>
				<p><b>CreateListField</b></p>
		        <input type="text" onChange={this.handleText} />
		      	<input type="submit" value="Create List" onClick={this.submitList} />
	      	</div>
		)
	}
});

var CreateMessageField = React.createClass({
	handleText: function(event){
		this.setState({messageText: event.target.value})
	},
	handleListId: function(event){
		this.setState({listId: event.target.value})
	},
	submitMessage: function(event){
		event.preventDefault(); // So we don't refresh page when submitting a message
		if(this.state.messageText.length >= 200)
			return
		var listId = this.state.listId
		var messageId = this.props.lists[this.state.listId].messages.length
		var message = {messageId : messageId, messageText : this.state.messageText, archived : false, listId : listId}
		this.props.onMessageSubmit(message, listId)
	},
	render: function() {
	var listOptionValues = this.props.lists.map(function(list) {
        return (
	      <option value={list.listId}>{list.listName}</option>
	    );
    });
		return (
		<div>
			<p>Add a new message to one of the lists:</p>
	        <input type="text" onChange={this.handleText} />
	        <select name="list" onChange={this.handleListId}>
	        <option selected>Choose List: </option>
			    {listOptionValues}
			</select>
			<input type="submit" value="Submit Message" onClick={this.submitMessage} />
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
		var list = this.props.lists[event.target.value]
		this.setState({newListId : event.target.value})
	},
	handleMessageOptionValues : function(event){
		this.setState({messageId : event.target.value})
	},
	submitMessageChange : function (event){
		event.preventDefault();
		this.props.onMessageChange(this.props.listId, this.state.newListId, this.state.messageId)
	},
	render: function() {
	var listOptionValues = this.props.lists.map(function(list) {
        return (
	      <option value={list.listId}>{list.listName}</option>
	    );
    });
    var messageOptionValues = this.props.lists[this.props.listId].messages.map(function(message) {
        return (
	      <option value={message.messageId}>{message.messageText}</option>
	    );
    });
	    return (
	      <div>
	        <p><b>Move message from list {this.props.listId}: </b></p> 
			<select onChange={this.handleMessageOptionValues}>
	        	<option selected>Choose Message</option>
			    {messageOptionValues}
			</select>
			<select onChange={this.handleListOptionValues}>
	        	<option>Choose list</option>
			    {listOptionValues}
			</select>
			<input type="submit" value="Move Message" onClick={this.submitMessageChange} />
        </div>
	    );
	}
});

var DeleteMessageField = React.createClass({
	submitMessageDelete : function(event) {
		event.preventDefault();
		this.props.onMessageDelete(this.props.listId, this.state.messageId)
	},
	handleMessageChange : function(event) {
		this.setState({messageId : event.target.value})
	},
	render: function(){
		var messageOptionValues = this.props.messages.map(function(message) {
	        return (
		      <option value={message.messageId}>{message.messageText}</option>
		    );
   		});
		return (
			<div>
				<p><b>DeleteMessageField</b></p>
				<select onChange={this.handleMessageChange}>
		        	<option value="" selected>Choose message to delete:</option>
				    {messageOptionValues}
				</select>
				<input type="submit" value="Delete Message" onClick={this.submitMessageDelete} />
			</div>
		)
	}
});

var ArchiveMessageField = React.createClass({
	handleMessageArchive : function (event) {
		event.preventDefault();
		this.props.onMessageArchive(this.props.listId, this.state.messageId)
	},
	handleMessageValue : function (event){
		this.setState({messageId : event.target.value})
	},
	render: function(){
		var messageOptionValues = this.props.messages.map(function(message) {
	        return (
		      <option value={message.messageId}>{message.messageText}</option>
		    );
   		});
		return (
			<div>
				<p><b>ArchiveMessageField</b></p>
					<select onChange={this.handleMessageValue}>
			        	<option value="" selected>Choose message to archive:</option>
					    {messageOptionValues}
					</select>
					<input type="submit" value="Archive Message" onClick={this.handleMessageArchive} />
			</div>
		)
	}
		});

module.exports = {CreateListField, CreateMessageField, MoveMessageField, DeleteMessageField, ArchiveMessageField};