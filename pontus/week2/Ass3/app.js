class Wrapper extends React.Component { 
	constructor(props) { 
		super(props);

		// init state
		this.state = {
			lists: {
				"listID": {
					title: "name of list1",
					"messageIDList1":  { text: "message one of list"},
					"messageID2List1": { text: "message two of list"}
				},
				"listID2": {
					title: "name of list2",
					"messageID":  { text: "message one of second list"},
					"messageID2": { text: "message two of second list"},
					"messageID3": { text: "message three of second list"}
				}
			}
		};

		this.createList = () => { 
			let newID = Date.now();
			let lists = JSON.parse(JSON.stringify(this.state.lists));
			if (this.refs.inputField.value != '') { 
				let nameOfList = this.refs.inputField.value;
			}

			lists[newID] = { title: nameOfList };
			this.setState({ lists });
		}
	}

	createMsg(listID, message) {
		let newID = Date.now();
		let msg = {text: message};
		let lists = JSON.parse(JSON.stringify(this.state.lists));

		lists[listID][newId] = msg;
		this.setState({ lists });
	}

	deleteMsg(listID, msgID) { 
		let lists = JSON.parse(JSON.stringify(this.state.lists));

		delete lists[listID][msgID];
		this.setState({ lists });
	}

	archiveMsg(listID, msgID) { 
		let lists = JSON.parse(JSON.stringify(this.state.lists));

		// toggle the isArchived state
		lists[listID][msgID].isArchived = (!lists[listID][msgID].isArchived);
		this.setState({ lists });
	}

	render() {
		let lists = [];

		for (let list in this.state.lists) { 
			lists.push(<NamedList lists={this.state.lists} deleteMsg={this.deleteMsg.bind(this)} title={this.state.lists[list].title} archiveMsg={this.archiveMsg.bind(this)} createMsg={this.createMsg.bind(this)} listID={list} list={this.state.lists[list]} />);
		}

		return (
				<div>
				{lists}
				<h3>Create New List</h3>
				<input type="text" ref='inputField' placeholder="title" />
				<button onClick={this.createList}>Create new list</button>
				</div>
				);
	}
}

class NamedList extends React.Component { 
	constructor(props) { 
		super(props);

		this.createMsg = () => { 
			let message = this.refs.inputField.value;

			// callback to wrapper
			this.props.createMsg(this.props.listID, message);

			this.refs.inputField.value = "";
			this.refs.inputField.focus();
		}
	}

	render() {
		let archivedMessages = [];
		let nonArchivedMessages = [];
		let messages = []

			for (let key in this.props.list) { 
				if ( this.props.lists[this.props.listID][key].isArchived) {  
					archivedMessages.push(<Message listID={this.props.listID} msgID={key} lists={this.props.lists} archiveMsg={this.props.archiveMsg} deleteMsg={this.props.deleteMsg} message={this.props.list[key].text}/>);
				}
				else { 
					nonArchivedMessages.push(<Message listID={this.props.listID} msgID={key} lists={this.props.lists} archiveMsg={this.props.archiveMsg} deleteMsg={this.props.deleteMsg} message={this.props.list[key].text}/>);
				}
			}
		messages = nonArchivedMessages.concat(archivedMessages);

		return (
				<div>
				<h2>{this.props.title}</h2>
				<ul>
				{messages}
				</ul> 
				<input ref='inputField' type="text" />
				<button onClick={this.createMsg}>Create New Message</button>
				</div>
				);
	}
}
NamedList.defaultProps = { title: "new list" };

class Message extends React.Component { 
	constructor(props) { 
		super(props);

		this.state = {  
			isArchived: false
		};
	}

	handleClick(e) {
		let btnAction = e.target.getAttribute('data-action');
		let listID = this.props.listID;
		let msgID = this.props.msgID;

		if (btnAction === 'delete') { 
			this.props.deleteMsg(listID, msgID);
		} 
		else if (btnAction === 'archive' || btnAction === 'unarchive') { 
			this.props.archiveMsg(listID, msgID);
		}
		else { 
			return;
		}
	}

	render() {
		let listID = this.props.listID;
		let msgID = this.props.msgID;
		let isArchived = this.props.lists[listID][msgID].isArchived;

		let msgStyle = (isArchived) ? { color: 'grey', display:'inline', marginRight: '10px'} : { display: 'inline', marginRight: '10px' };
		let archivedPrefix = (isArchived) ? "(archived) " : "";
		let archiveAction = (isArchived) ? "unarchive" : "archive";

		return (
				<div>
					<li style={msgStyle}>{archivedPrefix}{this.props.message}</li>
					<div style={msgStyle} onClick={this.handleClick.bind(this)}>
						<button data-action="delete">Delete</button>
						<button data-action={archiveAction}>{archiveAction}</button>
					</div>
				</div>
		);
	}
}

ReactDOM.render(
		<Wrapper />, 
		document.getElementById('app')
		);
