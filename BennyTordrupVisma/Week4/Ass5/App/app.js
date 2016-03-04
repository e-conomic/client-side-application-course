var React = require("react");

var List = require("./Components/list");
var InputField = require("./Components/inputfield");

var ListActions = require("./Actions/list-actions");
var MessageActions = require("./Actions/message-actions");

var ListStore = require("./Stores/list-store");
var MessageStore = require("./Stores/message-store");

function getAppState(){
    return {
        allLists: ListStore.getAll(),
        allMessages: MessageStore.getAll(),
    }    
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    
    componentDidMount: function() {
        ListStore.addChangeListener(this._onChange);
        MessageStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
        ListStore.removeChangeListener(this._onChange);
        MessageStore.removeChangeListener(this._onChange);
    },
    
	render: function() {
        var listList = this.state.allLists.map(function (list, index) {
            return <List key={index} list={list} messages={this.state.allMessages.filter(m => m.list == list.id)}/>
        }.bind(this));
		
		return 	<div>
					<InputField handleCommit={this.commitMessage} lists={this.state.allLists}/>
					<div>
						<h3>Lists</h3>
						<div>
							{listList}
						</div>
					</div>
				</div>
	},
    
    _onChange: function() {
         this.setState(getAppState());
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
});

module.exports = App;