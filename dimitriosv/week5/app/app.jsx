import List from './components/List.jsx';
import Message from './components/Message.jsx';
import NotificationBar from './components/notification-bar.jsx';
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
        this.setState({
            totalLists: ListStore.getTotalElements(),
            totalMessages: MessageStore.getTotalElements(),
            lists: ListStore.getAll(),
            allMessages: MessageStore.getAll(),
            errorMessage: "",
            showNotification: false,
        });
    },
    getInitialState: function() {
        return {
            totalLists: ListStore.getTotalElements(),
            totalMessages: MessageStore.getTotalElements(),
            inputListName:"",
            lists: ListStore.getAll(),
            allMessages: MessageStore.getAll(),
            errorMessage: "hi",
            showNotification: false,
        };
    },
    renderLists: function(list, i) {
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
    renderListsAsCheckboxes: function(list, i) {  
        return (
            <div>
            <input defaultChecked type="checkbox" key={list.listId+"checkbox"} name={list.listName} value={list.listName} />
            {list.listName}
            </div>
            );
    },
    renderMessages: function(message, i) {
        return (
            <div className="message" key={message.messageId+"_2"}>
            <Message    messageId={message.messageId} 
                        messageText={message.text}
                        messageIsArchived={message.isArchived}
                        allLists={this.state.lists}
            />
            </div>
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
        var allMessagesDeepCopy = JSON.parse(JSON.stringify(this.state.allMessages));
        var allMessagesSortedByName = allMessagesDeepCopy.sort(compare);
        return  (

        <div>
            {this.state.showNotification
            ? <NotificationBar 
                message={this.state.errorMessage}
            />
            : <div></div>
            }
            <div className="container">
                <span>Add new list with name:</span>
                <input onChange={this.handleChange} type="text"/>
                <button type="button" onClick={this.createList}>Add</button>
                <div className="llistcont">
                    {this.state.lists.map(this.renderLists)}
                </div>
            </div>
            <div className="sidecontainer">
                <div>All messages</div>
                <div className="allmessagescontainer">
                    {allMessagesSortedByName.map(this.renderMessages)}
                </div>
                <div className="alllistsascheckboxes">
                    {this.state.lists.map(this.renderListsAsCheckboxes)}
                </div>
            </div>
        </div>
        );
    },
});

//helper for messages sorting according to their text
function compare(a,b) {
  if (a.text < b.text)
    return -1;
  else if (a.text > b.text)
    return 1;
  else 
    return 0;
}

ReactDOM.render(<App/>, document.getElementById('app'));
