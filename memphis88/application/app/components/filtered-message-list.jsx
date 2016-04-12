var React = require('react');

var Message = require('./message');

var FilteredMessageList = React.createClass({
	getInitialState: function() {
		return {
			filteredLists: []
		}
	},

	onChange: function(e) {
		var filteredLists = [];
		var elements = this.refs.filterForm.elements;
		for (var input in elements) {
			if (elements[input].checked) {
				filteredLists.push(parseInt(elements[input].value));
			}
		}
		this.setState({ filteredLists: filteredLists });
	},

	render: function() {
		var renderAllListInputs = function(list) {
			var randomColor = { color: list.color };
			return (
				<li key={list.id} style={randomColor}>
					<input type="checkbox" value={list.id} />
					<span>{list.name}</span>
				</li>
			);
		};
		var renderMessages = function(message) {
			if (this.state.filteredLists.includes(message.listKey)) {
				return <Message key={message.id} message={message} />;
			}
		};
		var containerStyle = {
			borderStyle: 'solid',
			borderWidth: 3,
			borderColor: 'red'
		};
		return (
			<div style={containerStyle}>
				<form onChange={this.onChange} ref="filterForm">
					<ul>{this.props.generatedLists.map(renderAllListInputs)}</ul>
				</form>
				<div>
					<table><tbody>{this.props.sortedMessages.map(renderMessages, this)}</tbody></table>
				</div>
			</div>
		);
	}

});

module.exports = FilteredMessageList;
