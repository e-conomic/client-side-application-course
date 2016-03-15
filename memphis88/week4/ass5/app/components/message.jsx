var React = require('react');

var Message = React.createClass({
	render: function() {
		return <span>{this.props.text}</span>;
	}
});

module.exports = Message;