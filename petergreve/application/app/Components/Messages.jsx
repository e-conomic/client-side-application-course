import React, {Component} from 'react';
import ListDropdownContainer from './ListDropdownContainer';

export default class Messages extends Component {
	static propTypes = { messages: React.PropTypes.array, handleArchiveClick: React.PropTypes.func, handleDeleteClick: React.PropTypes.func };

	render() {
		return (
			<div>
		        {this.props.messages.map((message,i) => {
			        return <div key={i}>
			                    {message.translation == '' ? message.text : message.translation}
			                    <button type="button" onClick={this.props.handleDeleteClick.bind(null, message)}>Delete</button>
			                    <button type="button" onClick={this.props.handleArchiveClick.bind(null, message)}>Archive</button>
			                    <ListDropdownContainer message={message} />
			                </div>;
			    },this)}
			</div>
		)
    }
}