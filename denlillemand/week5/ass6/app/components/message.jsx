import React from 'react';
import { swapMessage, deleteMessage, archiveMessage } from '../actioncreators/listactions';

export default class Message extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            swapDestinationList: props.listName
        };
        this.deleteMessage = this.deleteMessage.bind(this);
        this.archive = this.archive.bind(this);
        this.swapMessage = this.swapMessage.bind(this);
        this.changeSwapDestinationList = this.changeSwapDestinationList.bind(this);
    }

    swapMessage(event) {
        swapMessage(this.props.message.id, this.state.swapDestinationList, this.props.listName);
    }

    deleteMessage(event) {
        deleteMessage(this.props.message.id, this.props.listName);
    }

    archive(event) {
        let message = this.props.message;
        archiveMessage(message.id, this.props.listName, message.isArchived);
    }

    changeSwapDestinationList(event) {
        this.setState({
            swapDestinationList:event.target.value
        });
    }

    render() {
        const { id, text, isArchived } = this.props.message;
        return (
            <div>
                {id}:
                {text}:
                {isArchived ? "ARCHIVED" : "NOT ARCHIVED"}
                <button onClick={this.archive}>{isArchived ? "Unarchive" : "Archive"}</button>
                <button onClick={this.deleteMessage}>Delete</button>
                <select onChange={this.changeSwapDestinationList} value={this.state.swapDestinationList}>
                    {this.props.namedLists.map((namedList, index, array) => {
                       return (<option value={namedList.name}>{namedList.name}</option>);
                    })}
                </select>
                <button onClick={this.swapMessage}>Swap</button>
            </div>
        );
    }
}
Message.propTypes = {
    deleteMessage: React.PropTypes.func,
    message: React.PropTypes.object,
    archive: React.PropTypes.func,
    listName: React.PropTypes.string,
    namedLists: React.PropTypes.object
};
