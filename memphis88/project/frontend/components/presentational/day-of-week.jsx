import React, { Component } from 'react'

export default class DaysOfWeek extends Component {
	render() {
		const day = this.props.day
		return <th>{`${day.name} - ${day.date}`}</th>
	}
}
