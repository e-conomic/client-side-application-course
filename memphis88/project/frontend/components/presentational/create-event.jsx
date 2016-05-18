import React, {Component} from 'react'

export default class CreateEvent extends Component {
	constructor(props) {
		super(props)
	}

	onSubmit(e) {
		console.log(e)
		this.props.onSubmit(e)
	}

	onClose(e) {
		console.log(e)
		this.props.onClose(e)
	}

	render() {
		const style = {
			display: this.props.visible? 'block' : 'none'
		}
		return (
			<div
			style={style}
			className="create-event">
				<label>Name</label>
				<input type="text"></input>
				<label>Phone</label>
				<input type="text"></input>
				<button onSubmit={this.onSubmit.bind(this)}>Request appointment</button>
				<button type="button" dangerouslySetInnerHTML={{__html: '&times;'}}
				onClose={this.onClose.bind(this)}></button>
			</div>
		)
	}
}
