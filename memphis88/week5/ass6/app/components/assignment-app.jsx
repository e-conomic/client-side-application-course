var React = require('react');

var OnPressingEnterMixin = require('../mixins/on-pressing-enter-mixin');
var GeneratedList = require('./generated-list');
var ListActions = require('../actions/list-actions');
var ListStore = require('../stores/list-store');

var AssignmentApp = React.createClass({
	mixins: [
		OnPressingEnterMixin
	],

	propTypes: {
		generatedLists: React.PropTypes.array,
		listName: React.PropTypes.string,
	},

	getInitialState: function() {
		return {
			generatedLists: ListStore.getAll(),
			listName: ''
		}
	},

	componentDidMount: function() {
		ListStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ListStore.removeChangeListener(this._onChange);
	},

	onChange: function(e) {
		this.setState({ listName: e.target.value });
	},

	_onChange: function() {
		this.setState({
			generatedLists: ListStore.getAll(),
			listName: ''
		});
	},

	submitNewList: function() {
		ListActions.createList(this.state.listName);
	},

	onClick: function() { this.submitNewList() },

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