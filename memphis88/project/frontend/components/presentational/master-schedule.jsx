import React, {Component} from 'react'
import TimeframeRow from './timeframe-row'
import Appointment from '../container/appointment'
import Week from '../container/week'

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
				<Appointment />
				<table className="app-2-table">
					<Week />
					<tbody>
						<TimeframeRow
						start="8:00"
						end="8:30"
						events={[0,1,2]} />
					</tbody>
				</table>
			</div>
		)
	}
}
