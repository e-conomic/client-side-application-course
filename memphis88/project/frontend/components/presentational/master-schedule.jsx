import React, {Component} from 'react'
import Week from '../container/week'
import Timeframes from '../container/timeframes'
import EventCreator from '../container/create-event'

export default class MasterSchedule extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h4>{this.props.title}</h4>
				<table className="app-2-table">
					<Week />
					<Timeframes />
				</table>
				<div><EventCreator /></div>
			</div>
		)
	}
}
