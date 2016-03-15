var React = require('react');
var ListStore = require('../stores/list-store');
var MessageActions = require('../actions/message-actions');


var MoveMessageField = React.createClass({
	getInitialState : function(){
		return {lists : ListStore.getAllLists()}; 
	},
	handleListId: function(event){
		var listId = event.target.value.charAt(event.target.value.search(/\d/))
		this.setState({listId: listId })
	},
	submitMoveMessage : function(){
		MessageActions.moveMessage(this.state.listId, this.props.messageId)
	},
	componentDidMount : function() {
		ListStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		ListStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({lists : ListStore.getAllLists()})
	},
	render: function() {
		var listChoices = this.state.lists.map(function(list){
			return(
				<option key={list.listId} >move message to list: {list.listId + " : " + list.listName}</option>
			)
		}.bind(this));
	    return (
	      <div>
	        <p></p> 
			<select  style={{display: 'inline-block', marginRight : '10px'}} onChange={this.handleListId}>
	        	<option>Choose list</option>
	        	{listChoices}
			 </select>
			<input type="submit" value="Move Message" onClick={this.submitMoveMessage} />
        </div>
	    );
	}
});

module.exports = MoveMessageField;