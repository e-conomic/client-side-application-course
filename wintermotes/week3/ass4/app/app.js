var React = require('react')
var ReactDOM = require('react-dom')

var List = require('./components/list')

var Messages = require('./components/message').Messages
var Message = require('./components/message').Message 
var ArchivedMessages = require('./components/message').ArchivedMessages
var ArchivedMessage = require('./components/message').ArchivedMessage

var CreateListField = require('./components/fields').CreateListField
var CreateMessageField = require('./components/fields').CreateMessageField
var MoveMessageField = require('./components/fields').MoveMessageField
var DeleteMessageField = require('./components/fields').DeleteMessageField
var ArchiveMessageField = require('./components/fields').ArchiveMessageField

var MessageBox = React.createClass({
			getInitialState : function() {
				var lists = [
					{
						listId : 0, 
						listName : 'List1', 
						messages : [
							{messageId : 0, messageText : "List1 msg1", archived : false, listId : 0}, 
							{messageId : 1, messageText : "List1 msg2", archived : false, listId : 0}
						], 
						archivedMessages : [
							{messageId : 0, messageText : "Archived: List1 msg1", archived : true, listId : 0},
							{messageId : 1, messageText : "Archived: List1 msg2", archived : true, listId : 0}
						],
					},
					{
						listId : 1, 
						listName : 'List2', 
						messages : [
							{messageId : 0, messageText : "List2 msg1", archived : false, listId : 1}, 
							{messageId : 1, messageText : "List2 msg2", archived : false, listId : 1},
							{messageId : 2, messageText : "List2 msg3", archived : false, listId : 1}
						], 
						archivedMessages : [
							{messageId : 0, messageText : "Archived: List1 msg1", archived : true, listId : 1},
							{messageId : 1, messageText : "Archived: List1 msg2", archived : true, listId : 1}
						],
					}
				];
				return {lists};
			},
			createList: function(listName){
				var listId = this.state.lists.length
				var listObject = {listId : listId, listName : listName, messages : [], archivedMessages : []}
				
				this.setState({
				  lists: this.state.lists.concat([listObject])
				})
			},
			createMessage: function(messageObject, listId) {
				console.log("Create Message call")
				var newList = Object.assign({}, this.state.lists[listId])
				if(messageObject.archived){
					var newMessages = newList.archivedMessages.slice();
					newMessages.push(messageObject)		
					newList.archivedMessages = newMessages;
				}	else {
					var newMessages = newList.messages.slice();
					newMessages.push(messageObject)		
					newList.messages = newMessages;
				}

				this.setState({lists : this.state.lists.map(function(list){
					return list.listId === parseInt(listId) ? newList : list;
				})});
			},
			moveMessage: function(listId, newListId, messageId){
				var lists = this.state.lists.slice()
				var messageToMove = Object.assign({}, lists[listId].messages[messageId])

				lists[listId].messages.splice(messageId, 1)
				messageToMove.messageId = lists[newListId].messages.length
				messageToMove.listId = newListId
				this.createMessage(messageToMove, newListId)
			},
			deleteMessage : function(listId, messageId, archived){
				var newLists = this.state.lists.slice()
				var index = newLists[listId].messages.findIndex(function(x){return x.messageId == messageId;});

				if(archived)
					newLists[listId].archivedMessages.splice(index, 1)
				else 
					newLists[listId].messages.splice(index, 1)

				this.setState({lists : newLists})
			},
			archiveMessage : function (listId, messageId){
				var messageToArchive = Object.assign({}, this.state.lists[listId].messages[messageId])
				var archiveId = this.state.lists[listId].archivedMessages.length

				messageToArchive.archived = true
				messageToArchive.messageId = archiveId

				this.deleteMessage(listId, messageId, false)
				this.createMessage(messageToArchive, listId)
			},
			unarchiveMessage : function (listId, messageId){
				var archivedMessages = this.state.lists[listId].archivedMessages.slice()
				var index = archivedMessages.findIndex(function(archivedMessage){
					return archivedMessage.messageId === messageId
				}) 

				var messageToUnarchive = archivedMessages[index]
				var newMessageId = this.state.lists[listId].messages.length

				messageToUnarchive.archived = false
				messageToUnarchive.messageId = newMessageId

				this.deleteMessage(listId, messageId, true)
				this.createMessage(messageToUnarchive, listId)
			},
			findIndexById : function(list, id){
				for(var i = 0; i<list.length;i++){
					if(list[i].messageId == id){
						return i
					} 
				}
			},
			render: function() {
				return (
					<div id="container">
						<h1>Message box Week 2, Assignment 3: Create lists and messages</h1>
						<CreateListField onListSubmit={this.createList}/>
						<CreateMessageField onMessageSubmit={this.createMessage} lists={this.state.lists} />
						<OutputField lists={this.state.lists} onMessageArchive={this.archiveMessage} onMessageChange={this.moveMessage} onMessageDelete={this.deleteMessage}
						 onMessageUnarchive={this.unarchiveMessage}/>
					</div>
				);
			}
		});

		var OutputField = React.createClass({
			render: function() {
				var lists = this.props.lists.map(function(list) {
					return (
					<div>
						<List data={list} onMessageUnarchive={this.props.onMessageUnarchive}/>
						<MoveMessageField lists={this.props.lists} listId={list.listId} onMessageChange={this.props.onMessageChange} />
						<DeleteMessageField onMessageDelete={this.props.onMessageDelete} listId={list.listId} messages={list.messages}/>
						<ArchiveMessageField onMessageArchive={this.props.onMessageUnarchive} listId={list.listId} messages={list.messages}/>
					</div>
					);
				}.bind(this));
				return (
					<div>
						<p>Hello there this is the Output box, listing the lists</p>
						{lists}
					</div>
				);
			}
		});

	ReactDOM.render(
	  <MessageBox />,
	  document.getElementById('app')
	);    