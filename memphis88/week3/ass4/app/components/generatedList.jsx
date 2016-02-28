var React = require('react');

var OnPressingEnterMixin = require('../mixins/onPressingEnterMixin');
var ArchiveList = require('./archiveList');
var MessageList = require('./messageList');

var GeneratedList = React.createClass({
	mixins: [
		OnPressingEnterMixin
	],

	propTypes: {
		messageList: React.PropTypes.array,
		text: React.PropTypes.string,
		index: React.PropTypes.number
	},

	getInitialState: function () {
		return {
			messageList: [],
			text: ''
		};
	},

	onChange: function(e) {
		this.setState({ text: e.target.value });
	},

	onMoveMessage: function(msg, targetListKey) {
		this.props.onMoveMessage(msg, this.props.data.index, targetListKey);
	},

	onDeleteMessage: function(msgKey) {
		this.props.onDeleteMessage(this.props.data.index, msgKey);
	},

	onArchiveMessage: function(msgKey) {
		this.props.onArchiveMessage(this.props.data.index, msgKey);
	},

	onExtractMessage: function(msgKey) {
		this.props.onExtractMessage(this.props.data.index, msgKey);
	},

	onClick: function() { 
		this.props.onSubmitMessage(this.props.data.index, this.state.text);
		this.setState({
			text: ''
		})
	},

	render: function() {
		return (
			<div className="generatedLists">
				<h3>{this.props.data.name}</h3>
				<h5>Add new message</h5>
				<input type="text" onChange={this.onChange} value={this.state.text} onKeyDown={this.onPressingEnter} />
				<input type="button" value="add" onClick={this.onClick} />
				<MessageList 
					messageList={this.props.data.messageList} 
					generatedLists={this.props.generatedLists} 
					onDeleteMessage={this.onDeleteMessage} 
					onArchiveMessage={this.onArchiveMessage} 
					onMoveMessage={this.onMoveMessage} 
					myListKey={this.props.myListKey} 
				/>
				<ArchiveList archivedList={this.props.data.archivedList} onExtractMessage={this.onExtractMessage} />
			</div>
		);
	}
});

module.exports = GeneratedList;