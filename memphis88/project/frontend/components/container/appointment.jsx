import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getWeekAppointments } from '../../actions'
import Constants from '../../constants/constants'

import TimeframeCell from '../presentational/timeframe-cell'

export default class Appointments extends Component {
	constructor(props) {
		super(props)
	}

	onClick(e) {
		this.props.onClick(e)
	}

	render() {
		const { appointment, startingDate } = this.props
		let state
		const { summary, status } = appointment||{
			status: undefined
		}
		switch(status) {
			case 'confirmed':
				state = Constants.STATUS_BUSY
				break
			case 'tentative':
				state = Constants.STATUS_PENDING
				break
			case undefined:
				state = Constants.STATUS_FREE
				break
			default:
				state = Constants.STATUS_UNKNOWN
				break
		}
		return (
			<TimeframeCell
			status={state}
			onClick={this.onClick.bind(this)} />
		)
	}
}
