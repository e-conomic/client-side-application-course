import React, {Component} from 'react'

export default class CreateEvent extends Component {
	onSubmit() {
		const { name, phone, email } = this.refs
		this.props.onSubmit(name.value, phone.value, email.value)
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
				<label for="name">Name</label>
				<input id="name" ref="name" type="text"></input>
				<label id="phone">Phone</label>
				<input id="phone" ref="phone" type="text"></input>
				<label id="email">email</label>
				<input id="email" ref="email" type="text"></input>
				<button onClick={this.onSubmit.bind(this)}>Request appointment</button>
				<button type="button" dangerouslySetInnerHTML={{__html: '&times;'}}
				onClick={this.onClose.bind(this)}></button>
			</div>
		)
	}
}
