let React = require('react');
let MenuItem = require('./menu-item');
let MessageActions = require('./actions/message-actions');
let TranslatedComponent = require('./translated-component');

let ListStore = require("./stores/list-store"); 

let Message = React.createClass({ 
	propTypes: { 
		listID: React.PropTypes.number,
		messageID: React.PropTypes.number,
		listName: React.PropTypes.string,
		isArchived: React.PropTypes.bool,
		listProperties: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	moveMessage() {
		let currentListID = this.props.listID;
		let chosenListID = this.refs.menu.options[this.refs.menu.selectedIndex].value;
		let messageID = this.props.messageID;

		if (chosenListID === 'move to' || chosenListID == currentListID) return;
		else MessageActions.moveMessage(chosenListID, messageID)
	},

	archiveMessage() { 
		MessageActions.archiveMessage(this.props.messageID);
	},

	deleteMessage() {
		MessageActions.deleteMessage(this.props.messageID);
	},

	render() {
		let isArchived = this.props.isArchived;
		let msgStyle = (isArchived) ? { color: 'grey', display:'inline', marginRight: '10px'} : { display: 'inline', marginRight: '10px' };
		let archiveAction = (isArchived) ? "unarchive" : "archive";
		let isDisabled = (isArchived) ? true : false;

		let listItems = [];
		for (let key in this.props.listProperties) { 
			let list = this.props.listProperties[key];
			listItems.push(<MenuItem key={list.listID} listID={list.listID} listName={list.listName} />);
		}

		return (
				<div>
					<li style={msgStyle}>{this.props.text}</li><TranslatedComponent translatedMessage={this.props.translatedMessage} />
					<div style={msgStyle}>
						<button onClick={this.archiveMessage}>{archiveAction}</button>
						<button onClick={this.deleteMessage} disabled={isDisabled}>Delete</button>
						<select disabled={isDisabled} ref="menu" defaultValue="move to">
							<option value="move to">Move to</option>
							{listItems} 
						</select>
						<button disabled={isDisabled} onClick={this.moveMessage}>Move</button>
					</div> 
				</div>
		);
	},
}); 

module.exports = Message;
