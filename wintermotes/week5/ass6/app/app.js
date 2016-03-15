var React = require('react')
var ReactDOM = require('react-dom')
var List = require('./components/list')
var FilteredList = require('./components/filtered-list');

var CreateListField = require('./components/create-list-field')
var CreateMessageField = require('./components/create-message-field');
var NotificationBox = require('./components/notification-box');
var ListActions = require('./actions/list-actions');
var ListStore = require('./stores/list-store')

// Ressources: 
// - http://stackoverflow.com/questions/26325675/how-to-handle-data-changes-in-flux-react 
// - book: http://www.amazon.com/Developing-React-Edge-JavaScript-Interfaces-ebook/dp/B00PVCLFWY
// - book: http://www.amazon.com/React-js-Essentials-Artemij-Fedosejev-ebook/dp/B00YSILZRW/ref=pd_sim_351_1?ie=UTF8&dpID=51ppMpK6XGL&dpSrc=sims&preST=_AC_UL160_SR130%2C160_&refRID=1YRAHY8QYTYCGC6A9JH3

var Wrapper = React.createClass({
	getInitialState : function() {
		return {
			lists : ListStore.getAllLists()
		} 
	},
	componentDidMount : function() {
		ListStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ListStore.removeChangeListener(this._onChange);
    },
    _onChange : function(){
    	this.setState({
			lists : ListStore.getAllLists()
		});
    },
	render: function() {
		return (
			<div id="container">
				<h1>Message box Week 5, Assignment 6: Filtering and validating content with FLUX</h1>
				<FilteredMessageBox />
				<CreateListField />
				<CreateMessageField />
				<NotificationBox />
				<ListOutputBox lists={this.state.lists} />
			</div>
		);
	}
});

var ListOutputBox = React.createClass({
	render: function() {
		var style = {border : '1px solid red', margin: '48px 48px 48px 48px'}
		var lists = this.props.lists.map(function(list) {
			return (
				<div key ={list.listId}>
					<List data={list} onMessageUnarchive={this.props.onMessageUnarchive}/>
				</div>
			);
		}.bind(this));
		return (
			<div style={style}>
				<h1>Output box, listing the lists</h1>
				{lists}
			</div>
		);
	}
});

var FilteredMessageBox = React.createClass({
	render : function(){
	var style = {border : '1px solid green', margin: '48px 48px 48px 48px'}
	return (
		<div style ={style}>
			<h1>FilteredMessageBox, outputting the filtered messages</h1>
			<FilteredList />
		</div>
	);
}
});

ReactDOM.render(
	<Wrapper />,
	document.getElementById('app')
);    
