import React from 'react';
import ReactDOM from 'react-dom';

const NotificationBar = React.createClass({

	propTypes: {
		message: React.PropTypes.string.isRequired,
		isError: React.PropTypes.bool,
		onDismissed: React.PropTypes.func.isRequired,
	},

	render: function() {

		const notificationBarStyle = {
			position: 'absolute',
			top: 0,
			left: 0,
			padding: '20px',
			backgroundColor: this.props.isError ? '#FF6666' : '#66FF6B',
			width: '100%',
			textAlign: 'center',
			fontSize: '20px',
			fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
		}

		return <div style={notificationBarStyle}>
			{this.props.message}
			<a onClick={this.props.onDismissed}>close</a>
		</div>
	}

});

export default NotificationBar;