import React, {Component} from 'react'
import DaysOfWeek from './days-of-week'
import TimeframeRow from './timeframe-row'

export default class MasterSchedule extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: this.props.title
		}
	}

	render() {
		return (
			<div>
				<h4>{this.state.title}</h4>
				<table className="app-2-table">
					<DaysOfWeek />
					<tbody>
						<TimeframeRow start="8:00" end="8:30" />
					</tbody>
				</table>
			</div>
		)
	}
}
