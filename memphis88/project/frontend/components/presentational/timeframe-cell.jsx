import React, {Component} from 'react'
import Constants from '../../constants/constants'

export default class TimeframeCell extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: this.props.visible,
			color: this.props.color
		}
	}

	click(e) {
		this.props.onClick(e)
	}

	getColor(status) {
		let style = {}
		switch(status) {
			case Constants.STATUS_PENDING:
				style = {
					color: 'orange'
				}
				break
			case Constants.STATUS_UNKNOWN:
				style = {
					color: 'gray'
				}
				break
			case Constants.STATUS_BUSY:
				style = {
					color: 'red'
				}
				break
			case Constants.STATUS_FREE:
				style = {
					color: 'green'
				}
				break
			default:
				break
		}
		return style;
	}

	render() {
		const style = {
			backgroundColor: this.state.color
		}
		return (
			<td style={style} onClick={this.click.bind(this)}>
				Content
			</td>
		)
	}
}

TimeframeCell.defaultProps = {
	status: Constants.STATUS_UNKNOWN,
	visible: true
}
