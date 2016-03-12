let React = require('react');
let Message = require('./message');
let Checkbox = require('./checkbox');

let MessageActions = require('./message-actions');
let MessageStore = require('./message-store');

let ListActions = require('./list-actions');
let ListStore = require("./list-store");

let getMessageContainerState = () => { 
	return { 
		filteredMessages: MessageStore.getMessagesFilteredByListID(),
	};
}

const MessageContainer = React.createClass({ 
	getInitialState() { 
		return getMessageContainerState();
	},

	componentDidMount() { 
		MessageStore.addChangeListener(this._onChange) 
	},

	componentWillUnmount() { 
		MessageStore.removeChangeListener(this._onChange);
	},

	render() { 

		let listCheckboxes = this.props.lists.map(list => { 
		  return <Checkbox key={list.listID} listID={list.listID} listName={list.listName} />;
		});

		let filteredMessages = this.state.filteredMessages || [];

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

		let checkboxesStyle = { 
			display: 'flex'
		};

		let messagesStyle = { 
			display: 'flex',
			flexDirection: 'column',
			flex: 0.2
		};

		return ( 
				<div style={MessageContainerStyle}>
					<div style={messagesStyle}>
						<h2>Messages:</h2>
						{ messages } 
					</div>

					<div style={checkboxesStyle} >
						<h3>Lists</h3>
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
