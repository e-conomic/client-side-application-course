let React = require('react');

let Message = require('./message');
let ListActions = require('./list-actions');
let ListStore = require("./list-store");

let MessageStore = require('./message-store');
let MessageActions = require('./message-actions');


const MessageContainer = React.createClass({ 

	render() { 
		let listCheckboxes = this.props.lists.map( list => list.listName )
			.map(listName => <li><input type="checkbox"/>{listName}</li> );


                                                                             

		let messages = this.props.messages.map( message => { 
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

                       

		let listStyle = { 
			// display: 'inline', 
			listStyle: 'none'
		};                 
		
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
	}
});

module.exports = MessageContainer;
