let React = require('react');
let Message = require('./message');

let MessageActions = require('./message-actions');
let MessageStore = require('./message-store');

let ListActions = require('./list-actions');
let ListStore = require("./list-store");



let getMessageContainerState = () => { 
	console.log('getMessageContainerState running');
	return { 
		filteredMessages: MessageStore.getMessagesFilteredByListID(),
	};
}

const MessageContainer = React.createClass({ 

	getInitialState() { 
		return getMessageContainerState();
	},

	handleClick(e) {
		let listID = e.target.value;

		MessageActions.addListIDToFilter(listID);
	},

	componentDidMount() { 
		MessageStore.addChangeListener(this._onChange) 
	},

	componentWillUnmount() { 
		MessageStore.removeChangeListener(this._onChange);
	},

	render() { 

		let listCheckboxes = this.props.lists.map(list => { 
		  return <li><input type="checkbox" value={list.listID} onClick={this.handleClick} />{list.listName}</li> 
		});

		let filteredMessages = this.state.filteredMessages || [];

		console.log(this.state.filteredMessages);
		let messages = filteredMessages.map( message => { 
			return <Message 
				key={message.messageID}
				listID={message.listID} 
				messageID={message.messageID} 
				text={message.text} 
				isArchived={message.isArchived} 
				listProperties={this.props.listProperties}
				listName={this.props.listName}
			/> ;
		});

		let listStyle = { listStyle: 'none' };                 
		
		let MessageContainerStyle = { 
			display: 'flex'
		};

		let messagesStyle = { 
			display: 'flex',
			flexDirection: 'column'
		};

		return ( 
				<div style={MessageContainerStyle}>
					<div style={messagesStyle}>
						<h2>Messages:</h2>
						{ messages } 
					</div>

					<div>
						<ul style={listStyle}>
							{ listCheckboxes }
						</ul>
					</div>
				</div>
		);
	},

	_onChange() { 
		this.setState( getMessageContainerState());
	}

});

module.exports = MessageContainer;
