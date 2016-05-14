import { Constants } from '../constants/Constants'

const events = {
	a: 'dummy',
	obj: 'with',
	silly: 'values'
}

const appointments = (state = [], action) => {
	switch(action.type) {
		case Constants.GET_WEEK_APPOINTMENTS:
			return [...state, events];
			break
		default
			return state
	}
}

export default appointments
