var React = require('react');
var MessageActions = require('../actions/message-actions');

var MessageField = React.createClass({
	submitMessageDelete : function(event) {
		MessageActions.deleteMessage(this.props.messageId)
	}, 
	submitMessageArchive : function () {
		MessageActions.archiveMessage(this.props.messageId)
	},
	submitMessageUnarchive : function () {
		MessageActions.unarchiveMessage(this.props.messageId)
	},
	setOnClickAction : function () {
		this.setState({
			onClickAction : this.submitMessageDelete
		});
	},
	componentWillMount : function () {
		if(this.props.action == 'delete') {
			this.setOnClickAction(this.submitMessageDelete)
		} else if(this.props.action == 'archive'){
			this.setOnClickAction(this.archiveMessage);
		} else if(this.props.action == 'unarchive'){
			this.setOnClickAction(this.submitMessageUnarchive)
		} else {
			console.log("did not recognize action")
		}
	},
	render: function () {
		return (
			<button type="submit" style={{display: 'inline-block', marginRight : '10px'}} onClick={this.state.onClickAction}>{this.props.text}</button>
		);
	}
});

module.exports = MessageField;