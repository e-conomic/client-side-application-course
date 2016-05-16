import React, { Component } from 'react'
import moment from 'moment'

export default class TimeframeRange extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <td>
			{`${moment(this.props.start).format('k:mm')}
			 - ${moment(this.props.end).format('k:mm')}`}
		</td>
	}
}
