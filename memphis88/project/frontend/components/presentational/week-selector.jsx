import React, { Component } from 'react';

class WeekSelector extends Component {
	constructor(props) {
		super(props)
	}

	onChange(e) {
		this.props.onChange(e)
	}

	render() {
		function renderOptions(week) {
			return (
				<option
				value={week.getWeek()}
				key={week.getWeek()}>
					{`${week.getWeek()} / ${week.start} - ${week.end}`}
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
