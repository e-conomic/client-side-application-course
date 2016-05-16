import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getWeekAppointments } from '../../actions'

class Appointments extends Component {
	constructor(props) {
		super(props)
	}

	onClick() {
	}

	render() {
		const { status, day, timeFrame } = this.props
		return (
			<div>
				<span>{status}</span>
				<span>{day}</span>
				<span>{timeFrame}</span>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { appointments } = state
	// appointments.reduce((status, day, timeFrame) => )
	return {
		// status,
		// day,
		// timeFrame
		appointments
	}
}

export default connect(mapStateToProps)(Appointments)
