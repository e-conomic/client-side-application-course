import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import TimeframeRange from '../presentational/timeframe-range'
import TimeframeCell from '../presentational/timeframe-cell'
import Appointment from './appointment'
import { initializeTimeframes } from '../../actions'
import { defaultDays } from '../../constants/constants'

class Timeframes extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const { dispatch } = this.props
		for (let week of this.props.weeks) {
			if (week.active) {
				dispatch(initializeTimeframes(week))
			}
		}
	}

	render() {
		function renderBody(timeframe) {
			return (
				<tr key={timeframe.start}>
					<TimeframeRange
					key={timeframe.start}
					start={timeframe.start}
					end={timeframe.end} />
					{defaultDays.map((day) => {
						const cDay = moment(timeframe.start).day(day.name)
						for (let ap of this.props.appointments) {
							const apTime = moment(ap.start.dateTime)
							if (apTime.isSame(cDay)) {
								return renderAppointment(ap, cDay)
							} else {
								return (<td></td>)
							}
						}
					})}
				</tr>
			)
		}
		function renderAppointment(appointment, start) {
			return (
				<Appointment
				appointment={appointment}
				startingDate={start} />
			)
		}
		const tfs = this.props.timeframes.masterTimeframes
		return (
			<tbody>
				{tfs? tfs.map(renderBody, this):<tr></tr>}
			</tbody>
		)
	}
}

function mapStateToProps(state) {
	const { weeks, timeframes, appointments } = state
	return {
		weeks,
		timeframes,
		appointments
	}
}

export default connect(mapStateToProps)(Timeframes)
