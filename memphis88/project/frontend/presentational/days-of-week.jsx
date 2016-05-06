import React from 'react'

export default class DaysOfWeek extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			days: this.props.days
		}
	}
	render() {
		let dayIndex = 0;
		let renderDay = (day) => {
			dayIndex++;
			return <th key={dayIndex}>{day}</th>
		}
		return (
			<thead>
				<tr><th></th>{this.state.days.map(renderDay)}</tr>
			</thead>
		)
	}
}

const days = [
	'Monday',
	'Tuesday',
	'Wednseday',
	'Thursday',
	'Friday'
]

DaysOfWeek.defaultProps = { days: days }
