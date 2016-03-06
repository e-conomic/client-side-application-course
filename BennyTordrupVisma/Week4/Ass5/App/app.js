var React = require("react");

var List = require("./Components/list");
var InputField = require("./Components/inputfield");

var ListActions = require("./Actions/list-actions");
var MessageActions = require("./Actions/message-actions");

var ListStore = require("./Stores/list-store");
var MessageStore = require("./Stores/message-store");

function getAppState(){
    return {
        allLists: ListStore.getAll(),
        allMessages: MessageStore.getAll(),
    }    
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    
    componentDidMount: function() {
        ListStore.addChangeListener(this._onChange);
        MessageStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
        ListStore.removeChangeListener(this._onChange);
        MessageStore.removeChangeListener(this._onChange);
    },
    
	render: function() {
        var listList = this.state.allLists.map(function (list, index) {
            return <List key={index} list={list} messages={this.state.allMessages.filter(m => m.list == list.id)}/>
        }.bind(this));
		
		return 	<div>
					<InputField lists={this.state.allLists}/>
					<div>
						<h3>Lists</h3>
						<div>
							{listList}
						</div>
					</div>
				</div>
	},
    
    _onChange: function() {
         this.setState(getAppState());
    },

});

module.exports = App;