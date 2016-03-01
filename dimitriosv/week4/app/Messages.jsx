//import Message from './Message.jsx';
var Message = require('./Message');

var Messages = React.createClass({
    render: function () {
        
        return  <div>
                    <div>
                        {this.props.messages.map(function(message,i) {
                            if (message.isArchived) {
                                ;
                            } else {
                                return (<div className="message" key={i}  >
                                        <Message  messageId={message.messageId} 
                                            messageText={message.text}
                                            messageIsArchived={message.isArchived} 
                                            deleteMessageParent={this.props.deleteMessageParent}
                                            toggleArchiveMessageParent={this.props.toggleArchiveMessageParent}
                                            addMessageParent={this.props.addMessageParent}
                                            allLists={this.props.allLists}
                                        />
                                    </div>)
                            }
                        }.bind(this))} 
                    </div>
                    <div>Archived:</div>
                    <div>
                        {this.props.messages.map(function(message,i) {
                            if (message.isArchived) {
                                return (<div className="message" key={i}  >
                                        <Message  messageId={message.messageId} 
                                            messageText={message.text}
                                            messageIsArchived={message.isArchived} 
                                            deleteMessageParent={this.props.deleteMessageParent}
                                            toggleArchiveMessageParent={this.props.toggleArchiveMessageParent}
                                            addMessageParent={this.props.addMessageParent}
                                            allLists={this.props.allLists}
                                        />
                                    </div>)
                            } else {
                                ;
                            }
                        }.bind(this))}
                    </div>
                </div>
    },
     

});


module.exports = Messages;
