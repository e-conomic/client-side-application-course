var React = require('react');
var ListStore = require('../stores/list-store');
var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions');

var Message = require('./message')
var ListCheckboxes = require('../components/list-checkboxes');

var listStyle = {
	border: '1px solid red',
	margin: '24px 0 24px 0'
}

var FilteredList = React.createClass({
	getInitialState : function () {
		return {
			lists : ListStore.getAllLists(),
			messages : MessageStore.getMessagesFromFilters()
		}
	},
	handleCheckboxChange : function(event){
		if(event.target.checked)
			MessageActions.addListFilter(event.target.value)
		else if(!event.target.checked)
			MessageActions.removeListFilter(event.target.value)
	},
	componentDidMount : function() {
		ListStore.addChangeListener(this._onChange);
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		ListStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({
			lists : ListStore.getAllLists(),
			messages : MessageStore.getMessagesFromFilters()
		})
	},
	render : function(){
	var messages = this.state.messages.map(function(message){
		if(message.archived == false){
			return(<Message key={message.messageId} messageId={message.messageId} content={message.content} archived={false} />)
		} else {
			return(<Message key={message.messageId} messageId={message.messageId} content={message.content} archived={true} />)
		}
	});
	return (
		<div style={listStyle}>
			<h2>FilteredList, outputting the filtered messages and checkboxes</h2>
			<ListCheckboxes lists={this.state.lists} onCheckboxChange={this.handleCheckboxChange} />		
			{messages}
		</div>
	);
	}
});

module.exports = FilteredList;