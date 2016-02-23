class Wrapper extends React.Component { 
	constructor(props) { 
		super(props);

      this.state = { 
			lists: [ {listID: 1, listName: "list 1" }, {listID: 2, listName: "list 2" } ],  
			messages: [ 
				{ messageID: 1, listID: 1, text: "I Belong To list 1", isArchived: false },
				{ messageID: 2, listID: 2, text: "I Belong to List 2", isArchived: true } 
			]   
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

	// moveMsg(currentListID, newListID, msgID) { 
	// 	let lists = JSON.parse(JSON.stringify(this.state.lists));
   //
	// 	lists[newListID][msgID] = lists[currentListID][msgID];
	// 	delete lists[currentListID][msgID];
	// 	this.setState({ lists });
	// }


	createMsg(listID, text) {
		let newID = Date.now();
		let message = {messageID: newID, listID, text, isArchived:false};

		let messages = JSON.parse(JSON.stringify(this.state.messages));

		messages.push(message);

		this.setState({ messages });
	}

	// deleteMsg(listID, msgID) { 
	// 	let lists = JSON.parse(JSON.stringify(this.state.lists));
	// 	console.log('delete');

		// delete lists[listID][msgID];
		// this.setState({ lists });
	// }

	archiveMsg(listID, msgID) { 
		let lists = JSON.parse(JSON.stringify(this.state.lists));

		console.log(`msgID: ${msgID} and listID: ${listID}` );

		this.state.messages.forEach( (message, i) => { 
			if (message.messageID == msgID) { 
				let msgDeepCopy = JSON.parse(JSON.stringify(message));
				let index = i;
				console.log("index");
				console.log(index);
			}
		});

		let messages = JSON.parse(JSON.stringify(this.state.messages));

		msgDeepCopy.isArchived = !msgDeepCopy.isArchived;

		messages.push

			this.setState({ 
				messages: messages[index].isArchived



		// toggle the isArchived state
		// lists[listID][msgID].isArchived = (!lists[listID][msgID].isArchived);
		this.setState({ lists });
	}
	
	render() {

		// moveMsg={this.moveMsg.bind(this)} 
		// deleteMsg={this.deleteMsg.bind(this)} 
		
		let lists = this.state.lists.map( (list) => { 
			let messages = this.state.messages.filter( message => message.listID === list.listID );

			return <NamedList listID={list.listID} listName={list.listName} messages={messages} createMsg={this.createMsg.bind(this)} archiveMsg={this.archiveMsg.bind(this)} />; 
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

		propTypes: { 
			listName: React.PropTypes.string
		}; 

		this.state = { 
			charCount: 200,
			isError: false,
			errorMsg: "",
			displayChars: false

		};

		this.createMsg = () => { 
			let text = this.refs.inputField.value;

			// callback to wrapper
			this.props.createMsg(this.props.listID, text);

			this.refs.inputField.value = "";
			this.refs.inputField.focus();
		}
	}

	displayCharCount() {
		this.setState({ displayChars: !this.state.displayChars });
	}

	charValidation() { 
		let charCount = 200 - this.refs.inputField.value.length;

		if (charCount < 0) { 
			this.setState({ 
				isError: true,
				errorMsg: "out of characters."
			});
		} 
		else { 
			this.setState({ 
				isError: false,
				errorMsg: ""
			});
		}
		this.setState({ charCount });
	}

 	render() {
		let archivedMessages = this.props.messages.filter( message => message.isArchived );

		let allMessages = this.props.messages
			.filter( message =>  !message.isArchived )
			.concat(archivedMessages);

		let messages = allMessages.map( (message) => {
			console.log(`listID ${message.listID}`);
			return <Message listID={message.listID} messageID={message.messageID} text={message.text} archiveMsg={this.props.archiveMsg} /> ;
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
NamedList.defaultProps = { listName: "new list" };

class Message extends React.Component { 
	constructor(props) { 
		super(props);

		this.state = {  
			isArchived: false,
			showMenu: false
		};
	}
//
// 	move(e) {
// 		let currentListID = e.target.getAttribute('data-current');
// 		let newListID = e.target.getAttribute('data-new');
// 		let msgID = this.props.msgID;
//
// 		if (currentListID == newListID) return;
//
// 		// callback to wrapper
// 		this.props.moveMsg(currentListID, newListID, msgID);
// 	}
//
	archOrDelMsg(e) {
		let btnAction = e.target.getAttribute('data-action');
		let listID = this.props.listID;
		let messageID = this.props.messageID;

		console.log('archOrDelMsg');

		console.log(`msgID: ${messageID} and listID: ${listID}` );

		if (btnAction === 'delete') { 
			this.props.deleteMsg(listID, messageID);
		} 
		else if (btnAction === 'archive' || btnAction === 'unarchive') { 
			this.props.archiveMsg(listID, messageID);
		}
		else if (btnAction === 'moveMsg') { 
			this.setState({ showMenu: !this.state.showMenu });
		}
	}

	render() {
		let menu = [];
		// for (let key in this.props.lists) {
		// 	menu.push(<MenuItem title={this.props.lists[key].title + " | "} currentListID={this.props.listID} newListID={key} />);
		// }
//
		// let listID = this.props.listID;
		let msgID = this.props.msgID;
		let isArchived = this.props.isArchived;
//
		let msgStyle = (isArchived) ? { color: 'grey', display:'inline', marginRight: '10px'} : { display: 'inline', marginRight: '10px' };
		let archivedPrefix = (isArchived) ? "(archived) " : "";
		let archiveAction = (isArchived) ? "unarchive" : "archive";
		let menuItems = (this.state.showMenu) ? {display: 'inline'} : { display: 'none'} ;
		let btnState = (isArchived) ? true : false;

		return (
			<div>
				<li style={msgStyle}>{archivedPrefix}{this.props.text}</li>
				<div style={msgStyle} onClick={this.archOrDelMsg.bind(this)}>
					<button data-action={archiveAction}>{archiveAction}</button>
					<button disabled={btnState} data-action="delete">Delete</button>
					<button disabled={btnState} data-action="moveMsg">Move</button>
				</div> 
				<span onClick={this.move} style={menuItems}>
					<strong>Move to: </strong> {menu}
				</span>
			</div>
		);
	}
}

// const MenuItem = ({title, currentListID, newListID}) => ( 
// 	<span data-current={currentListID} data-new={newListID}>{title}</span>
// );

ReactDOM.render(
	<Wrapper/>, 
	document.getElementById('app')
);
