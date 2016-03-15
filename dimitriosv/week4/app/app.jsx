import List from './components/List.jsx';
var React = require('react');
var ReactDOM = require('react-dom');
var ListActions = require('./actions/list-actions.js');
var ListStore = require('./stores/list-store.js');
var MessageActions = require('./actions/message-actions.js');
var MessageStore = require('./stores/message-store.js');



var App = React.createClass({
    componentDidMount: function() {
        ListStore.addChangeListener(this.onStoreChange);
        MessageStore.addChangeListener(this.onStoreChange);
    },
    onStoreChange: function() {
        console.log("onStoreChange")
        //console.log(ListStore.getAll())
        this.setState({
            totalLists: ListStore.getTotalElements(),
            totalMessages: MessageStore.getTotalElements(),
            lists: ListStore.getAll(),
            allMessages: MessageStore.getAll(),
        });
    },
    getInitialState: function() {
        return {
            totalLists: ListStore.getTotalElements(),
            totalMessages: MessageStore.getTotalElements(),
            inputListName:"",
            lists: ListStore.getAll(),
            allMessages: MessageStore.getAll(),
        };
    },
    eachList: function(list, i) {  
        return (
            <List key={list.listId}
            index={i}
            listName={list.listName}
            listId={list.listId}
            allLists={this.state.lists}
            allMessages={this.state.allMessages}
            >{list}</List>
            );
    },
    createList: function(evt) {
        var listName = this.state.inputListName;
        ListActions.createList(listName);
    },
    handleChange: function(evt) {
        this.setState({
          inputListName: evt.target.value
      });
    },
    render: function() {
        return  <div className="container">
        <span>Add new list with name: </span>
        <input onChange={this.handleChange} type="text"/>
        <button type="button" onClick={this.createList}>Add</button>
        <div className="llistcont">
        {this.state.lists.map(this.eachList)}
        </div>
        </div>
    },
});


ReactDOM.render(<App/>, document.getElementById('app'));
