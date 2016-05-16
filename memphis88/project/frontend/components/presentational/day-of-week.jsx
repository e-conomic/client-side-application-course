import React, { Component } from 'react'

export default class DaysOfWeek extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const day = this.props.day
		return <th>{`${day.name} - ${day.date}`}</th>
	}
}
