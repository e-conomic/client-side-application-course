import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import MasterSchedule from './components/presentational/master-schedule';
import configureStore from './store/configure-store'

import './style/index.scss'

const store = configureStore()

class ApplicationWrapper extends React.Component {
	render() {
		return (
			<MasterSchedule title="An awesome appointment application" />
		)
	}
}

ReactDOM.render(
	<Provider store={store}>
		<ApplicationWrapper />
	</Provider>,
	document.getElementById('app')
)
