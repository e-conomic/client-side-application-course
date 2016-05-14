import React from 'react';
import ReactDOM from 'react-dom';

import MasterSchedule from './components/presentational/master-schedule';

import './style/index.scss'

class ApplicationWrapper extends React.Component {
	render() {
		return <MasterSchedule title="A test title" />;
	}
}

ReactDOM.render(
	<ApplicationWrapper />,
	document.getElementById('app')
)
