import React from 'react';
import ReactDOM from 'react-dom';

var NotificationBar = React.createClass({

	render: function() {
		const barStyle = {
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

		const closeBtnStyle = {
			marginLeft: '20px',
			color: 'blue',
			cursor: 'pointer',
		}

		return <div style={barStyle}>
			{this.props.message}
			<a style={closeBtnStyle} onClick={this.props.onDismissed}>close</a>
		</div>
	}

});

module.exports = NotificationBar;