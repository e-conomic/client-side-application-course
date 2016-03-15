var React = require('react');
var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions');

import NotificationBar from '../components/notification-bar'

var NotificationBox = React.createClass({
	getInitialState : function() {
		return {notifications : MessageStore.getNotifications()}
	},
	dismissNotification : function() {
		MessageActions.dismissNotification(this.props.id)
	},
	componentDidMount : function() {
		MessageStore.addChangeListener(this._onChange);
	},
	componentWillUnmount : function() {
		MessageStore.removeChangeListener(this._onChange);
	},
	_onChange : function(){
		this.setState({notifications : MessageStore.getNotifications()})
	},
	render : function(){
		if(this.state.notifications.length > 0){
			var notifications = this.state.notifications.map(function(notification){
				return (
					<NotificationBar key={notification.id} message={notification.message} isError={notification.isError} onDismissed={this.dismissNotification} />
				)
			}.bind(this))
			return (
				<div>
					{notifications}
				</div>
				)
		} else {
			return (
				null
			)
		}
	}
});

module.exports = NotificationBox;