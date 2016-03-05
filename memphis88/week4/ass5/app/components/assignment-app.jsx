var React = require('react');

var OnPressingEnterMixin = require('../mixins/on-pressing-enter-mixin');
var GeneratedList = require('./generated-list');
var GeneratedListActions = require('../actions/list-actions');
var GeneratedListStore = require('../stores/list-store');
var MessageListActions = require('../actions/message-actions');
var MessageListStore = require('../stores/message-store');

var AssignmentApp = React.createClass({
	mixins: [
		OnPressingEnterMixin
	],

	propTypes: {
		generatedLists: React.PropTypes.array,
		listName: React.PropTypes.string,
		index: React.PropTypes.number
	},

	getInitialState: function() {
		return {
			generatedLists: GeneratedListStore.getAll(),
			listName: ''
		}
	},

	componentDidMount: function() {
		GeneratedListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		GeneratedListStore.removeChangeListener(this._onChange);
	},

	onChange: function(e) {
		this.setState({ listName: e.target.value });
	},

	_onChange: function() {
		this.setState({ 
			generatedLists: GeneratedListStore.getAll(),
			listName: ''
		});
	},

	submitNewList: function() {
		GeneratedListActions.createList(this.state.listName);
	},

	submitMessage: function(listKey, msgText) {
		if (msgText === '') { return; };
		if (this.isValidMessage(msgText)) {	
			var updatedGeneratedLists = JSON.parse(JSON.stringify(this.state.generatedLists));
			var generatedList = this.getGeneratedListFromArray(listKey, updatedGeneratedLists);
			generatedList.messageList.push({
				text: msgText,
				index: Date.now()
			});
			this.setState({	generatedLists: updatedGeneratedLists });
		}
	},

	deleteMessage: function(listKey, msgKey) {
		var updatedGeneratedLists = JSON.parse(JSON.stringify(this.state.generatedLists));
		var generatedList = this.getGeneratedListFromArray(listKey, updatedGeneratedLists);
		generatedList.messageList = generatedList.messageList.filter(function(message) {
			return message.index != msgKey;
		});
		this.setState({	generatedLists: updatedGeneratedLists });
	},

	archiveMessage: function(listKey, msgKey) {
		var updatedGeneratedLists = JSON.parse(JSON.stringify(this.state.generatedLists));
		var generatedList = this.getGeneratedListFromArray(listKey, updatedGeneratedLists);
		var msgToArchive;
		var updatedList = generatedList.messageList.filter(function(message) {
			if (message.index == msgKey) {
				msgToArchive = message;
				return false;
			}
			return true;
		});
		generatedList.messageList = updatedList;
		generatedList.archivedList.push(msgToArchive);
		this.setState({ generatedLists: updatedGeneratedLists });
	},

	extractMessage: function(listKey, msgKey) {
		var updatedGeneratedLists = JSON.parse(JSON.stringify(this.state.generatedLists));
		var generatedList = this.getGeneratedListFromArray(listKey, updatedGeneratedLists);
		var msgToExtract;
		generatedList.archivedList = generatedList.archivedList.filter(function(message) {
			if (message.index == msgKey) {
				msgToExtract = message;
				return false;
			}
			return true;
		});
		generatedList.messageList.push(msgToExtract);
		this.setState({ generatedLists: updatedGeneratedLists });
	},

	moveMessage: function(msg, oldListKey, targetListKey) {
		if (oldListKey == undefined || targetListKey == undefined || msg == undefined) { return; }
		var updatedGeneratedLists = JSON.parse(JSON.stringify(this.state.generatedLists));
		var oldList = this.getGeneratedListFromArray(oldListKey, updatedGeneratedLists);
		var targetList = this.getGeneratedListFromArray(targetListKey, updatedGeneratedLists);
		targetList.messageList.push(msg);
		oldList.messageList = oldList.messageList.filter(function(message) {
			return message.index != msg.index;
		});
		this.setState({ generatedLists: updatedGeneratedLists });
	},

	getGeneratedListFromArray: function(listKey, clonedList) {
		var generatedList = clonedList.filter(function(list) {
			return list.index == listKey;
		});
		return generatedList[0];
	},

	onClick: function() { this.submitNewList() },

	isValidMessage: function(msg) {
		if (msg.length <= 200) {
			return true;
		}
		return false;
	},

	render: function() {
		var createLists = function(generatedList) {
			return <GeneratedList 
				key={generatedList.index} 
				myListKey={generatedList.index} 
				data={generatedList}
				generatedLists={this.state.generatedLists} 
				onMoveMessage={this.moveMessage} 
				onSubmitMessage={this.submitMessage} 
				onArchiveMessage={this.archiveMessage} 
				onDeleteMessage={this.deleteMessage} 
				onExtractMessage={this.extractMessage} />
		};
		return (
			<div>
				<div className="listInput">
					<h4>Add a new list</h4>
					<input onChange={this.onChange} value={this.state.listName} onKeyDown={this.onPressingEnter} />
					<input type="button" value="Submit" onClick={this.submitNewList} />
				</div>
				<div>
					{this.state.generatedLists.map(createLists, this)}
				</div>
			</div>
		);
	}
});

module.exports = AssignmentApp;