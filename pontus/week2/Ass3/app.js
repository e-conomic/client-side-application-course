class Wrapper extends React.Component { 
	constructor(props) { 
		super(props);

      this.state = { lists:{} };

		this.createList = () => { 
			let newID = Date.now();
			let lists = JSON.parse(JSON.stringify(this.state.lists));

			if (this.refs.inputField.value != '') { 
				let nameOfList = this.refs.inputField.value;
				lists[newID] = { title: nameOfList };
			}
			else { 
				lists[newID] = {};
			}
			this.setState({ lists });
			this.refs.inputField.value = "";
		}
	}

	moveMsg(currentListID, newListID, msgID) { 
		let lists = JSON.parse(JSON.stringify(this.state.lists));

		lists[newListID][msgID] = lists[currentListID][msgID];
		delete lists[currentListID][msgID];
		this.setState({ lists });
	}

	createMsg(listID, message) {
		let newID = Date.now();
		let msg = {text: message};
		let lists = JSON.parse(JSON.stringify(this.state.lists));

		lists[listID][newID] = msg;
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
			lists.push(<NamedList lists={this.state.lists} moveMsg={this.moveMsg.bind(this)} deleteMsg={this.deleteMsg.bind(this)} title={this.state.lists[list].title} archiveMsg={this.archiveMsg.bind(this)} createMsg={this.createMsg.bind(this)} listID={list} list={this.state.lists[list]} />);
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

		propTypes: { 
			title: React.PropTypes.string
		}; 

		this.state = { 
			charCount: 200,
			isError: false,
			errorMsg: "",
			displayChars: false

		};

		this.createMsg = () => { 
			let message = this.refs.inputField.value;

			// callback to wrapper
			this.props.createMsg(this.props.listID, message);

			this.refs.inputField.value = "";
			this.refs.inputField.focus();
		}
	}

	displayCharCount() {
		this.setState({ 
			displayCharCount: !this.state.displayCharCount
		});
	}

	charValidation() { 
		let count = 200 - (this.refs.inputField.value.length);

		if (count < 0) { 
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

		this.setState({ 
			charCount : count
		});
	}

	render() {
		let archivedMessages = [];
		let nonArchivedMessages = [];
		let messages = []

			for (let key in this.props.list) { 
				if (key === 'title') continue;

				if ( this.props.lists[this.props.listID][key].isArchived) {  
					archivedMessages.push(<Message listID={this.props.listID} moveMsg={this.props.moveMsg.bind(this)} msgID={key} lists={this.props.lists} archiveMsg={this.props.archiveMsg} deleteMsg={this.props.deleteMsg} message={this.props.list[key].text}/>);
				}
				else { 
					nonArchivedMessages.push(<Message listID={this.props.listID} moveMsg={this.props.moveMsg.bind(this)} msgID={key} lists={this.props.lists} archiveMsg={this.props.archiveMsg} deleteMsg={this.props.deleteMsg} message={this.props.list[key].text}/>);
				}
			}
		messages = nonArchivedMessages.concat(archivedMessages);

		let errorMsg =  (this.state.isError) ? { color: 'red' } : { color: 'black'};
		let btnState = (this.state.isError) ? true : false;
		let displayChars = (this.state.displayCharCount) ? {display: 'inline'} : {display: 'none' };

		return (
				<div>
					<h2>{this.props.title}</h2>
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
NamedList.defaultProps = { title: "new list" };

class Message extends React.Component { 
	constructor(props) { 
		super(props);

		this.state = {  
			isArchived: false,
			showMenu: false
		};
	}

	move(e) {
		let currentListID = e.target.getAttribute('data-current');
		let newListID = e.target.getAttribute('data-new');
		let msgID = this.props.msgID;

		if (currentListID == newListID) return;

		// callback to wrapper
		this.props.moveMsg(currentListID, newListID, msgID);
	}

	archOrDelMsg(e) {
		let btnAction = e.target.getAttribute('data-action');
		let listID = this.props.listID;
		let msgID = this.props.msgID;

		if (btnAction === 'delete') { 
			this.props.deleteMsg(listID, msgID);
		} 
		else if (btnAction === 'archive' || btnAction === 'unarchive') { 
			this.props.archiveMsg(listID, msgID);
		}
		else if (btnAction === 'moveMsg') { 
			this.setState({ showMenu: !this.state.showMenu });
		}
	}

	render() {
		let menu = [];
		for (let key in this.props.lists) {
			menu.push(<MenuItem title={this.props.lists[key].title + " | "} currentListID={this.props.listID} newListID={key} />);
		}

		let listID = this.props.listID;
		let msgID = this.props.msgID;
		let isArchived = this.props.lists[listID][msgID].isArchived;

		let msgStyle = (isArchived) ? { color: 'grey', display:'inline', marginRight: '10px'} : { display: 'inline', marginRight: '10px' };
		let archivedPrefix = (isArchived) ? "(archived) " : "";
		let archiveAction = (isArchived) ? "unarchive" : "archive";
		let menuItems = (this.state.showMenu) ? {display: 'inline'} : { display: 'none'} ;
		let btnState = (isArchived) ? true : false;

		return (
				<div>
					<li style={msgStyle}>{archivedPrefix}{this.props.message}</li>
					<div style={msgStyle} onClick={this.archOrDelMsg.bind(this)}>
						<button data-action={archiveAction}>{archiveAction}</button>
						<button disabled={btnState} data-action="delete">Delete</button>
						<button disabled={btnState} data-action="moveMsg">Move</button>
					</div> 
					<span onClick={this.move.bind(this)} style={menuItems}>
						<strong>Move to: </strong> {menu}
					</span>
				</div>
		);
	}
}

const MenuItem = ({title, currentListID, newListID}) => ( 
	<span data-current={currentListID} data-new={newListID}>{title}</span>
);

ReactDOM.render(
	<Wrapper />, 
	document.getElementById('app')
);
