let React = require('react');

let MessageActions = require('./message-actions');
let MessageStore = require('./message-store');


const Checkbox = React.createClass({ 
	
	getInitialState() { 
		return  { 
			checked: false
		};
	},

	handleClick(e) {
		let listID = e.target.value;
		this.setState({ checked: !this.state.checked });
		MessageActions.addListIDToFilter(listID);
	},

	render() { 

		let filteredListIDs = MessageStore.getFilteredIDs();
		let re = new RegExp(this.props.listID);
		let checked = (re.test(filteredListIDs)) ? true : false;

		return <li><input type="checkbox" value={this.props.listID} checked={checked} onChange={this.handleClick} />{this.props.listName}</li>;
	}

});
module.exports = Checkbox;
