import React, {Component} from 'react'
import Constants from '../constants/Constants'

export default class TimeframeCell extends Component {
	constructor(props) {
		super(props)
		this.state = {
			status: this.props.status
		}
	}

	render() {
		return (
			<td>
			</td>
		)
	}
}

TimeframeCell.defaultProps = { status: Constants.STATUS_UNKNOWN }
