import React from 'react';
import ReactDOM from 'react-dom';

import MasterSchedule from 'presentational/master-schedule';

class ApplicationWrapper extends React.Component {
	render() {
		return <MasterSchedule wat="wat" />;
	}
}

ReactDOM.render(
	<ApplicationWrapper />,
	document.getElementById('app')
);
