var React = require('react')
var ReactDOM = require('react-dom')
var List = require('./components/list')

var CreateListField = require('./components/fields').CreateListField
var CreateMessageField = require('./components/fields').CreateMessageField
var ListActions = require('./actions/list-actions');
var ListStore = require('./stores/list-store')

// Ressources: 
// - http://stackoverflow.com/questions/26325675/how-to-handle-data-changes-in-flux-react 
// - book: http://www.amazon.com/Developing-React-Edge-JavaScript-Interfaces-ebook/dp/B00PVCLFWY
// - book: http://www.amazon.com/React-js-Essentials-Artemij-Fedosejev-ebook/dp/B00YSILZRW/ref=pd_sim_351_1?ie=UTF8&dpID=51ppMpK6XGL&dpSrc=sims&preST=_AC_UL160_SR130%2C160_&refRID=1YRAHY8QYTYCGC6A9JH3

function getAppState(){
	return {
		lists : ListStore.getAll(), 
	}
}

var MessageBox = React.createClass({
	getInitialState : function() {
		var lists = getAppState()
		return lists; 
	},
	componentDidMount : function() {
		ListStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        ListStore.removeChangeListener(this._onChange);
    },
    _onChange : function(){
    	this.setState(getAppState())
    },
	render: function() {
		return (
			<div id="container">
				<h1>Message box Week 4, Assignment 5: Create lists and messages with FLUX</h1>
				<CreateListField />
				<CreateMessageField onMessageSubmit={this.createMessage} lists={this.state.lists} />
				<OutputField lists={this.state.lists} />
			</div>
		);
	}
});

var OutputField = React.createClass({
	render: function() {
		var lists = this.props.lists.map(function(list) {
			return (
				<div key ={"output-" + list.listId}>
					<List data={list} onMessageUnarchive={this.props.onMessageUnarchive}/>
				</div>
			);
		}.bind(this));
		return (
			<div>
				<p>Hello there this is the Output box, listing the lists</p>
				{lists}
			</div>
		);
	}
});

ReactDOM.render(
<MessageBox />,
document.getElementById('app')
);    

