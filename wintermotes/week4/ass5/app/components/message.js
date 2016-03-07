var React = require('react');

var Messages = React.createClass({
	render: function() {
		return(
			<div>
				Messages from store: 
			</div>
		);
		
	}
});

var ArchivedMessage = React.createClass({
	handleMessageUnarchive : function(){
		//this.props.onMessageUnarchive(this.props.listId, this.props.messageId)
	},
	render : function() {
		var boolToString = this.props.archived.toString() 
		return(
			<span>
				<input style={{float : 'right'}} type="submit" value="Unarchive Message" onClick={this.handleMessageUnarchive} />
				<p> Archived Message goes here: </p>
			</span>
		);
	}
});

var ArchivedMessages = React.createClass({
	render : function () {
		// Question 4: how to achieve "border-top" property without causing a syntax? 
		var archiveStyle = {
			margin: '48px 0 0 0',
			color: 'gray'
		}
		//var unarchiveFunction = this.props.onMessageUnarchive
		return (
			<div style={archiveStyle}>
				<p><b>Archived Messages: </b></p>
			</div>
		);
	}
});

var Message = React.createClass({
	render: function() {
		//var boolToString = this.props.archived.toString() 
	    return (
	        <p> Message goes here: </p>
	    );
	}
});

module.exports = {Message, Messages, ArchivedMessages, ArchivedMessage};