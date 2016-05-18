import Constants from '../constants/constants'

function showForm(state = false, action) {
	switch(action.type) {
		case Constants.SHOW_APPOINTMENT_FORM:
			return { visible: true }
			break
		case Constants.HIDE_APPOINTMENT_FORM:
			return { visible: false }
		default:
			return { visible: false }
	}
}

export default showForm
