var React = require('react');
var Messages = require('./message').Messages
var Message = require('./message').Message 
var ArchivedMessages = require('./message').ArchivedMessages
var ArchivedMessage = require('./message').ArchivedMessage
var ListCheckboxes = require('../components/list-checkboxes')

var ListStore = require('../stores/list-store')
var ListActions = require('../actions/list-actions');

var MessageStore = require('../stores/message-store')
var MessageActions = require('../actions/message-actions');

function getAllLists(){
	return ListStore.getAllLists()
}

function getMessagesFromFilters(filters){
	return MessageStore.getMessagesFromFilters(filters)
}

function getFilterState(){
	return {
		lists : getAllLists(), 
		messages : getMessagesFromFilters()
	}
}

var List = React.createClass({		
	render: function() {
		var listStyle = {
			border: '1px solid black',
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

var FilteredList = React.createClass({
	getInitialState : function () {
		return {
			lists : getAllLists(),
			messages : getMessagesFromFilters()
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
		this.setState(getFilterState())
	},
	render : function(){
	var listStyle = {
		border: '1px solid red',
		margin: '24px 0 24px 0'
	}
	var messages = this.state.messages.map(function(message){
		if(message.archived == false){
			return(<Message key={message.messageId} messageId={message.messageId} content={message.content}/>)
		} else {
			return (<ArchivedMessage key={message.messageId} messageId={message.messageId} content={message.content}/>)
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

module.exports = {List, FilteredList};