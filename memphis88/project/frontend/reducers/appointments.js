import Constants from '../constants/constants'

const events = [{
	status: 'dummy',
	day: 'with',
	timeFrame: 'values'
}]

function appointments(state = events, action) {
	switch(action.type) {
		case Constants.GET_WEEK_APPOINTMENTS:
			return [...state, action.events];
			break
		default:
			return state
	}
}

export default appointments
