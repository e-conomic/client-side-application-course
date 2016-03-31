let React = require('react');

let MessageActions = require('./actions/message-actions');
let MessageStore = require('./stores/message-store');

let Checkbox = require('./checkbox');

const CheckboxContainer = React.createClass({ 
	
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

		return <Checkbox listID={this.props.listID} checked={checked} handleClick={this.handleClick} listName={this.props.listName} />; 
	}

});
module.exports = CheckboxContainer;
