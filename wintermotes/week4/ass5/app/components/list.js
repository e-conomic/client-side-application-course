var React = require('react');
var Messages = require('./message').Messages
var Message = require('./message').Message 
var ArchivedMessages = require('./message').ArchivedMessages
var ArchivedMessage = require('./message').ArchivedMessage

var List = React.createClass({		
			render: function() {
				var listStyle = {
					border: '2px solid black',
					margin: '48px 0 0 0'
				}
				return(
					<div style={listStyle}>
						<p><b>ListID: {this.props.data.listId} | ListName: {this.props.data.listName} |</b></p>
						<Messages listId={this.props.data.listId}/>
						<ArchivedMessages listId={this.props.data.listId}/>
					</div>
				);
			}
		});

module.exports = List;