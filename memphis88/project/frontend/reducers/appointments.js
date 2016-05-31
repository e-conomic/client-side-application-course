import Constants from '../constants/constants'

function appointments(state = [], action) {
	switch (action.type) {
		case Constants.GET_WEEK_APPOINTMENTS:
			return [...action.events.data.items];
			break
		default:
			return state
	}
}

export default appointments
