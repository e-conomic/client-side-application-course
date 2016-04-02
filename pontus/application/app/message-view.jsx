let React = require('react');
let CheckboxContainer = require('./checkbox-container');
let MessageListContainer = require('./message-list-container');
let MessageList = require('./message-list');
let MessageActions = require('./actions/message-actions');
let MessageStore = require('./stores/message-store');
let ListActions = require('./actions/list-actions');
let ListStore = require("./stores/list-store");

const MessageView = React.createClass({ 

	propTypes: { 
		lists: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	render() { 
		let messageContainer = <MessageListContainer />;
		let checkboxContainer = this.props.lists.map(list => { 
		  return <CheckboxContainer key={list.listID} listID={list.listID} listName={list.listName} />;
		});

		let checkboxContainerStyle = { display: 'flex' };
		let messageViewStyle = { display: 'flex' };
		let listStyle = { listStyle: 'none' };                 

		let messageContainerStyle = { 
			display: 'flex',
			flexDirection: 'column',
			flex: 0.2
		};

		return ( 
				<div style={messageViewStyle}>
					<div style={messageContainerStyle}>
						{ messageContainer }
					</div>

					<div style={checkboxContainerStyle} >
						<h3>Lists</h3>
						<ul style={listStyle}>
							{ checkboxContainer }
						</ul>
					</div>
				</div>
		);
	}
});

module.exports = MessageView;
