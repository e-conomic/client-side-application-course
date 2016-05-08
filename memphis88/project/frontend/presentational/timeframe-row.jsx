import React, {Component} from 'react'
import TimeframeCell from './timeframe-cell'

export default class AppointmnetTimeframe extends Component {
	constructor(props) {
		super(props)
		this.state = {
			start: this.props.start,
			end: this.props.end
		}
	}

	render() {
		const renderTimeframe = this.state.start + " - " + this.state.end;
		return (
			<tr>
				<td>{renderTimeframe}</td>

			</tr>
		)
	}
}
