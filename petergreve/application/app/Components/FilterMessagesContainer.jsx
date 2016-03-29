var React = require('react');

var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions')
var ListStore = require('../stores/list-store');
import ArchivedMessages from './ArchivedMessages';
import Messages from './Messages';

module.exports = React.createClass({
        getInitialState: function() {
            return {
                messages: MessageStore.getAll(),
                lists: ListStore.getAll()
            }
        },
        componentDidMount: function() {
            MessageStore.addChangeListener(this.onChange);
            ListStore.addChangeListener(this.onChange);
        },
        componentWillUnmount: function() {
            MessageStore.removeChangeListener(this.onChange);
            ListStore.removeChangeListener(this.onChange);

        },
        handleDeleteClick: function(message) {
            MessageActions.deleteMessage(message);
        },
        handleArchiveClick: function(message) {
            MessageActions.archiveMessage(message);
        },
        handleUnarchiveClick: function(message) {
            MessageActions.unarchiveMessage(message);
        },
        render: function () {
            var visibleMessages = this.getVisibleMessages(this.state.messages, this.state.lists);

            return  <div>
                        <Messages messages={this.sortMessages(this.filterArchived(false,visibleMessages))} handleArchiveClick={this.handleArchiveClick} handleDeleteClick={this.handleDeleteClick} />
                        <ArchivedMessages messages={this.sortMessages(this.filterArchived(true,visibleMessages))} handleUnarchiveClick={this.handleUnarchiveClick} />
                    </div>
        },
        filterArchived: function (isArchived, messages)  {
               return messages.filter((m) => {
                    return m.isArchived == isArchived;
           });
       },
        sortMessages: function(arr) {
           return arr.sort(function(a, b) {
                var textA = a.text.toUpperCase();
                var textB = b.text.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        },
        getVisibleMessages: function(messages, lists) {
            var hiddenLists = lists.filter((l) => {return l.hideMessages == true});
            var hiddenlistIds = [];

            hiddenLists.forEach(function(element) {
               hiddenlistIds.push(element.id)
            });

            var visibleMessages = messages.filter((m) => {
                    return !hiddenlistIds.includes(m.listId)
                })

            return visibleMessages;

        },
        onChange: function() {
            this.setState({
                messages: MessageStore.getAll(),
                lists: ListStore.getAll()
            });
        }

});

