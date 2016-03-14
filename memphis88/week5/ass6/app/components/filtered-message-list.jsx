var React = require('react');

var ListStore = require('../stores/list-store');
var MessageStore = require('../stores/message-store');
var ArchiveStore = require('../stores/archive-message-store');

var Message = require('./message');

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function makeAndSortMessageList() {
	var allMessages = MessageStore.getAll();
	allMessages.push(ArchiveStore.getAll());
	allMessages.sort(function(a, b) {
		if (a.message > b.message) return 1;
		if (a.message < b.message) return -1;
		return 0;
	});
	return allMessages;
}

var FilteredMessageList = React.createClass({
	getInitialState: function() {
		return {
			allLists: ListStore.getAll(),
			allMessages: makeAndSortMessageList(),
			filteredLists: []
		}
	},

	componentDidMount: function() {
		ListStore.addChangeListener(this._onChange);
		MessageStore.addChangeListener(this._onChange);
		ArchiveStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		ListStore.removeChangeListener(this._onChange);
		MessageStore.removeChangeListener(this._onChange);
		ArchiveStore.removeChangeListener(this._onChange);
	},

	onChange: function() {
		var filteredLists = [];
		var elements = this.refs.filterForm.elements;
		for (var input in elements) {
			if (elements[input].checked) {
				filteredLists.push(elements[input].value);
			}
		}
		this.setState({ filteredLists: filteredLists });
	},

	_onChange: function() {
		var allMessages = MessageStore.getAll();
		allMessages.push(ArchiveStore.getAll());
		this.setState({
			allLists: ListStore.getAll(),
			allMessages: allMessages,
		});
	},

	render: function() {
		var renderAllListInputs = function(list) {
			var randomColor = { color: getRandomColor() };
			return (
				<span key={list.id} style={randomColor}>
					<input type="checkbox" value={list.id} />
					<span>{list.name}</span>
				</span>
			);
		};
		var renderAllMessages = function(message) {
			if (this.state.filteredLists.includes(message.listKey)) {
				return <Message text={message.message} />;
			}
		};
		var tempStyle = {
			borderStyle: 'solid',
			borderWidth: 3,
			color: 'red'
		};
		return (
			<div style={tempStyle}>
				<form onChange={this.onChange} ref="filterForm">
					{this.state.allLists.map(renderAllListInputs)}
				</form>
				<div>
					{this.state.allMessages.map(renderAllMessages, this)}
				</div>
			</div>
		);
	}

});

module.exports = FilteredMessageList;