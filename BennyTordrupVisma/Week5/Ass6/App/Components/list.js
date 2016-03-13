var React = require("react");
var Message = require("./message");

var List = React.createClass({
	render: function() {
		var activeMessageList = this.props.messages.filter(e => !e.isArchived).map((message) => {
			return <Message key={message.id} 
							message={message} />
		});
		var archivedMessageList = this.props.messages.filter(e => e.isArchived).map((message) => {
			return <Message key={message.id} 
							message={message} />
		});
		
		return 	<div className="list">
					<h4>{this.props.list.name}</h4>
					<div>
						{activeMessageList}
					</div>
					<h5>Archived messages</h5>
					<div>
						{archivedMessageList}
					</div>
				</div>
	},
	
});

module.exports = List;