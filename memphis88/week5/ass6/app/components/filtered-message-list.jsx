var React = require('react');

var ListStore = require('../stores/list-store');
var MessageStore = require('../stores/message-store');
var ArchiveStore = require('../stores/archive-message-store');

var FilteredMessageList = React.createClass({
	getInitialState: function() {
		return {
			allLists: ,
			allMessages:
		}
	},

	componentDidMount: function() {},

	componentWillUnmount: function() {},

	onChange: function(listKey) {},

	_onChange: function() {},

	render: function() {
		var renderAllLists = function(list) {
			return <input type="checkbox" value={list.id}>{list.listName}</input>
		};
		return (
			<div>
				{this.state.allLists.map(renderAllLists)}
			</div>
		);
	}

});

module.exports = FilteredMessageList;