
var React = require('react');
var Messages = require('./Messages')
// var ErrorMessage = require('./ErrorMessage')

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
                        {this.props.list.id} - {this.props.list.name}
                        <br />
                        <input type="text" ref={(component) => this.input = component} /><button type="button" onClick={this.handleInput}>Submit Message</button>
                        <Messages messages={this.props.messages}} />
                    </div>
        },
        toggleErrorMessage: function(message) {
                this.setState({
                    errorMessage: message
                 });
        },
})