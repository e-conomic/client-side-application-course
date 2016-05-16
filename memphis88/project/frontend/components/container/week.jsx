import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getWeekAppointments } from '../../actions'
import WeekSelector from '../presentational/week-selector'
import DayOfWeek from '../presentational/day-of-week'

class Week extends Component {
	constructor(props) {
		super(props)
	}

	onWeekSelect(e) {
		this.props.dispatch(getWeekAppointments(e.target.value))
	}

	render() {
		function renderDaysOfWeek(week) {
			let render = []
			if (week.active) {
				for (let day of week.days) {
					render.push(<DayOfWeek day={day} />)
				}
			}
			return render
		}
		return (
			<thead>
				<tr>
					<th>
						<WeekSelector
						weeks={this.props.weeks}
						onChange={this.onWeekSelect.bind(this)} />
					</th>
					{this.props.weeks.map(renderDaysOfWeek)}
				</tr>
			</thead>
		)
	}
}

function mapStateToProps(state) {
	const { weeks } = state
	return {
		weeks
	}
}

export default connect(mapStateToProps)(Week)
