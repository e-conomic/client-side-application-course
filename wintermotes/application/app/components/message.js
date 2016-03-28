var React = require('react');

var MessageField = require('../components/message-field');
var MoveMessageField = require('../components/move-message-field');

var style= {
	marginTop : '60px', 
	border : '1px solid blue'
}

var archivedStyle = {
	color : 'gray', 
	margin: '48px 0 0 0'
}

var Message = React.createClass({
	render: function() {
		if(this.props.archived){
			return(
				<div style={archivedStyle} key={this.props.messageId}>
			        <p>id: {this.props.messageId} | text: {this.props.content}</p>
			        <MessageField action='unarchive' text='unarchive' messageId={this.props.messageId}/>
				</div>
			);
		} 

	    return (
		    <div style={style}>
		        <p>id: {this.props.messageId} | text: {this.props.content}</p>
		        <MessageField action='delete' text='delete' messageId={this.props.messageId}/>
		        <MessageField action='archive' text='archive' messageId={this.props.messageId}/>
				<MoveMessageField messageId={this.props.messageId} />
		    </div>
	    );
	}
});

module.exports = Message