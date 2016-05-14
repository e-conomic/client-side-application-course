import React, { Component } from 'react'
import { connect } from 'react-redux'

export default class Appointments extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const { state, day, timeFrame } = this.props
		return (

		)
	}
}

const defaults = {}

function mapStateToProps(state) {

}

Appointments.defaultProps =  { defaults: defaults }
