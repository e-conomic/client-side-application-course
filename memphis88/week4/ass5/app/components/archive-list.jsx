var React = require('react');

var Message = require('./message');

var ArchiveList = React.createClass({
	handleMessageExtract: function(key) {
		this.props.onExtractMessage(key);
	},

	render: function() {
		var createMessage = function(msg) {
			return (
				<tr key={msg.index}>
					<td><Message text={msg.text} /></td>
					<td><input type="button" value="Extract" onClick={this.handleMessageExtract.bind(this, msg.index)} /></td>
				</tr>
			);
		};
		return (
			<table>
				<thead><tr><td colSpan="2">{"---Archive---"}</td></tr></thead>
				<tbody>
					{this.props.archivedList.map(createMessage, this)}
				</tbody>
			</table>
		);
	}
});

module.exports = ArchiveList;