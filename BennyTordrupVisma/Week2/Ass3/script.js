var Message = React.createClass({
	render: function() {
		return (
			<div>
					{this.props.message.isArchived 
						? <div className="archived-message">{this.props.message.text}</div> 
						: <div>{this.props.message.text}<button onClick={this.handleArchive}>Archive</button><button onClick={this.handleDelete}>Delete</button></div>}
			</div>
		);
	},
	
	handleDelete: function() {
		window.alert("Delete");
	},
	
	handleArchive: function() {
		this.props.onArchiveMessage(this.props.message.id);
	},
})

var List = React.createClass({
	render: function() {
		var that = this;
		
		return 	<div>
					<h4>{this.props.list.name}</h4>
					<div>
						{this.props.list.messages.map(function(message) {
							return <Message key={message.id} message={message} onArchiveMessage={that.archiveMessage}/>;
						})}
					</div>
				</div>
	},
	
	archiveMessage: function(messageId) {
		this.props.onArchiveMessage(messageId, this.props.list.name);
	}
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
		var that = this;
		
		return 	<div>
					<InputField handleCommit={this.commitMessage}/>
					<div>
						<h3>Lists</h3>
						<div>
							{this.state.lists.map(function(list) {
								return <List key={list.name} list={list} onArchiveMessage={that.archiveMessage} />
							})}
						</div>
					</div>
				</div>
	},
	
	archiveMessage: function(messageId, listId) {
		window.alert("Archiving message");
		var listToChange = this.state.lists.find(el => el.name == listId);
		if (listToChange == null)
			return;
		
		var msgToArchive = listToChange.messages.find(m => m.id = messageId);
		if (msgToArchive == null)
			return;
		
		window.alert("Setting isArchived");
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
