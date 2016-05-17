import React, {Component} from 'react'
import Constants from '../../constants/constants'

export default class TimeframeCell extends Component {
	constructor(props) {
		super(props)
	}

	click(e) {
		this.props.onClick(e)
	}

	getColor(status) {
		let style = {}
		switch(status) {
			case Constants.STATUS_PENDING:
				style = {
					backgroundColor: 'orange'
				}
				break
			case Constants.STATUS_UNKNOWN:
				style = {
					backgroundColor: 'gray'
				}
				break
			case Constants.STATUS_BUSY:
				style = {
					backgroundColor: 'red'
				}
				break
			case Constants.STATUS_FREE:
				style = {
					backgroundColor: 'green'
				}
				break
			default:
				style = {
					backgroundColor: 'gray'
				}
				break
		}
		return style;
	}

	render() {
		const style = this.getColor(this.props.status)
		const { name } = this.props
		return (
			<td style={style} onClick={this.click.bind(this)}>
				{name}
			</td>
		)
	}
}
