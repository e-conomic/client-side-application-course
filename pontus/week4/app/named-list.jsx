let React = require('react');
let Message = require('./message');

let NamedList = React.createClass({ 
	propTypes: { 
		listID: React.PropTypes.number,
		listName: React.PropTypes.string,
		createMsg: React.PropTypes.func,
		archiveMsg: React.PropTypes.func,
		moveMsg: React.PropTypes.func,
		deletesg: React.PropTypes.func,
		messages: React.PropTypes.arrayOf(React.PropTypes.object),
		listProperties: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getInitialState() {
		return { 
			charCount: 200,
			isError: false,
			errorMsg: "",
			displayChars: false
		};
	},

	createMsg(e) { 
		if (e.keyCode == 13 || e.which == 13 || e.type == 'click') { 
			let text = this.refs.inputField.value;
			this.props.createMsg(this.props.listID, text);
			this.refs.inputField.value = "";
			this.refs.inputField.focus();
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
				isArchived={message.isArchived} 
				listProperties={this.props.listProperties}
				listName={this.props.listName}
				archiveMsg={this.props.archiveMsg} 
				moveMsg={this.props.moveMsg}
				deleteMsg={this.props.deleteMsg}
			/> ;
		});

		let errorMsg =  (this.state.isError) ? { color: 'red' } : { color: 'black'};
		let btnState = (this.state.isError) ? true : false;
		let displayChars = (this.state.displayChars) ? {display: 'inline'} : {display: 'none' };

		return (
			<div>
				<h2>{this.props.listName}</h2>
				<ul>
					{messages}
				</ul> 
				<input onBlur={this.displayCharCount} onKeyDown={this.createMsg} onFocus={this.displayCharCount} onKeyUp={this.charValidation} ref='inputField' type="text" />
				<button disabled={btnState} onClick={this.createMsg}>Create New Message</button>
				<br/>
				<div style={errorMsg}>
					<span style={displayChars}> {this.state.charCount} </span>
					<span>{this.state.errorMsg}</span>
				</div>
			</div>
		);
	}
});


module.exports = NamedList;
