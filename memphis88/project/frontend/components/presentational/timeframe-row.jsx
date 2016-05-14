import React, {Component} from 'react'
import TimeframeCell from './timeframe-cell'

export default class AppointmnetTimeframe extends Component {
	constructor(props) {
		super(props)
	}

	onClick() {

	}

	render() {
		const renderTimeframe = this.props.start + " - " + this.props.end;
		const renderEvents = (evt) => {
			return (
				<TimeframeCell
				visible
				color="red"
				onClick={this.onClick}
				/>
			)
		}
		return (
			<tr>
				<td>{renderTimeframe}</td>
				{this.props.events.map(renderEvents)}
			</tr>
		)
	}
}
