import React, { Component } from 'react';
import { connect } from 'react-redux'
import CreateEvent from '../presentational/create-event'
import { hideAppointmentForm } from '../../actions'

class EventCreator extends Component {
	constructor(props) {
		super(props)
	}

	onSubmit(e) {
		console.log(e)
	}

	onClose(e) {
		console.log(e)
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
	const { visible } = form
	return {
		visible
	}
}

export default connect(mapStateToProps)(EventCreator);
