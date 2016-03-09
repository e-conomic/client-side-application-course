var React = require('react');

var OnPressingEnterMixin = require('../mixins/on-pressing-enter-mixin');
var ArchiveList = require('./archive-list');
var MessageList = require('./message-list');
var MessageActions = require('../actions/message-actions');

var GeneratedList = React.createClass({
	mixins: [
		OnPressingEnterMixin
	],

	propTypes: {
		messageList: React.PropTypes.array,
		text: React.PropTypes.string,
	},

	getInitialState: function () {
		return {
			text: ''
		};
	},

	onChange: function(e) {
		this.setState({ text: e.target.value });
	},

	onClick: function() {
		MessageActions.createMessage(this.props.data.id, this.state.text);
		this.setState({
			text: ''
		});
	},

	render: function() {
		return (
			<div className="generatedLists">
				<h3>{this.props.data.name}</h3>
				<h5>Add new message</h5>
				<input type="text" onChange={this.onChange} value={this.state.text} onKeyDown={this.onPressingEnter} />
				<input type="button" value="add" onClick={this.onClick} />
				<MessageList myListKey={this.props.data.id} />
				<ArchiveList myListKey={this.props.data.id} />
			</div>
		);
	}
});

module.exports = GeneratedList;