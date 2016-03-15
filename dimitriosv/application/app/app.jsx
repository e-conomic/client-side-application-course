import List from './components/List.jsx';
import Message from './components/Message.jsx';
import NotificationBar from './components/notification-bar.jsx';
import Translations from './components/Translations.jsx';
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
    componentWillUnmount: function() {
        ListStore.removeChangeListener(this.onStoreChange);
        MessageStore.removeChangeListener(this.onStoreChange);
    },
    onStoreChange: function() {
        this.setState({
            lists: ListStore.getAll(),
            allMessages: MessageStore.getAll(),
            notificationMessage: MessageStore.getNotificationText(),
            showNotification: MessageStore.getshowNotification(),
            isError: MessageStore.getnotificationIsError(),
        });
    },
    getInitialState: function() {
        return {
            inputListName:"",
            lists: ListStore.getAll(),
            allMessages: MessageStore.getAll(),
            notificationMessage: MessageStore.getNotificationText(),
            showNotification: MessageStore.getshowNotification(),
            isError:   MessageStore.getnotificationIsError(),
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
            <input defaultChecked onChange={this.handleCheckboxClick} type="checkbox" key={list.listId+"checkbox"} name={list.listName} value={list.listId} />
            {list.listName}
            </div>
            );
    },
    renderMessages: function(message, i) {
        if (!message.isHidden) {
            return (
            <div className="message" key={message.messageId+"_2"}>
            <Message    messageId={message.messageId} 
                        messageText={message.text}
                        messageIsArchived={message.isArchived}
                        allLists={this.state.lists}
            />
            </div>
            );
        }
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
    handleCheckboxClick: function(evt) {
        var listId=evt.target.value
            if (evt.target.checked) {
                MessageActions.showMessages(listId)
            } else {
                MessageActions.hideMessages(listId)
            }
    },
    onDismissed: function() {//handles the dismiss notification bar
        //TODO in a flux way maybe?
        this.setState({
            showNotification: false
        });
    },
    render: function() {
        var allMessagesDeepCopy = JSON.parse(JSON.stringify(this.state.allMessages));
        
        var allUnarchivedMessages = allMessagesDeepCopy.filter(function(obj) {
                return obj.isArchived==false; 
            });
        var allArchivedMessages = allMessagesDeepCopy.filter(function(obj) {
                return obj.isArchived==true; 
            });

        var allUnarchivedMessagesSortedByName = allUnarchivedMessages.sort(compare);
        var allArchivedMessagesSortedByName = allArchivedMessages.sort(compare);
        return  (
        <div>
            {this.state.showNotification
            ? <NotificationBar 
                isError={this.state.isError}
                message={this.state.notificationMessage}
                onDismissed={this.onDismissed}
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
                    {allUnarchivedMessagesSortedByName.map(this.renderMessages)}
                </div>
                <div>Archived:</div>
                <div className="allmessagescontainer">
                    {allArchivedMessagesSortedByName.map(this.renderMessages)}
                </div>
                <div className="alllistsascheckboxes">
                    {this.state.lists.map(this.renderListsAsCheckboxes)}
                </div>
            </div>
            <Translations />
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
