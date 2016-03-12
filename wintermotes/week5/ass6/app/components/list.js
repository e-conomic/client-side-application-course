var React = require('react');
var Messages = require('./message').Messages
var Message = require('./message').Message 
var ArchivedMessages = require('./message').ArchivedMessages
var ArchivedMessage = require('./message').ArchivedMessage
var ListCheckboxes = require('../components/fields').ListCheckboxes
var FilteredMessages = require('../components/message').FilteredMessages
var ListStore = require('../stores/list-store')
var ListActions = require('../actions/list-actions');

function getAllLists(){
	return ListStore.getAllLists()
}

function getFilteredLists(){
	var lists = ListStore.getAllLists()
	var filteredLists = []
	for(var i = 0; i<lists.length; i++){
		if(lists[i].visible == true)
			filteredLists.push(lists[i])
	}
	return filteredLists
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
			filteredLists : getFilteredLists()
		}
	},
	componentDidMount : function() {
		ListStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		ListStore.removeChangeListener(this._onChange);
	},
	handleCheckboxChange : function(event){
		this.filterList(event.target.value, event.target.checked)
	},
	_onChange : function(){
		this.setState({filteredLists : getFilteredLists()})
	},
	filterList : function(listId, checked){
		ListActions.updateFilter(listId, !checked)
	},
	render : function(){
	var listStyle = {
		border: '1px solid red',
		margin: '24px 0 24px 0'
	}
	var messages = this.state.filteredLists.map(function(list){
		return(
			<div>
				<Messages listId={list.listId} />
			</div>
		)
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