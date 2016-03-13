let React = require('react');

const MenuItem = ({listID, listName}) => ( <option value={listID}>{listName}</option> );

module.exports = MenuItem;
