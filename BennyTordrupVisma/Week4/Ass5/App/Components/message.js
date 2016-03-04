var MessageActions = require("../Actions/message-actions");
var ListStore = require("../Stores/list-store");
var React = require("react");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			listSelectionVisible : false
		}
	},
	
	render: function() {
		var archivedMessage =	<div className="archived-message">
									{this.props.message.id}. {this.props.message.text}
									<button onClick={this.handleUnarchive}>Unarchive</button>
								</div>	
								
		var nonArchivedMessage =	<div>
										{this.props.message.id}. {this.props.message.text}
										<button onClick={this.handleArchive}>Archive</button>
										<button onClick={this.handleDelete}>Delete</button>
										{!this.state.listSelectionVisible && <button onClick={this.handleShowListSelection}>Move</button>}
										{this.state.listSelectionVisible &&
											<div>
												<label>New list: </label>
												<input type="text" ref="newList" />
												<button onClick={this.handleMoveMessage}>Move</button>
											</div>}
									</div>
									
		return	<div>
					{this.props.message.isArchived ? archivedMessage : nonArchivedMessage}
				</div>
		
	},
	
	handleShowListSelection: function() {
		this.setState({
			listSelectionVisible: true
		})
	},
	
	handleMoveMessage: function() {
        var list = ListStore.getByName(this.refs.newList.Value);
        if (list) {
            MessageActions.moveMessage(this.props.message.id, list.id);
        };
	},
	
	handleDelete: function() {
        MessageActions.deleteMessage(this.props.message.id);
	},
	
	handleArchive: function() {
        MessageActions.toggleIsArchived(this.props.message.id);
	},
	
	handleUnarchive: function() {
        MessageActions.toggleIsArchived(this.props.message.id);
	}
})
