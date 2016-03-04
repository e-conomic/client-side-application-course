//import Message from './Message.jsx';
var Message = require('./Message');
var React = require('react');
var ReactDOM = require('react-dom');


var Messages = React.createClass({
    render: function () {
        
        return  <div>
                    <div>
                        {this.props.messages
                            .filter(function(message){ 
                                return !message.isArchived;
                            })
                            .map(function(message){
                                return (<div className="message" key={message.messageId}  >
                                        <Message  messageId={message.messageId} 
                                            messageText={message.text}
                                            messageIsArchived={message.isArchived} 
                                            deleteMessageParent={this.props.deleteMessageParent}
                                            toggleArchiveMessageParent={this.props.toggleArchiveMessageParent}
                                            allLists={this.props.allLists}
                                        />
                                    </div>)
                            }.bind(this))}
                    </div>
                    <div>Archived:</div>
                    <div>
                        {this.props.messages
                            .filter(function(message){ 
                                return message.isArchived;
                            })
                            .map(function(message){
                                return (<div className="message" key={message.messageId}  >
                                        <Message  messageId={message.messageId} 
                                            messageText={message.text}
                                            messageIsArchived={message.isArchived} 
                                            allLists={this.props.allLists}
                                        />
                                    </div>)
                            }.bind(this))}
                    </div>
                </div>
    },
     
});


module.exports = Messages;
