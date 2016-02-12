var Message = React.createClass({
	render: function() {
		return (
			<div>
					{this.props.isArchived 
						? <div className="archived-message">{this.props.text}</div> 
						: <div>{this.props.text}<button onClick={this.handleArchive}>Archive</button><button onClick={this.handleDelete}>Delete</button></div>}
			</div>
		);
	},
	
	handleDelete: function() {
		window.alert("Delete");
	},
	
	handleArchive: function() {
		this.props.onArchiveMessage(this.props.key);
	},
})

var MessagesComponent = React.createClass({
	render: function() {
		
		var messagesList = this.props.data.map(function(message) {
			return (
				<Message key={message.id} text={message.text} isArchived={message.isArchived} onArchiveMessage={message.onArchiveMessage}/>
			);
		});
		
		return	<div>
					{messagesList}
				</div>
	},
	
	archiveMessage: function(messageId) {
		window.alert("Archive message " + messageId);
		this.props.onArchiveMessage(messageId);
	},
})

var List = React.createClass({
	render: function() {
		return 	<div>
					<h4>{this.props.name}</h4>
					<MessagesComponent data={this.props.messages} onArchiveMessage={this.archiveMessage}/>
				</div>
	},
	
	archiveMessage: function(messageId) {
		window.alert("Archive message " + messageId + " in list " + this.props.key);
		this.props.onArchiveMessage(messageId, this.props.key);
	}
})

var ListsComponent = React.createClass({
	render: function() {
		var listList = this.props.data.map(function(list) {
			return (
				<List key={list.name} name={list.name} messages={list.messages} onArchiveMessage={list.archiveMessage}/>
			);
		});
		return (
			<div>
				<h3>Lists</h3>
				{listList}
			</div>
		);
	},
	
	archiveMessage: function(messageId, listId) {
		this.props.archiveMessage(messageId, listId);
	},
})

var InputField = React.createClass({
	render: function() {
		return <div>
				<label>Text to add:</label>
				<input type="text" ref="input" />
				<label>Name of list:</label>
				<input type="text" ref="listInput" />
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
		
		return true;
	},
	
	handleCommit: function() {
		var input = this.refs.input.value;
		var list = this.refs.listInput.value;
		if (this.isInputValid(input, list)) {
			this.props.handleCommit(input, list);
			this.refs.input.value = '';
			this.refs.listInput.value = '';
		}
	},
});

var App = React.createClass({
	getInitialState: function() {
		return {
			lists: []
		}
	},
	
	render: function() {
		return 	<div>
					<InputField handleCommit={this.commitMessage}/>
					<ListsComponent data={this.state.lists} onArchiveMessage={this.archiveMessage} />
				</div>
	},
	
	archiveMessage: function(messageId, listId) {
		var listToChange = this.state.lists.find(el => el.name == listId);
		if (listToChange == null)
			return;
		
		var msgToArchive = listToChange.messages.find(m => m.id = messageId);
		if (msgToArchive == null)
			return;
		
		msgToArchive.isArchived = true;
	},

	commitMessage: function(message, list) {
		var msgToAdd = {
			id: 0,
			text: message,
			isArchived: false
		};
		
		var destinationList = this.state.lists.find(el => el.name == list);	
		if (destinationList == null) {
			msgToAdd.id=1;
			
			destinationList = {
				name: list, 
				messages: [msgToAdd]
			};
			
			this.setState({
				lists: this.state && this.state.lists ? this.state.lists.concat([destinationList]) : [destinationList]
			});
		}
		else {
			msgToAdd.id= destinationList.messages.length + 1;
			destinationList.messages.push(msgToAdd);
			this.setState({
				lists: this.state.lists.map(function(list) { 
					return list.name == destinationList.name ? destinationList : list; 
				})
			});
		}
	},
})


ReactDOM.render(<App/>, document.getElementById("content"));
