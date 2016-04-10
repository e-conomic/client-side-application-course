var React = require('react');

var Message = require('./message');

var TranslatedMessage = React.createClass({
	render: function() {
		var renderMessages = function(msg) {
			var style = {backgroundColor: msg.color};
			return <tr key={msg.id} style={style}><td>{msg.message}</td></tr>;
		};
		return <table><tbody>{this.props.messages.map(renderMessages)}</tbody></table>;
	}
});

module.exports = TranslatedMessage;