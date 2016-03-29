var React = require('react');
var MessageActions = require('../actions/message-actions');
var MessageStore = require('../stores/message-store');
import Messages from './Messages';
import ArchivedMessages from './ArchivedMessages';

module.exports = React.createClass({
        getInitialState: function() {
            return {
                messages: MessageStore.getForList(this.props.listId)
            }
        },
        componentDidMount: function() {
            MessageStore.addChangeListener(this.onChange);
        },
        componentWillUnmount: function() {
            MessageStore.removeChangeListener(this.onChange);
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
                        <Messages messages={this.filterArchived(false)} handleArchiveClick={this.handleArchiveClick} handleDeleteClick={this.handleDeleteClick} />
                        <ArchivedMessages messages={this.filterArchived(true)} handleUnarchiveClick={this.handleUnarchiveClick}  />
                    </div>
        },
        filterArchived: function(isArchived) {
            return this.state.messages.filter((m) => {
                return m.isArchived == isArchived;
            });
        },
        onChange: function() {
            this.setState({messages: MessageStore.getForList(this.props.listId)})
        }

    });