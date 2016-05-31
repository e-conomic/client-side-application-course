import React, { Component } from 'react';

class WeekSelector extends Component {
	onChange(e) {
		this.props.onChange(e)
	}

	render() {
		function renderOptions(week) {
			return (
				<option
				value={week.weekNumber}
				key={week.weekNumber}>
					{`Week: ${week.weekNumber} / (${week.start} - ${week.end})`}
				</option>
			)
		}
		return (
			<select onChange={this.onChange.bind(this)}>
				{this.props.weeks.map(renderOptions)}
			</select>
		)
	}
}

export default WeekSelector;
