import Constants from '../constants/constants'

export function getWeekAppointments(week, year) {
	return {
		type: Constants.GET_WEEK_APPOINTMENTS,
		week: week,
		year: year
	}
}
