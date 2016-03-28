var React = require('react');
var MessageActions = require('../actions/message-actions')
var MessageStore = require('../stores/message-store')

module.exports = React.createClass({
        getInitialState: function() {
            this.setState({
                messages: MessageStore.getForList(this.props.listId)
            })
        },
        componentDidMount: function() {
            MessageStore.addChangeListener(this.setState(() => {messages: MessageStore.getForList(this.props.listId)));
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
        handleDownClick: function(message) {
            MessageActions.moveDownMessage(message);
        },
        handleUpClick: function(message) {
            MessageActions.moveUpMessage(message);
        },
        render: function () {

            var style = {
                color: 'blue',
            };

            return  <div>
                        <ol>
                            {this.filterArchived(false).map(function(message,i) {
                                return <div key={i}>
                                            {message.text}
                                            <button type="button" onClick={this.handleDeleteClick.bind(null, message)}>Delete</button>
                                            <button type="button" onClick={this.handleArchiveClick.bind(null, message)}>Archive</button>
                                            <ListDropdown />
                                        </div>;
                            },this)}
                        </ol>
                        <ol>
                            {this.filterArchived(true).map(function(message,i) {
                                return <div style={style} key={i}>
                                            {message.text}
                                            <button type="button" onClick={this.handleUnarchiveClick.bind(null, message)}>Unarchive</button>
                                        </div>;
                            },this)}
                        </ol>
                    </div>
        },
        filterArchived: function(isArchived) {
            return this.props.messages.filter((m) => {
                return m.isArchived == isArchived;
            });
        }

    });