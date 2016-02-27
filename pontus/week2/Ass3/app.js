class Wrapper extends React.Component { 
	constructor(props) { 
		super(props);

		this.state = { 
			lists: [],
			messages: []
		};

		this.createList = (e) => { 
			let listID = Date.now();
			let lists = JSON.parse(JSON.stringify(this.state.lists));

			if (e.keyCode == 13 || e.which == 13 || e.type == 'click') { 
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
		let archivedMsg = this.state.messages.filter( message => message.messageID == messageID )[0];
		archivedMsg.isArchived = !archivedMsg.isArchived;

		let restOfmessages = this.state.messages.filter( message => message.messageID != messageID );
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
				<input type="text" ref='inputField' onKeyDown={this.createList} placeholder="title" />
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

		this.createMsg = (e) => { 
			if (e.keyCode == 13 || e.which == 13 || e.type == 'click') { 
				let text = this.refs.inputField.value;
				this.props.createMsg(this.props.listID, text);
				this.refs.inputField.value = "";
				this.refs.inputField.focus();
			}
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
				listProperties={this.props.listProperties}
				listName={this.props.listName}
				archiveMsg={this.props.archiveMsg} 
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
				<input onBlur={this.displayCharCount.bind(this)} onKeyDown={this.createMsg} onFocus={this.displayCharCount.bind(this)} onKeyUp={this.charValidation.bind(this)} ref='inputField' type="text" />
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

NamedList.propTypes = { 
	listID: React.PropTypes.number,
	listName: React.PropTypes.string,
	createMsg: React.PropTypes.func,
	archiveMsg: React.PropTypes.func,
	moveMsg: React.PropTypes.func,
	deletesg: React.PropTypes.func,
	messages: React.PropTypes.arrayOf(React.PropTypes.object),
	listProperties: React.PropTypes.arrayOf(React.PropTypes.object)
};

class Message extends React.Component { 
	constructor(props) { 
		super(props);

		this.state = {  
			isArchived: false,
			showMenu: false
		};
	}

	moveMessage(e) {
		e.preventDefault();

		let currentListID = this.props.listID;
		let chosenListID = this.refs.menu.options[this.refs.menu.selectedIndex].value;
		let messageID = this.props.messageID;

		if (chosenListID === 'move to' || chosenListID == currentListID) return;
		else this.props.moveMsg(chosenListID, messageID); 
	}

	archiveMessage(e) { 
		this.props.archiveMsg(this.props.listID, this.props.messageID);
	}

	deleteMessage(e) {
		this.props.deleteMsg(this.props.listID, this.props.messageID);  
	}

	render() {
		let isArchived = this.props.isArchived;
		let msgStyle = (isArchived) ? { color: 'grey', display:'inline', marginRight: '10px'} : { display: 'inline', marginRight: '10px' };
		let archiveAction = (isArchived) ? "unarchive" : "archive";
		let btnState = (isArchived) ? true : false;

		let listItems = [];
		  for (let key in this.props.listProperties) { 
			  let list = this.props.listProperties[key];
			  listItems.push(<MenuItem listID={list.listID} listName={list.listName} />);
		  }
		return (
			<div>
				<li style={msgStyle}>{this.props.text}</li>
				<div style={msgStyle}>
					<button onClick={this.archiveMessage.bind(this)}>{archiveAction}</button>
					<button onClick={this.deleteMessage.bind(this)} disabled={btnState}>Delete</button>
						<select disabled={btnState} ref="menu" defaultValue="move to">
						<option value="move to">Move to</option>
							{listItems} 
						</select>
					  <button disabled={btnState} onClick={this.moveMessage.bind(this)}>Move</button>
				</div> 
			</div>
		);
	}
}
Message.propTypes = { 
	listID: React.PropTypes.number,
	messageID: React.PropTypes.number,
	listName: React.PropTypes.string,
	createMsg: React.PropTypes.func,
	archiveMsg: React.PropTypes.func,
	moveMsg: React.PropTypes.func,
	deletesg: React.PropTypes.func,
	isArchived: React.PropTypes.bool,
	listProperties: React.PropTypes.arrayOf(React.PropTypes.object)
};

const MenuItem = ({listID, listName}) => ( <option value={listID}>{listName}</option> );

ReactDOM.render( <Wrapper/>, document.getElementById('app'));
