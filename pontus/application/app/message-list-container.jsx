let React = require('react');
let CheckboxContainer = require('./checkbox-container');
let MessageList = require('./message-list');

let MessageActions = require('./actions/message-actions');
let MessageStore = require('./stores/message-store');

let ListActions = require('./actions/list-actions');
let ListStore = require("./stores/list-store");

let getMessageContainerState = () => { 
	return { 
		filteredMessages: MessageStore.getMessagesFilteredByListID(),
	};
}

const MessageListContainer = React.createClass({ 
	getInitialState() { 
		return getMessageContainerState();
	},

	componentDidMount() { 
		MessageStore.addChangeListener(this._onChange) 
	},

	componentWillUnmount() { 
		MessageStore.removeChangeListener(this._onChange);
	},

	componentWillMount() { 
		this.setState( getMessageContainerState());
	},

	render() { 

		let messageList = <MessageList filteredMessages={this.state.filteredMessages} listName={this.props.listName} listProperties={this.props.listProperties} />;

		let listStyle = { listStyle: 'none' };                 
		
		let MessageListContainerStyle = { 
			display: 'flex'
		};

		let messagesStyle = { 
			display: 'flex',
			flexDirection: 'column',
			flex: 0.2
		};

		return ( 
				<div style={MessageListContainerStyle}>
					<div style={messagesStyle}>
						<h2>Messages:</h2>

						{ messageList }

					</div>
				</div>
		);
	},

	_onChange() { 
		this.setState( getMessageContainerState());
	}

});

module.exports = MessageListContainer
