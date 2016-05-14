import React, {Component} from 'react'

export default class CreateEvent extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const style = {
			display: this.props.visible? 'block' : 'none'
		}
		return (
			<div
			style={style}
			className="create-event">
			</div>
		)
	}
}

const defaults = {}

CreateEvent.defaultProps = { defaults: defaults }
