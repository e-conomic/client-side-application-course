let React = require('react');

let Message = require('./message');
let ListActions = require('./list-actions');
let ListStore = require("./list-store");

let MessageStore = require('./message-store');
let MessageActions = require('./message-actions');


const MessageContainer = React.createClass({ 

	render() { 
		let listsForFilter = this.props.lists.map( list => { 
			return list.listName;
		});

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

		// let messages = this.props.messages.filter( message => { 
      //
      //
		// 	this.props.filterIDs.filter( filterID => { 
		// 		return message.messageID == this.props.filterIDs;
		// 	});
		// });

		//
                       

		let listCheckboxesStyle = { 
			display:'flex'
		};
			
						// {listsForFilter}
					// { messages } 
		return ( 
				<div>
				hello world.
				</div>
		);
	}
});

module.exports = MessageContainer;
