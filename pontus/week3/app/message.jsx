let React = require('react');
let MenuItem = require('./menu-item');

let Message = React.createClass({ 

	propTypes: { 
		listID: React.PropTypes.number,
		messageID: React.PropTypes.number,
		listName: React.PropTypes.string,
		createMsg: React.PropTypes.func,
		archiveMsg: React.PropTypes.func,
		moveMsg: React.PropTypes.func,
		deletesg: React.PropTypes.func,
		isArchived: React.PropTypes.bool,
		listProperties: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState() { 
		return { 
			isArchived: false, 
			showMenu: false 
		};
	},

	moveMessage(e) {
		e.preventDefault();

		let currentListID = this.props.listID;
		let chosenListID = this.refs.menu.options[this.refs.menu.selectedIndex].value;
		let messageID = this.props.messageID;

		if (chosenListID === 'move to' || chosenListID == currentListID) return;
		else this.props.moveMsg(chosenListID, messageID); 
	},

	archiveMessage(e) { 
		this.props.archiveMsg(this.props.listID, this.props.messageID);
	},

	deleteMessage(e) {
		this.props.deleteMsg(this.props.listID, this.props.messageID);  
	},

	render() {
		let isArchived = this.props.isArchived;
		let msgStyle = (isArchived) ? { color: 'grey', display:'inline', marginRight: '10px'} : { display: 'inline', marginRight: '10px' };
		let archiveAction = (isArchived) ? "unarchive" : "archive";
		let btnState = (isArchived) ? true : false;

		let listItems = [];
		for (let key in this.props.listProperties) { 
			let list = this.props.listProperties[key];
			listItems.push(<MenuItem key={list.listID} listID={list.listID} listName={list.listName} />);
		}

		return (
				<div>
					<li style={msgStyle}>{this.props.text}</li>
					<div style={msgStyle}>
						<button onClick={this.archiveMessage}>{archiveAction}</button>
						<button onClick={this.deleteMessage} disabled={btnState}>Delete</button>
						<select disabled={btnState} ref="menu" defaultValue="move to">
							<option value="move to">Move to</option>
							{listItems} 
						</select>
						<button disabled={btnState} onClick={this.moveMessage}>Move</button>
					</div> 
				</div>
		);
	}
}); 



module.exports = Message;
