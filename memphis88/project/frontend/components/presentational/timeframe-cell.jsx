import React, {Component} from 'react'
import Constants from '../../constants/constants'

export default class TimeframeCell extends Component {
	click() {
		this.props.onClick()
	}

	getClass(status) {
		let className = {}
		switch(status) {
			case Constants.STATUS_PENDING:
				className = 'pending'
				break
			case Constants.STATUS_UNKNOWN:
				className = 'unknown'
				break
			case Constants.STATUS_BUSY:
				className = 'busy'
				break
			case Constants.STATUS_FREE:
				className = 'free'
				break
			default:
				className = 'unknown'
				break
		}
		return className;
	}

	render() {
		const className = this.getClass(this.props.status)
		return (
			<td className={className} onClick={this.click.bind(this)}>
			</td>
		)
	}
}
