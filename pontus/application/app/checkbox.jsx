let React = require('react');

const Checkbox = ({listID, checked, handleClick, listName}) => { 
	return <li><input type="checkbox" value={listID} checked={checked} onChange={handleClick} />{listName}</li>;
};

module.exports = Checkbox;
