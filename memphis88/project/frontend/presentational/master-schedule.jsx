import React from 'react';

class MasterSchedule extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			testing: this.props.wat
		}
	}
	render() {
		return <h4>{this.state.testing}</h4>;
	}
}

export default MasterSchedule;
