let React = require('react');
let Message = require('./message');

// order of validation / message stores matter...
let MessageActions = require('./actions/message-actions');
let ErrorStore = require('./stores/error-store');
let MessageStore = require('./stores/message-store');

const NamedList = React.createClass({ 
	propTypes: { 
		listID: React.PropTypes.number,
		listName: React.PropTypes.string,
		messages: React.PropTypes.arrayOf(React.PropTypes.object),
		listProperties: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState() {
		return { 
			charCount: 200,
			displayChars: false,
			isError: false,
			errorMsg: ""
		};
	},

	createMsg(e) { 
		if (e.keyCode == 13 || e.which == 13 || e.type == 'click') { 
			let text = this.refs.inputField.value;

			MessageActions.createMessage(this.props.listID, text, this.props.allMessages);

			if (true) { 
				this.refs.inputField.value = "";
				this.refs.inputField.focus();
				this.setState({ charCount: 200 });
			}
		}
	},

	displayCharCount() { 
		this.setState({ displayChars: !this.state.displayChars }); 
	},

	charValidation() { 
		let charCount = 200 - this.refs.inputField.value.length;

		if (charCount < 0) this.setState({ isError: true, errorMsg: "out of characters." });
		else this.setState({ isError: false, errorMsg: "" }) 

		this.setState({ charCount });
	},

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
				translatedMessage={message.translatedMessage}
				isArchived={message.isArchived} 
				listProperties={this.props.listProperties}
				listName={this.props.listName}
			/> ;
		});

		let errorMessageColor =  (this.state.isError) ? { color: 'red' } : { color: 'black'};
		let displayCharsStyle = (this.state.displayChars) ? {display: 'inline'} : {display: 'none' };

		return (
			<div>
				<h2>{this.props.listName}</h2>
				<ul>
					{messages}
				</ul> 
				<input onKeyDown={this.createMsg} onBlur={this.displayCharCount} onFocus={this.displayCharCount} onKeyUp={this.charValidation} ref='inputField' type="text" />
				<button onClick={this.createMsg}>Create New Message</button>
				<div style={errorMessageColor}>
					<span style={displayCharsStyle}> {this.state.charCount} </span>
					<span>{this.state.errorMsg}</span>
				</div>
				<br/>
			</div>
		);
	}
});

module.exports = NamedList;
