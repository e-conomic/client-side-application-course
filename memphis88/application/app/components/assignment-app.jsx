var React = require('react');

var GeneratedList = require('./generated-list');
var FilteredMessageList = require('./filtered-message-list');
var NotificationBar = require('./notification-bar').default;
var ValidationStore = require('../stores/validation-store');
var LanguageSelector = require('./language-selector');

var ListActions = require('../actions/list-actions');
var ListStore = require('../stores/list-store');
var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions');


var AssignmentApp = React.createClass({
	propTypes: {
		generatedLists: React.PropTypes.array
	},

	getInitialState: function() {
		var status = ValidationStore.getStatus();
		return {
			generatedLists: ListStore.getAll(),
			sortedMessages: MessageStore.getAllSorted(),
			isError: status.isError,
			message: status.message,
			isHidden: true
		}
	},

	componentDidMount: function() {
		ListStore.addChangeListener(this._onChange);
		ValidationStore.addChangeListener(this._onChange);
		MessageStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ListStore.removeChangeListener(this._onChange);
		ValidationStore.removeChangeListener(this._onChange);
		MessageStore.removeChangeListener(this._onChange);
	},

	onPressingEnter: function(e) {
		if (e.keyCode == 13) { this.submitNewList() };
	},

	_onChange: function() {
		var status = ValidationStore.getStatus();
		this.setState({
			generatedLists: ListStore.getAll(),
			sortedMessages: MessageStore.getAllSorted(),
			isError: status.isError,
			message: status.message,
			isHidden: (status.message!="")? false : true
		});
	},

	submitNewList: function() {
		ListActions.createList(this.refs.listName.value);
		this.refs.listName.value = '';
	},

	dismishNotificationBar: function() {
		this.setState({ isHidden: true });
	},

	onLanguageSelect: function(e) {
		MessageActions.translateMessages(e.target.value);
	},

	render: function() {
		var createLists = function(generatedList) {
			return <GeneratedList
				key={generatedList.id}
				data={generatedList} />
		};
		return (
			<div>
				<NotificationBar
					isError={this.state.isError}
					message={this.state.message}
					onDismissed={this.dismishNotificationBar}
					isHidden={this.state.isHidden} />
				<div className="listInput">
					<h4>Add a new list</h4>
					<input ref="listName" onKeyDown={this.onPressingEnter} />
					<input type="button" value="Submit" onClick={this.submitNewList} />
				</div>
				<div>
					{this.state.generatedLists.map(createLists, this)}
				</div>
				<FilteredMessageList
					generatedLists={this.state.generatedLists}
					sortedMessages={this.state.sortedMessages} />
				<LanguageSelector onChange={this.onLanguageSelect} />
			</div>
		);
	}
});

module.exports = AssignmentApp;