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
		this.props.onMoveMessage(this.props.message, this.refs.newList.value);
		this.setState({
			listSelectionVisible: false
		})
	},
	
	handleDelete: function() {
		this.props.onDeleteMessage(this.props.message);
	},
	
	handleArchive: function() {
		this.props.onArchiveMessage(this.props.message);
	},
	
	handleUnarchive: function() {
		this.props.onUnarchiveMessage(this.props.message);
	}
})
