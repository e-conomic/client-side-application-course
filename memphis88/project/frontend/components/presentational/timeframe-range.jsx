import React, { Component } from 'react'
import moment from 'moment'

export default class TimeframeRange extends Component {
	render() {
		return <td>
			{`${moment(this.props.start).format('k:mm')}
			 - ${moment(this.props.end).format('k:mm')}`}
		</td>
	}
}
