var React = require("react");

var ListActions = require("../Actions/list-actions");
var MessageActions = require("../Actions/message-actions");
var OptionsActions = require("../Actions/options-actions");

var ListStore = require("../Stores/list-store");
var MessageStore = require("../Stores/message-store");
var OptionsStore = require("../Stores/options-store");

var List = require("../Components/list");
var InputField = require("../Components/inputfield");
var Options = require("../Components/options")

function getAppState(){
    return {
        allLists: ListStore.getAll(),
        allMessages: MessageStore.getAll(),
        options: OptionsStore.get(),
    }    
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    
    componentDidMount: function() {
        ListStore.addChangeListener(this._onChange);
        MessageStore.addChangeListener(this._onChange);
        OptionsStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
        ListStore.removeChangeListener(this._onChange);
        MessageStore.removeChangeListener(this._onChange);
        OptionsStore.removeChangeListener(this._onChange);
    },
    
	render: function() {
        var listList = this.state.allLists.map((list, index) => <List key={index} list={list} messages={this.state.allMessages.filter(m => m.list == list.id)}/>);

        // var listList = this.state.allLists.map((list, index) => {
        //     return <List key={index} list={list} messages={this.state.allMessages.filter(m => m.list == list.id)}/>
        // });
		
		return 	<div>
                    <Options />
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