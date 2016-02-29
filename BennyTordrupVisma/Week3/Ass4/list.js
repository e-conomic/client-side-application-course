var Message = require("./message");

module.exports = React.createClass({
	render: function() {
		var that = this;
		var activeMessageList = this.props.list.messages.filter(e => !e.isArchived).map(function(message, index) {
			return <Message key={index} 
							message={message} 
							onArchiveMessage={that.archiveMessage} 
							onDeleteMessage={that.deleteMessage}
							onUnarchiveMessage={that.unarchiveMessage} 
							onMoveMessage={that.moveMessage} />
		});
		var archivedMessageList = this.props.list.messages.filter(e => e.isArchived).map(function(message, index) {
			return <Message key={index} 
							message={message} 
							onArchiveMessage={that.archiveMessage} 
							onDeleteMessage={that.deleteMessage}
							onUnarchiveMessage={that.unarchiveMessage} />
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
	
	moveMessage: function(message, newListName)	{
		this.props.onMoveMessage(message, this.props.list, newListName);
	},
	
	deleteMessage: function(message) {
		this.props.onDeleteMessage(message, this.props.list);
	},
	
	archiveMessage: function(message) {
		this.props.onArchiveMessage(message, this.props.list);
	},
	
	unarchiveMessage: function(message) {
		this.props.onUnarchiveMessage(message, this.props.list);
	},
});