
var React = require('react');
var Messages = require('./Messages')
var MessageActions = require('../actions/message-actions')

module.exports = React.createClass({
        render: function() {
            return  <div>
                        {this.props.list.id} - {this.props.list.name}
                        <br />
                        <input type="text" ref={(component) => this.input = component} /><button type="button" onClick={this.createMessage}>Submit Message</button>
                        <Messages listId={this.props.list.id} />
                    </div>
        },
        createMessage: function() {
            var newMessage = {
                listId: this.props.list.id,
                text: this.input.value,
            }
            MessageActions.createMessage(newMessage);
        }

})

