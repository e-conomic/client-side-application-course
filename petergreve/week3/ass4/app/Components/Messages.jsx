var React = require('react');

module.exports = React.createClass({

        handleDeleteClick: function(message) {
            this.props.deleteMessage(message.messageId);
        },
        handleArchiveClick: function(message) {
            this.props.toggleArchive(message.messageId, true);
        },
        handleUnarchiveClick: function(message) {
            this.props.toggleArchive(message.messageId, false);
        },
        handleDownClick: function(message) {
            this.props.moveMessage(message.messageId, true);
        },
        handleUpClick: function(message) {
            this.props.moveMessage(message.messageId, false);
        },
        render: function () {

            var style = {
                color: 'blue',
            };

            return  <div>
                        <ol>
                            {this.props.messages.map(function(message,i) {
                                return <div key={i}>
                                            {message.text}
                                            <button type="button" onClick={this.handleDeleteClick.bind(null, message)}>Delete</button>
                                            <button type="button" onClick={this.handleArchiveClick.bind(null, message)}>Archive</button>
                                            <button type="button" onClick={this.handleDownClick.bind(null, message)}>Move Down</button>
                                            <button type="button" onClick={this.handleUpClick.bind(null, message)}>Move Up</button>
                                        </div>;
                            },this)}
                        </ol>
                        <ol>
                            {this.props.archived.map(function(message,i) {
                                return <div style={style} key={i}>
                                            {message.text}
                                            <button type="button" onClick={this.handleUnarchiveClick.bind(null, message)}>Unarchive</button>
                                        </div>;
                            },this)}
                        </ol>
                    </div>
        }

    });