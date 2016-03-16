var React = require('react');
var ReactDOM = require('react-dom');
var ListContainer = require('./components/list-container');
var FilteredList = require('./components/filtered-list');

var CreateListField = require('./components/create-list-field')
var CreateMessageField = require('./components/create-message-field');
var NotificationContainer = require('./components/notification-Container');

// Ressources: 
// - http://stackoverflow.com/questions/26325675/how-to-handle-data-changes-in-flux-react 
// - book: http://www.amazon.com/Developing-React-Edge-JavaScript-Interfaces-ebook/dp/B00PVCLFWY
// - book: http://www.amazon.com/React-js-Essentials-Artemij-Fedosejev-ebook/dp/B00YSILZRW/ref=pd_sim_351_1?ie=UTF8&dpID=51ppMpK6XGL&dpSrc=sims&preST=_AC_UL160_SR130%2C160_&refRID=1YRAHY8QYTYCGC6A9JH3

var Wrapper = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Week 5, Assignment 6: Filtering and validating content with FLUX</h1>
				<FilteredList />
				<CreateListField />
				<CreateMessageField />
				<NotificationContainer />
				<ListContainer />
			</div>
		);
	}
});

ReactDOM.render(
	<Wrapper />,
	document.getElementById('app')
);    

