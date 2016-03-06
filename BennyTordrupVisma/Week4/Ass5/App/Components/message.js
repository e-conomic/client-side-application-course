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
        var otherLists = ListStore.getAll().filter(l => l.id != this.props.message.list).map((list, index) => {
            return <option key={list.id} value={list.id}>{list.name}</option>
        });
                         
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
                                                <select ref="newList">{otherLists}</select>
												<button onClick={this.handleMoveMessage}>Move</button>
                                                <button onClick={this.handleHideListSelection}>Cancel</button>
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
    
    handleHideListSelection: function() {
        this.setState({
            listSelectionVisible: false
        })
    },
	
	handleMoveMessage: function() {
        MessageActions.moveMessage(this.props.message.id, this.refs.newList.value);
        this.setState({
            listSelectionVisible: false
        })
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
