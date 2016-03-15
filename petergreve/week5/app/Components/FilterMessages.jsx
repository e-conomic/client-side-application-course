var React = require('react');

var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions')

module.exports = React.createClass({
        getInitialState: function() {
            return {
                messages: MessageStore.getAll(),
            }
        },
        componentDidMount: function() {
            MessageStore.addChangeListener(() => this.setState({messages: MessageStore.getAll()}));
        },
        // remove change listener
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
                                {this.sortMessages(this.filterArchived(false)).filter((m) => {return m.isHidden == false}).map((message,i) => {
                                    return <div key={i}>
                                                {message.text}
                                                    <button type="button" onClick={this.handleDeleteClick.bind(null, message)}>Delete</button>
                                                    <button type="button" onClick={this.handleArchiveClick.bind(null, message)}>Archive</button>
                                            </div>;
                                },this)}
                            </ol>
                            <ol>
                                {this.sortMessages(this.filterArchived(true)).filter((m) => {return m.isHidden == false}).map((message,i) => {
                                    return <div style={style} key={i}>
                                                {message.text}
                                                <button type="button" onClick={this.handleUnarchiveClick.bind(null, message)}>Unarchive</button>

                                            </div>;
                                },this)}
                            </ol>
                    </div>
        },
        filterArchived: function (isArchived)  {
               return this.state.messages.filter((m) => {
                    return m.isArchived == isArchived;
           });
       },
        sortMessages: function(arr) {
           return arr.sort(function(a, b) {
                var textA = a.text.toUpperCase();
                var textB = b.text.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }

});

