let React = require('react');
let Message = require('./message');

const MessageList = React.createClass({ 

	render() { 

		let messages = this.props.filteredMessages.map( message => { 
			return <Message 
				key={message.messageID}
				listID={message.listID} 
				messageID={message.messageID} 
				text={message.text} 
				isArchived={message.isArchived} 
				listProperties={this.props.listProperties}
			/> ;
		});

		return <div> { messages } </div>;
	}
});

module.exports = MessageList;
