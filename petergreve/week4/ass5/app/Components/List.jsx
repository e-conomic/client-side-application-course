
var React = require('react');
var Messages = require('./Messages')
var ErrorMessage = require('./ErrorMessage')

module.exports = React.createClass({

        getInitialState: function() {
            return  {
                        errorMessage: ''
                    }
        },

        handleInput: function() {
            var message = this.input.value;
            if (message>200) {
                this.toggleErrorMessage('Message too long')
            } else {
                this.props.createMessage(message,this.props.list.listId);
                this.toggleErrorMessage('');
            }
        },
        render: function() {
            return  <div>
                        {this.props.list.listId} - {this.props.list.listName}
                        <br />
                        <input type="text" ref={(component) => this.input = component} /><button type="button" onClick={this.handleInput}>Submit Message</button>
                        <ErrorMessage errorMessage={this.state.errorMessage} />
                        <Messages
                         messages={this.props.messages}
                         archived={this.props.archived}
                         toggleArchive={this.props.toggleArchive}
                         deleteMessage={this.props.deleteMessage}
                         moveMessage={this.props.moveMessage} />
                    </div>
        },
        toggleErrorMessage: function(message) {
                this.setState({
                    errorMessage: message
                 });
        },
    })