import React, {Component} from 'react';

export default class ArchivedMessages extends Component {
	static propTypes = { messages: React.PropTypes.array, handleUnarchiveClick: React.PropTypes.func };

	render() {
        var style = {
            color: 'blue',
        };

		return (
			<div>
		        {this.props.messages.map((message,i) => {
			        return <div key={i} style={style}>
			                    {message.translation == '' ? message.text : message.translation}
                                <button type="button" onClick={this.props.handleUnarchiveClick.bind(null, message)}>Unarchive</button>
			                </div>;
			    },this)}
			</div>
		)
    }
}