class Wrapper extends React.Component { 
	constructor(props) { 
		super(props);

      // this.state = { 
		// 	lists: [ {listID: 1, listName: "list 1" }, {listID: 2, listName: "list 2" } ],  
		// 	messages: [ 
		// 		{ messageID: 1, listID: 1, text: "I Belong To list 1", isArchived: false },
		// 		{ messageID: 2, listID: 2, text: "I Belong to List 2", isArchived: true } 
		// 	]   
		// };

		this.state = { 
			lists: [],
			messages: []
		};

		this.createList = () => { 
			let listID = Date.now();
			let lists = JSON.parse(JSON.stringify(this.state.lists));

			if (this.refs.inputField.value != '') { 
				let listName = this.refs.inputField.value;
				let list = { listID, listName };
				lists.push(list);
			}

			else { 
				let list = { listID: newID, listName: "" };
				lists.push(list);
			}
			this.setState({ lists });
			this.refs.inputField.value = "";
		}
	}
	createMsg(listID, text) {
		let message = {messageID: Date.now(), listID, text, isArchived: false};
		this.setState({ messages: this.state.messages.concat(message) });
	}

	moveMsg(listID, messageID) { 
		let message = this.state.messages.filter( message => message.messageID == messageID )[0];
		let restOfmessages = this.state.messages.filter( message => message.messageID != messageID );
		message.listID = parseInt(listID);
		let messages = restOfmessages.concat(message);
		this.setState({ messages });
	}

	deleteMsg(listID, messageID) { 
		let messages = this.state.messages.filter( message => message.messageID != messageID );
		this.setState({ messages });
	}

	archiveMsg(listID, messageID) { 
		let archivedMsg = this.state.messages.filter( (message) => message.messageID == messageID )[0];
		archivedMsg.isArchived = !archivedMsg.isArchived;
		let restOfmessages = this.state.messages.filter( (message) => message.messageID != messageID );
		let messages = restOfmessages.concat(archivedMsg);

		this.setState({ messages });
	}
	
	render() {
		let listProperties = this.state.lists.map( (list) => { 
			return { listName: list.listName, listID: list.listID } 
		});

		let lists = this.state.lists.map( (list) => { 
			let messages = this.state.messages.filter( message => message.listID === list.listID );
			return <NamedList 
				listID={list.listID} 
				listName={list.listName} 
				messages={messages} 
				createMsg={this.createMsg.bind(this)} 
				archiveMsg={this.archiveMsg.bind(this)} 
				listProperties={listProperties}
				moveMsg={this.moveMsg.bind(this)} 
				deleteMsg={this.deleteMsg.bind(this)} 
			/>; 
		});

		return (
			<div>
				<h3>Create New List</h3>
				<input type="text" ref='inputField' placeholder="title" />
				<button onClick={this.createList}>Create new list</button>
				{lists}
			</div>
		);
	}
}

class NamedList extends React.Component { 
	constructor(props) { 
		super(props);

		this.state = { 
			charCount: 200,
			isError: false,
			errorMsg: "",
			displayChars: false
		};

		this.createMsg = () => { 
			let text = this.refs.inputField.value;
			this.props.createMsg(this.props.listID, text);
			this.refs.inputField.value = "";
			this.refs.inputField.focus();
		}
	}

	displayCharCount() { this.setState({ displayChars: !this.state.displayChars }); }

	charValidation() { 
		let charCount = 200 - this.refs.inputField.value.length;

		if (charCount < 0) this.setState({ isError: true, errorMsg: "out of characters." });
		else this.setState({ isError: false, errorMsg: "" }) 

		this.setState({ charCount });
	}

 	render() {
		let archivedMessages = this.props.messages.filter( message => message.isArchived );

		let allMessages = this.props.messages
			.filter( message =>  !message.isArchived )
			.concat(archivedMessages);

		let messages = allMessages.map( (message) => {
			return <Message 
				listID={message.listID} 
				messageID={message.messageID} 
				text={message.text} 
				isArchived={message.isArchived} 
				archiveMsg={this.props.archiveMsg} 
				listProperties={this.props.listProperties}
				listName={this.props.listName}
				moveMsg={this.props.moveMsg}
				deleteMsg={this.props.deleteMsg}
			/> ;
		});

		let errorMsg =  (this.state.isError) ? { color: 'red' } : { color: 'black'};
		let btnState = (this.state.isError) ? true : false;
		let displayChars = (this.state.displayChars) ? {display: 'inline'} : {display: 'none' };

		return (
			<div>
				<h2>{this.props.listName}</h2>
				<ul>
					{messages}
				</ul> 
				<input onBlur={this.displayCharCount.bind(this)} onFocus={this.displayCharCount.bind(this)} onKeyUp={this.charValidation.bind(this)} ref='inputField' type="text" />
				<button disabled={btnState} onClick={this.createMsg}>Create New Message</button>
				<br/>
				<div style={errorMsg}>
					<span style={displayChars}> {this.state.charCount} </span>
					<span>{this.state.errorMsg}</span>
				</div>
			</div>
		);
	}
}

class Message extends React.Component { 
	constructor(props) { 
		super(props);

		this.state = {  
			isArchived: false,
			showMenu: false
		};
	}
	move(e) {
		e.preventDefault();

		let currentListID = this.props.listID;
		let chosenListID = this.refs.menu.options[this.refs.menu.selectedIndex].value;
		let messageID = this.props.messageID;

		if (chosenListID === 'move to' || chosenListID == currentListID) console.log('they were the same'); 
		else this.props.moveMsg(chosenListID, messageID); 
	}

	archiveMessage(e) { 

	}

	deleteMessage(e) {

	}

	moveMessage(e) {


	}

	archOrDelMsg(e) {
		let btnAction = e.target.getAttribute('data-action');
		let listID = this.props.listID;
		let messageID = this.props.messageID;

		if (btnAction === 'delete') { this.props.deleteMsg(listID, messageID); } 
		else if (btnAction === 'archive' || btnAction === 'unarchive') { this.props.archiveMsg(listID, messageID); }
		else if (btnAction === 'moveMsg') { this.setState({ showMenu: !this.state.showMenu }); }
	}

	render() {
		let isArchived = this.props.isArchived;
		let msgStyle = (isArchived) ? { color: 'grey', display:'inline', marginRight: '10px'} : { display: 'inline', marginRight: '10px' };
		let archiveAction = (isArchived) ? "unarchive" : "archive";
		let menuItems = (this.state.showMenu) ? {display: 'inline'} : { display: 'none'} ;
		let btnState = (isArchived) ? true : false;

		let listProperties = [];
		  for (let key in this.props.listProperties) { 
			  let list = this.props.listProperties[key];
			  listProperties.push(<MenuItem listID={list.listID} listName={list.listName} />);
		  }
		return (
			<div>
				<li style={msgStyle}>{this.props.text}</li>
				<div style={msgStyle} onClick={this.archOrDelMsg.bind(this)}>
					<button onClick={this.archive}>{archiveAction}</button>
					<button disabled={btnState} data-action="delete">Delete</button>
						<select disabled={btnState} ref="menu" defaultValue="move to">
						<option value="move to">Move to</option>
							{listProperties} 
						</select>
					  <button disabled={btnState} onClick={this.move.bind(this)}>Move</button>
				</div> 
			</div>
		);
	}
}
const MenuItem = ({listID, listName}) => ( <option value={listID}>{listName}</option> );

ReactDOM.render( <Wrapper/>, document.getElementById('app'));
