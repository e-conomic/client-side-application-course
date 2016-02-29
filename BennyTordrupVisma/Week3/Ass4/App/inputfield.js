module.exports = React.createClass({
	render: function() {
		return <div>
				<label>Text to add: </label>
				<input type="text" ref="input"/>
				<label>Name of list: </label>
				<input type="text" ref="listInput"/>
				<button onClick={this.handleCommit}>Commit</button>
			</div>;
	},
	
	isInputValid: function(input, list) {
		if (input.length > 200)	{
			window.alert("The input may not exceed 200 characters.");
			return false;
		}
		
		if (list.length == 0) {
			window.alert("You have to enter a name on the list to add message to.");
			return false;
		}
		
		if (this.props.lists.some(l => l.messages.some(m => m.text == input))) {
			window.alert("The message is already member of a list and cannot be added");
			return false;
		}
		
		return true;
	},
	
	handleCommit: function() {
		var input = this.refs.input.value;
		var list = this.refs.listInput.value;
		if (this.isInputValid(input, list)) {
			this.props.handleCommit(input, list);
			this.refs.input.value = '';
			this.refs.listInput.value = '';
			this.refs.input.focus();
		}
	},
});
