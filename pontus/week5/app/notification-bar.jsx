let React = require('react');
let ReactDom = require('react-dom');

const NotificationBar = React.createClass({

	propTypes: {
		message: React.PropTypes.string.isRequired,
		isError: React.PropTypes.bool,
		onDismissed: React.PropTypes.func.isRequired,
	},

	render: function() {

		console.log(this.props.isVisibleNotificationbar);
		
		let barStyle = (this.props.visible) ?  { position: 'absolute', top: 0, left: 0, padding: '20px', backgroundColor: this.props.isError ? '#FF6666' : '#66FF6B', width: '100%', textAlign: 'center', fontSize: '20px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', marginBottom: '1em' } : {display: 'none' } ;

		const closeBtnStyle = {
			marginLeft: '20px',
			color: 'blue',
			cursor: 'pointer',
		};

		return <div style={barStyle}>
			{this.props.message}
			<a style={closeBtnStyle} onClick={this.props.onDismissed}>close</a>
		</div>
	}

});

module.exports = NotificationBar;
