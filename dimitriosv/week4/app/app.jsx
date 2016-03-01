import List from './List.jsx';
var React = require('react');
var ReactDOM = require('react-dom');


var App = React.createClass({
    getInitialState: function() {
            return {  //This state can be changed to empty of course
                totalLists:2,
                totalMessages:4,
                inputListName:"",
                lists: [{listId: 1, listName: "first list1"},{listId: 2, listName: "second list2"}],
                allMessages: [  {messageId:1, belongsToList: 1, text: "testmessage1", isArchived: false},
                {messageId:2, belongsToList: 1, text: "testmessage2", isArchived: false},
                {messageId:3, belongsToList: 1, text: "testmessage3", isArchived: false},
                {messageId:4, belongsToList: 2, text: "testmessage4", isArchived: false}]
            };
        },
        eachList: function(list, i) {  
            return (
                <List key={i}
                index={i}
                listName={list.listName}
                listId={list.listId}
                allLists={this.state.lists}
                addMessageParent={this.addMessageParent}
                deleteMessageParent={this.deleteMessageParent}
                toggleArchiveMessageParent={this.toggleArchiveMessageParent}
                allMessages={this.state.allMessages}
                >{list}</List>
                );
        },
        createList: function(evt) {
            if (this.state.inputListName=="") {
                alert("Cannot add list with no name!")
            } else {
                var newlistId=this.state.totalLists
                newlistId++; 
                var newList = {
                    listId: newlistId,
                    listName: this.state.inputListName
                };

            //var lists=this.state.lists; //WRONG! THIS DOES NOT CREATE A NEW INSTANCE
            var lists =Array.from(this.state.lists);   //this creates a new instance

            lists.push(newList)   

            this.setState({
                lists: lists,
                totalLists: this.state.totalLists+1
            });
        }


    },
    addMessageParent: function(listId,MessageToAdd) {

        var newMessageId=this.state.totalMessages
        newMessageId++; 


        var newMessage = {
            messageId:newMessageId,
            belongsToList: listId,
            text: MessageToAdd,
            isArchived: false
        };

        var allMessages=this.state.allMessages;

        allMessages.push(newMessage)

        this.setState({
            allMessages: allMessages,
            totalMessages: this.state.totalMessages+1

        });
    },
    deleteMessageParent: function(messageId) {
        var allMessages=this.state.allMessages;

        var newArray = allMessages.filter(function(obj) {
            return messageId!=(obj.messageId) 
        });

        this.setState({
            allMessages: newArray
        });

    },
    toggleArchiveMessageParent: function(messageId) {
        var allMessages=this.state.allMessages;
        allMessages.forEach(function(obj) {
            if (obj.messageId === messageId) {
                if (obj.isArchived) {
                    obj.isArchived=false;
                } else {
                    obj.isArchived=true;
                }
            }
        });

        this.setState({
          allMessages: allMessages
      });
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
