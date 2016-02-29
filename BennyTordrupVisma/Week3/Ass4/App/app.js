var React = require("react");

var List = require("./list");
var InputField = require("./inputfield");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			//lists: []
			lists: [{
				name: "List 1", 
				messages: [ {
						id: 1,
						text: "Test 1-1"
					},
					{
						id: 2,
						text: "Test 1-2",
						isArchived: true
					},
					{
						id: 3,
						text: "Test 1-3"
					},
					{
						id: 4,
						text: "Test 1-4",
						isArchived: true
					},
					{
						id: 5,
						text: "Test 1-5"
					}] 
			},
			{
				name: "List 2", 
				messages: [ {
						id: 1,
						text: "Test 2-1"
					},
					{
						id: 2,
						text: "Test 2-2",
						isArchived: true
					},
					{
						id: 3,
						text: "Test 2-3"
					},
					{
						id: 4,
						text: "Test 2-4",
						isArchived: true
					},
					{
						id: 5,
						text: "Test 2-5"
					}] 
			}]
		}
	},
	
	render: function() {
		var listList = this.state.lists.map(function(list, index) {
			return <List key={index} 
						list={list} 
						onArchiveMessage={this.archiveMessage} 
						onDeleteMessage={this.deleteMessage}
						onUnarchiveMessage={this.unarchiveMessage}
						onMoveMessage={this.moveMessage} />
		}.bind(this));
		
		return 	<div>
					<InputField handleCommit={this.commitMessage} lists={this.state.lists}/>
					<div>
						<h3>Lists</h3>
						<div>
							{listList}
						</div>
					</div>
				</div>
	},

	moveMessage: function(message, oldList, newListName) {
		console.log("Moving message from " + oldList.name + " to " + newListName)
		var sourceList = this.state.lists.find(l => l.name == oldList.name);
		if (!sourceList)
			return;
		
		var msgPos = sourceList.messages.findIndex(m => m.id = message.id);
		if (msgPos === -1)
			return;

		var msgText = sourceList.messages[msgPos].text;

		this.deleteMessage(message, oldList);
		
		this.commitMessage(msgText, newListName);
	},
	
	deleteMessage: function(message, list) {
		var listInStateToChange = this.state.lists.find(l => l.name == list.name);
		if (!listInStateToChange)
			return;
		
		var listToChange = Object.assign({}, listInStateToChange);

		var msgPos = listToChange.messages.findIndex(m => m.id == message.id);
		if (msgPos === -1)
			return;

		listToChange.messages.splice(msgPos, 1);
		
		this.setState({
			lists: this.state.lists.map(function(list) {
				return list.name == listToChange.name ? listToChange : list;
			})
		});
	},
	
	archiveOrUnarchiveMessageKernel: function(message, list, doArchive) {
		var listToChange = this.state.lists.find(l => l.name == list.name);
		if (!listToChange)
			return;
		
		var destList = Object.assign({}, listToChange);
		
		var msgToArchive = destList.messages.find(m => m.id == message.id);
		if (!msgToArchive)
			return;
		
		msgToArchive.isArchived = doArchive;
		
		this.setState({
			lists: this.state.lists.map(function(list) {
					return list.name == destList.name ? destList : list;
			})
		});
	},
	
	archiveMessage: function(message, list) {
		this.archiveOrUnarchiveMessageKernel(message, list, true);
	},
	
	unarchiveMessage: function(message, list) {
		this.archiveOrUnarchiveMessageKernel(message, list, false);
	},

	commitMessage: function(messageText, listName) {
		var msgToAdd = {
			id: 0,
			text: messageText,
			isArchived: false
		};
		
		var destinationList = this.state.lists.find(l => l.name == listName);	
		if (destinationList == null) {
			msgToAdd.id=1;
			
			destinationList = {
				name: listName, 
				messages: [msgToAdd]
			};
			
			this.setState({
				lists: this.state.lists.concat([destinationList])
			});
		}
		else {
			msgToAdd.id= destinationList.messages.length + 1;
			var newDestList = Object.assign({}, destinationList);
			newDestList.messages.push(msgToAdd);
			this.setState({
				lists: this.state.lists.map(function(list) { 
					return list.name == newDestList.name ? newDestList : list; 
				})
			});
		}
	},
})