var Message = React.createClass({
	getInitialState: function() {
		return {
			listSelectionVisible : false
		}
	},
	
	render: function() {
		var archivedMessage =	<div className="archived-message">
									{this.props.message.id}. {this.props.message.text}
									<button onClick={this.handleUnarchive}>Unarchive</button>
								</div>	
								
		var nonArchivedMessage =	<div>
										{this.props.message.id}. {this.props.message.text}
										<button onClick={this.handleArchive}>Archive</button>
										<button onClick={this.handleDelete}>Delete</button>
										{!this.state.listSelectionVisible && <button onClick={this.handleShowListSelection}>Move</button>}
										{this.state.listSelectionVisible &&
											<div>
												<label>New list: </label>
												<input type="text" ref="newList" />
												<button onClick={this.handleMoveMessage}>Move</button>
											</div>}
									</div>
									
		return	<div>
					{this.props.message.isArchived ? archivedMessage : nonArchivedMessage}
				</div>
		
	},
	
	handleShowListSelection: function() {
		this.setState({
			listSelectionVisible: true
		})
	},
	
	handleMoveMessage: function() {
		this.props.onMoveMessage(this.props.message, this.refs.newList.value);
		this.setState({
			listSelectionVisible: false
		})
	},
	
	handleDelete: function() {
		this.props.onDeleteMessage(this.props.message);
	},
	
	handleArchive: function() {
		this.props.onArchiveMessage(this.props.message);
	},
	
	handleUnarchive: function() {
		this.props.onUnarchiveMessage(this.props.message);
	}
})

var List = React.createClass({
	render: function() {
		var that = this;
		var activeMessageList = this.props.list.messages.filter(e => !e.isArchived).map(function(message, index) {
			return <Message key={index} 
							message={message} 
							onArchiveMessage={that.archiveMessage} 
							onDeleteMessage={that.deleteMessage}
							onUnarchiveMessage={that.unarchiveMessage} 
							onMoveMessage={that.moveMessage} />
		});
		var archivedMessageList = this.props.list.messages.filter(e => e.isArchived).map(function(message, index) {
			return <Message key={index} 
							message={message} 
							onArchiveMessage={that.archiveMessage} 
							onDeleteMessage={that.deleteMessage}
							onUnarchiveMessage={that.unarchiveMessage} />
		});
		
		return 	<div className="list">
					<h4>{this.props.list.name}</h4>
					<div>
						{activeMessageList}
					</div>
					<h5>Archived messages</h5>
					<div>
						{archivedMessageList}
					</div>
				</div>
	},
	
	moveMessage: function(message, newListName)
	{
		this.props.onMoveMessage(message, this.props.list, newListName);
	},
	
	deleteMessage: function(message) {
		this.props.onDeleteMessage(message, this.props.list);
	},
	
	archiveMessage: function(message) {
		this.props.onArchiveMessage(message, this.props.list);
	},
	
	unarchiveMessage: function(message) {
		this.props.onUnarchiveMessage(message, this.props.list);
	},
})

var InputField = React.createClass({
	render: function() {
		return <div>
				<label>Text to add: </label>
				<input type="text" ref="input"/>
				<label>Name of list: </label>
				<input type="text" ref="listInput"/>
				<button onClick={this.handleCommit}>Commit</button>
			</div>;
	},
	
	isInputValid: function(input, list) {
		if (input.length > 200)
		{
			window.alert("The input may not exceed 200 characters.");
			return false;
		}
		
		if (list.length == 0)
		{
			window.alert("You have to enter a name on the list to add message to.");
			return false;
		}
		
		if (this.props.lists.some(l => l.messages.some(m => m.text == input)))
		{
			window.alert("The message is already member of a list and cannot be added");
			return false;
		}
		
		return true;
	},
	
	handleCommit: function() {
		var input = this.refs.input.value;
		var list = this.refs.listInput.value;
		if (this.isInputValid(input, list)) {
			this.props.handleCommit(input, list);
			this.refs.input.value = '';
			this.refs.listInput.value = '';
			this.refs.input.focus();
		}
	},
});

var App = React.createClass({
	getInitialState: function() {
		return {
			//lists: []
			lists: [{
				name: "List 1", 
				messages: [
					{
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
				messages: [
					{
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
		
		var destinationList = this.state.lists.find(l => l.name == newListName);
		if (!destinationList)
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


ReactDOM.render(<App/>, document.getElementById("content"));
