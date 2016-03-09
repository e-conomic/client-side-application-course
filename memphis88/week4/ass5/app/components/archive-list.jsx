var React = require('react');

var Message = require('./message');
var ArchiveListStore = require('../stores/archive-message-store');
var MessageActions = require('../actions/message-actions');

var ArchiveList = React.createClass({

	getInitialState: function() {
		return {
			messages: ArchiveListStore.getAllForList(this.props.myListKey)
		}
	},

	handleMessageExtract: function(msgId) {
		MessageActions.extractMessage(msgId);
	},

	componentDidMount: function() {
		ArchiveListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ArchiveListStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({
			messages: ArchiveListStore.getAllForList(this.props.myListKey)
		});
	},

	render: function() {
		var createMessage = function(msg) {
			return (
				<tr key={msg.id}>
					<td><Message text={msg.message} /></td>
					<td><input type="button" value="Extract" onClick={this.handleMessageExtract.bind(this, msg.id)} /></td>
				</tr>
			);
		};
		return (
			<table>
				<thead><tr><td colSpan="2">{"---Archive---"}</td></tr></thead>
				<tbody>
					{this.state.messages.map(createMessage, this)}
				</tbody>
			</table>
		);
	}
});

module.exports = ArchiveList;