import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getWeekAppointments } from '../../actions'

import TimeframeCell from '../presentational/timeframe-cell'

export default class Appointments extends Component {
	constructor(props) {
		super(props)
	}

	onClick() {
	}

	render() {
		const { appointment, startingDate } = this.props
		return (
			<TimeframeCell />
		)
	}
}

// function mapStateToProps(state) {
// 	const { appointments } = state
// 	return {
// 		appointments
// 	}
// }

// export default connect(mapStateToProps)(Appointments)
