import React, { Component } from 'react';
import { connect } from 'react-redux'
import CreateEvent from '../presentational/create-event'
import { hideAppointmentForm, submitAppointmentRequest } from '../../actions'

class EventCreator extends Component {
	onSubmit(name, phone, email) {
		const { start, end } = this.props
		this.props.dispatch(submitAppointmentRequest(name, phone, email, start, end))
	}

	onClose(e) {
		this.props.dispatch(hideAppointmentForm())
	}

	render() {
		const { visible } = this.props
		return <CreateEvent
				visible={visible}
				onSubmit={this.onSubmit.bind(this)}
				onClose={this.onClose.bind(this)} />
	}
}

function mapStateToProps(state) {
	const { form } = state
	const { visible, start, end } = form
	return {
		visible,
		start,
		end
	}
}

export default connect(mapStateToProps)(EventCreator);
