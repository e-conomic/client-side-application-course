let React = require('react');
let NamedList = require('./named-list');
let ReactDOM = require('react-dom');

let Wrapper = React.createClass({ 
	getInitialState() { 
		return { 
			lists: [],
			messages: []
		};
	},

	createList(e) { 
		let listID = Date.now();
		let list;
		if (e.keyCode == 13 || e.which == 13 || e.type == 'click') { 
			if (this.refs.inputField.value != '') list = { listID, listName: this.refs.inputField.value }
			else list = { listID, listName: "" };

			this.setState({ lists: this.state.lists.concat(list) });
			this.refs.inputField.value = "";
		}
	},

	createMsg(listID, text) {
		let message = {messageID: Date.now(), listID, text, isArchived: false};
		this.setState({ messages: this.state.messages.concat(message) });
	},

	moveMsg(listID, messageID) { 
		let message = this.state.messages.filter( message => message.messageID == messageID )[0];
		let restOfmessages = this.state.messages.filter( message => message.messageID != messageID );
		message.listID = parseInt(listID);
		let messages = restOfmessages.concat(message);
		this.setState({ messages });
	},

	deleteMsg(listID, messageID) { 
		let messages = this.state.messages.filter( message => message.messageID != messageID );
		this.setState({ messages });
	},

	archiveMsg(listID, messageID) { 
		let archivedMsg = this.state.messages.filter( message => message.messageID == messageID )[0];
		archivedMsg.isArchived = !archivedMsg.isArchived;

		let restOfmessages = this.state.messages.filter( message => message.messageID != messageID );
		let messages = restOfmessages.concat(archivedMsg);

		this.setState({ messages });
	},
	
	render() {
		let listProperties = this.state.lists.map( (list) => { 
			return { listName: list.listName, listID: list.listID } 
		});

		let lists = this.state.lists.map( (list) => { 
			let messages = this.state.messages.filter( message => message.listID === list.listID );

			return <NamedList 
				key={list.listID}
				listID={list.listID} 
				listName={list.listName} 
				messages={messages} 
				createMsg={this.createMsg} 
				archiveMsg={this.archiveMsg} 
				listProperties={listProperties}
				moveMsg={this.moveMsg} 
				deleteMsg={this.deleteMsg} 
			/>; 
		});

		return (
			<div>
				<h3>Create New List</h3>
				<input type="text" ref='inputField' onKeyDown={this.createList} placeholder="title" />
				<button onClick={this.createList}>Create new list</button>
				{lists}
			</div>
		);
	}
});

ReactDOM.render( <Wrapper/>, document.getElementById('app'));
