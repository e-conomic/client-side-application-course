let React = require('react');
let Message = require('./message');
let MessageActions = require('./message-actions');
let MessageStore = require('./message-store');

let ValidationActions = require('./validation-actions');

// The Dispatcher doesn't get the action if this store is not here. Why?? The store isn't used here?
let ValidationStore = require('./validation-store');

let NamedList = React.createClass({ 
	propTypes: { 
		listID: React.PropTypes.number,
		listName: React.PropTypes.string,
		messages: React.PropTypes.arrayOf(React.PropTypes.object),
		listProperties: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	// getInitialState() {
	// 	return { 
			// charCount: 200,
			// isError: false,
			// errorMsg: "",
			// displayChars: false
	// 	};
	// },

	createMsg(e) { 
		if (e.keyCode == 13 || e.which == 13 || e.type == 'click') { 
			let text = this.refs.inputField.value;

			// MessageActions.createMessage(this.props.listID, text);

			console.log('named-list createMsg');

			ValidationActions.validateMessage(text) 

			this.refs.inputField.value = "";
			this.refs.inputField.focus();
		}
	},

	// displayCharCount() { 
	// 	this.setState({ displayChars: !this.state.displayChars }); 
	// },

	// charValidation() { 
	// 	let charCount = 200 - this.refs.inputField.value.length;
   //
	// 	if (charCount < 0) this.setState({ isError: true, errorMsg: "out of characters." });
	// 	else this.setState({ isError: false, errorMsg: "" }) 
   //
	// 	this.setState({ charCount });
	// },

 	render() {
		let archivedMessages = this.props.messages.filter( message => message.isArchived );

		let allMessages = this.props.messages
			.filter( message =>  !message.isArchived )
			.concat(archivedMessages);

		let messages = allMessages.map( (message) => {
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

		// let errorMessageColor =  (this.state.isError) ? { color: 'red' } : { color: 'black'};
		// let isDisabled = (this.state.isError) ? true : false;
		// let displayCharsStyle = (this.state.displayChars) ? {display: 'inline'} : {display: 'none' };

		// OLD VALIDATION
				// <div style={errorMessageColor}>
				// 	<span style={displayCharsStyle}> {this.state.charCount} </span>
				// 	<span>{this.state.errorMsg}</span>
				// </div>

				// <input onBlur={this.displayCharCount} onKeyDown={this.createMsg} onFocus={this.displayCharCount} onKeyUp={this.charValidation} ref='inputField' type="text" />
		return (
			<div>
				<h2>{this.props.listName}</h2>
				<ul>
					{messages}
				</ul> 
				<input onKeyDown={this.createMsg} ref='inputField' type="text" />
				<button onClick={this.createMsg}>Create New Message</button>
				<br/>
			</div>
		);
	},
});

module.exports = NamedList;
