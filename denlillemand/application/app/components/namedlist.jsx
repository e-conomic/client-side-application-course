import React from 'react';
import Message from './message.jsx';
import listActions from '../actioncreators/listactions';

export default class NamedList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: "",
            messageId: 1
        };
        this.onMessageSubmit = this.onMessageSubmit.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
    }

    onChangeMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    onMessageSubmit(event) {
        listActions.createMessage(this.state.message, this.props.namedList.name);
        this.setState({
            message: ""
        });
    }

    render() {
        let sortedMessages = this.props.namedList.messages.sort(function (x, y) {
            return x.isArchived - y.isArchived;
        });
        return (
            <div>
                <h2>{this.props.namedList.name}</h2>
                <input value={this.state.message} onChange={this.onChangeMessage}/>
                <button onClick={this.onMessageSubmit}>Submit message</button>
                <h4>Messages:</h4>
                <ul>
                    {sortedMessages.map((message, index, array) => {
                        return (<li><Message message={message} namedLists={this.props.namedLists}/>
                        </li>);
                    })}
                </ul>
            </div>
        );
    }
}
NamedList.propTypes = {
    namedList: React.PropTypes.object,
    onSubmitMessage: React.PropTypes.func,
    onDeleteMessage: React.PropTypes.func,
    archiveMessage: React.PropTypes.func,
    namedLists: React.PropTypes.array
};
