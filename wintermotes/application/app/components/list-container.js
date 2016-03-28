var React = require('react');
var ListStore = require('../stores/list-store')
var List = require('./list');

var style = {
	border : '1px solid red', 
	margin: '48px 48px 48px 48px'
}

var ListContainer = React.createClass({
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
		var lists = this.state.lists.map(function(list) {
			return (
				<div key ={list.listId}>
					<List listId={list.listId} listName={list.listName} />
				</div>
			);
		}.bind(this));
		return (
			<div style={style}>
				<h1>List container box, listing the lists</h1>
				{lists}
			</div>
		);
	}
});

module.exports = ListContainer
