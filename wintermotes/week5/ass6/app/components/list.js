var React = require('react');
var MessageContainer = require('./message-container');
var listStyle = {
	border: '1px solid black',
}

var List = React.createClass({		
	render: function() {
		return(
			<div style={listStyle}>
				<p><b>ListID: {this.props.listId} | ListName: {this.props.listName} |</b></p>
				<MessageContainer listId={this.props.listId} archived={false}/>
				<MessageContainer listId={this.props.listId} archived={true} />
			</div>
		);
	}
});

module.exports = List;