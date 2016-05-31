import Constants from '../constants/constants'

function showForm(state = false, action) {
	switch (action.type) {
		case Constants.SHOW_APPOINTMENT_FORM:
			return {
				visible: true,
				start: action.start,
				end: action.end
			}
		case Constants.SUBMIT_APPOINTMENT_REQUEST:
			return Object.assign({}, state, { visible: false })
		case Constants.HIDE_APPOINTMENT_FORM:
		default:
			return {
				visible: false,
				start: undefined,
				end: undefined
			}
	}
}

export default showForm
