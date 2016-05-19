import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import TimeframeRange from '../presentational/timeframe-range'
import TimeframeCell from '../presentational/timeframe-cell'
import Appointment from './appointment'
import { initializeTimeframes, getWeekAppointments } from '../../actions'
import { defaultDays } from '../../constants/constants'
import { showAppointmentForm } from '../../actions'

class Timeframes extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		for (let week of this.props.weeks) {
			if (week.active) {
				dispatch(initializeTimeframes(week))
				dispatch(getWeekAppointments(week))
			}
		}
	}

	onTimeFrameSelect(start, end) {
		this.props.dispatch(showAppointmentForm(start, end))
	}

	render() {
		function renderBody(timeframe) {
			return (
				<tr key={timeframe.start}>
					<TimeframeRange
					key={timeframe.start}
					start={timeframe.start}
					end={timeframe.end} />
					{
						defaultDays.map((day) => {
							const start = moment(timeframe.start).day(day.name)
							const end = moment(timeframe.end).day(day.name)
							let appointment
							for (let ap of this.props.appointments) {
								const apTime = moment(ap.start.dateTime)
								if (apTime.isSame(start)) {
									appointment = ap
								}
							}
							return <Appointment
									key={start.format('DDHHMM')}
									appointment={appointment}
									startingDate={start}
									endingDate={end}
									onClick={this.onTimeFrameSelect.bind(this, start, end)} />
						})
					}
				</tr>
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
