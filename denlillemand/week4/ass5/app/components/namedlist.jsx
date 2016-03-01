import React from 'react';
import Message from './message.jsx';
import { swapMessage, createMessage, deleteMessage, archiveMessage } from '../actioncreators/listactions.js';

export default class NamedList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            messageSwapDestination: "",
            message: "",
            sortedMessages: [],
            messageSwapId: "",
            messageId: 1
        };
        this.onMessageSubmit = this.onMessageSubmit.bind(this);
        this.onChangeMessageSwapDestinationListName = this.onChangeMessageSwapDestinationListName.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeMessageSwapId = this.onChangeMessageSwapId.bind(this);
        this.archiveMessage = this.archiveMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.submitSwapMessage = this.submitSwapMessage.bind(this);
    }

    submitSwapMessage(event) {
        swapMessage(parseInt(this.state.messageSwapId, 10), this.state.messageSwapDestination, this.props.name);
        this.setState({
            messageSwapId: "",
            messageSwapDestination: ""
        });
    }

    onChangeMessage(event) {
        if (event.target.value.length > 200) {
            alert("Message can atmost be 200 characters long");
        } else {
            this.setState({
                message: event.target.value
            });
        }
    }

    onChangeMessageSwapDestinationListName(event) {
        this.setState({
            messageSwapDestination: event.target.value
        });
    }

    onMessageSubmit(event) {
        createMessage(this.state.messageId, this.state.message, false, this.props.name);
        this.setState({
            message: "",
            messageId: this.state.messageId + 1
        });
    }

    onChangeMessageSwapId(event) {
        if (parseInt(event.target.value, 10)) {
            this.setState({
                messageSwapId: event.target.value
            });
        } else {
            alert("Message id can only be a number");
        }
    }

    archiveMessage(messageId, isArchived) {
        archiveMessage(messageId, this.props.name, isArchived);
    }

    deleteMessage(messageId) {
        deleteMessage(messageId, this.props.name);
    }

    render() {
        let sortedMessages = this.props.messages.slice().sort(function (x, y) {
            return x.isArchived - y.isArchived;
        });
        return (
            <div>
                <h2>{this.props.name}</h2>
                <input value={this.state.message} onChange={this.onChangeMessage}/>
                <button onClick={this.onMessageSubmit}>Submit message</button>
                <h4>Move message:</h4>
                <label>Name of the list you want to move it to:</label>
                <input value={this.state.messageSwapDestination}
                       onChange={this.onChangeMessageSwapDestinationListName}/>
                <label>Message id:</label>
                <input value={this.state.messageSwapId} onChange={this.onChangeMessageSwapId}/>
                <button onClick={this.submitSwapMessage}>Swap message</button>
                <h4>Messages:</h4>
                <ul>
                    {sortedMessages.map(function (message, index) {
                        return (<li><Message archive={this.archiveMessage} message={message}
                                             deleteMessage={this.deleteMessage}/></li>);
                    }.bind(this))}
                </ul>
            </div>
        );
    }
}
NamedList.propTypes = {
    messages: React.PropTypes.object,
    name: React.PropTypes.string,
    onSubmitMessage: React.PropTypes.func,
    onDeleteMessage: React.PropTypes.func,
    archiveMessage: React.PropTypes.func
};
