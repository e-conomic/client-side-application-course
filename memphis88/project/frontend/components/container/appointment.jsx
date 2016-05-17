import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getWeekAppointments } from '../../actions'
import Constants from '../../constants/constants'

import TimeframeCell from '../presentational/timeframe-cell'

export default class Appointments extends Component {
	constructor(props) {
		super(props)
	}

	onClick() {
	}

	render() {
		const { appointment, startingDate } = this.props
		const { summary, status } = appointment
		let state
		switch(status) {
			case 'confirmed':
				state = Constants.STATUS_BUSY
				break
			case 'tentative':
				state = Constants.STATUS_PENDING
				break
			case undefined:
				state = Constants.STATUS_FREE
			default:
				state = Constants.STATUS_UNKNOWN
				break
		}
		return (
			<TimeframeCell
			status={state}
			onClick={this.onClick}
			name={summary}/>
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
