var React = require('react');

var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions')
var ListStore = require('../stores/list-store');

module.exports = React.createClass({
        getInitialState: function() {
            return {
                messages: this.getVisibleMessages(MessageStore.getAll(), ListStore.getAll())
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

            var style = {
                color: 'blue',
            };

            return  <div>
                            <ol>
                                {this.sortMessages(this.filterArchived(false,this.state.messages)).map((message,i) => {
                                    return <div key={i}>
                                                {message.text}
                                                    <button type="button" onClick={this.handleDeleteClick.bind(null, message)}>Delete</button>
                                                    <button type="button" onClick={this.handleArchiveClick.bind(null, message)}>Archive</button>
                                            </div>;
                                },this)}
                            </ol>
                            <ol>
                                {this.sortMessages(this.filterArchived(true,this.state.messages)).map((message,i) => {
                                    return <div style={style} key={i}>
                                                {message.text}
                                                <button type="button" onClick={this.handleUnarchiveClick.bind(null, message)}>Unarchive</button>

                                            </div>;
                                },this)}
                            </ol>
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
                messages: this.getVisibleMessages(MessageStore.getAll(), ListStore.getAll())
            });
        }

});

