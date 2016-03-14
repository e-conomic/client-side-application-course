var React = require('react');

var GeneratedList = require('./generated-list');
var ListActions = require('../actions/list-actions');
var ListStore = require('../stores/list-store');
var FilteredMessageList = require('./filtered-message-list');

var AssignmentApp = React.createClass({
	propTypes: {
		generatedLists: React.PropTypes.array
	},

	getInitialState: function() {
		return {
			generatedLists: ListStore.getAll()
		}
	},

	componentDidMount: function() {
		ListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ListStore.removeChangeListener(this._onChange);
	},

	onPressingEnter: function(e) {
		if (e.keyCode == 13) { this.submitNewList() };
	},

	_onChange: function() {
		this.setState({
			generatedLists: ListStore.getAll()
		});
	},

	submitNewList: function() {
		ListActions.createList(this.refs.listName.value);
		this.refs.listName.value = '';
	},

	render: function() {
		var createLists = function(generatedList) {
			return <GeneratedList
				key={generatedList.id}
				data={generatedList} />
		};
		return (
			<div>
				<div className="listInput">
					<h4>Add a new list</h4>
					<input ref="listName" onKeyDown={this.onPressingEnter} />
					<input type="button" value="Submit" onClick={this.submitNewList} />
				</div>
				<div>
					{this.state.generatedLists.map(createLists, this)}
				</div>
				<FilteredMessageList />
			</div>
		);
	}
});

module.exports = AssignmentApp;