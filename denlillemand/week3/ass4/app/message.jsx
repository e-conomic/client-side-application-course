import React from 'react';
export default class Message extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.deleteMessage = this.deleteMessage.bind(this);
        this.archive = this.archive.bind(this);
    }

    deleteMessage(event) {
        this.props.deleteMessage(this.props.message.id);
    }

    archive(event) {
        let message = this.props.message;
        this.props.archive(message.id, message.archived);
    }

    render() {
        return (
        <div>
		        {this.props.message.id}:
		        {this.props.message.text}:
		        {this.props.message.archived ? 'ARCHIVED' : 'NOT ARCHIVED'}
		        <button onClick={this.archive}>{this.props.message.archived ? 'Unarchive' : 'Archive'}</button>
		        <button onClick={this.deleteMessage}>Delete</button>
	            </div>

        );
    }
}
Message.propTypes = {
    deleteMessage: React.PropTypes.func,
    message: React.PropTypes.object,
    archive: React.PropTypes.func,
};
