var React = require('react');
var List = require('./List')

module.exports = React.createClass({
        getInitialState: function() {
            return {
                    lists: [{listId: 0, listName: "first list"},{listId: 1, listName: "second list"}],
                    errorMessage: 'vsdgfdsgfdsgfs',
                    allMessages: [
                                    {messageId: 0, listId: 0, text: "testmessage for list 0", isArchived: false},
                                    {messageId: 3, listId: 0, text: "testmessage for list 0", isArchived: true},
                                    {messageId: 1, listId: 1, text: "testmessage for list 1", isArchived: false},
                                    {messageId: 2 ,listId: 2, text: "testmessage for list 2", isArchived: false}
                                 ],
                };
        },
        render: function() {
            return  <div>
                        <input type="text" ref={(component) => this.newListName = component} />
                        <button type="button" onClick={this.createList}>New List</button>
                        <ol>
                            {this.state.lists.map(function(list, i) {
                                return <List
                                            key={i}
                                            handleInput={this.handleInput}
                                            toggleArchive={this.toggleArchive}
                                            createMessage={this.createMessage}
                                            deleteMessage={this.deleteMessage}
                                            messages={this.filterMessages(list.listId)}
                                            archived={this.filterArchived(list.listId)}
                                            validateMessage={this.validateMessage}
                                            errorMessage={this.state.errorMessage}
                                            moveMessage={this.moveMessage}
                                            showErrorMessage={this.showErrorMessage}
                                            list={list} />;
                            },this)}
                        </ol>

                    </div>
        },
        createList: function() {
            var newList = [{
                listId: this.state.lists.length + 1,
                listName: this.newListName.value
            }];

            this.setState({
                  lists: this.state.lists.concat(newList),
                });
        },
        createMessage: function(text, listId) {

            var newMessage = [{
                messageId: this.state.allMessages.length + 1,
                text: text,
                isArchived: false,
                listId: listId
            }];

            this.setState({
                  allMessages: this.state.allMessages.concat(newMessage),
                });
        },
        filterMessages: function(listId) {
            return this.state.allMessages.filter((m) => {
                return m.isArchived == false && m.listId == listId;
            });
        },
        filterArchived: function(listId) {
            return this.state.allMessages.filter((m) => {
                return m.isArchived == true && m.listId == listId;
            });
        },
        deleteMessage: function(messageId) {
            var newAllMessages = this.state.allMessages.filter((m) => {
                return m.messageId != messageId;
            });

            this.setState({
                allMessages: newAllMessages
            });
        },
        toggleArchive: function(messageId, isArchived) {

            var clonedMessages = Object.assign({}, this.state.allMessages);
            var clonedMessagesArray = Object.keys(clonedMessages).map(function (key) {return clonedMessages[key]});

            var message = clonedMessagesArray.filter((m) => {
                return m.messageId == messageId;
            })[0];

            message.isArchived = isArchived;

            this.setState({
                allMessages: clonedMessagesArray
            });
        },
        moveMessage: function(messageId, down) {

            var clonedMessages = Object.assign({}, this.state.allMessages);
            var clonedMessagesArray = Object.keys(clonedMessages).map(function (key) {return clonedMessages[key]});

            var movedMessage = clonedMessagesArray.filter((m) => {
                return m.messageId == messageId;
            })[0];

            if (down && movedMessage.listId < this.state.lists.length - 1)
                movedMessage.listId = movedMessage.listId + 1;
            else if (!down && movedMessage.listId > 0)
                movedMessage.listId = movedMessage.listId - 1;
            else return

            this.setState({
                allMessages: clonedMessagesArray
            });
        }
    });

