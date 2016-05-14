import Constants from '../constants/Constants'

export function getWeekAppointments(week, year = new Date.getYear()) {
	return {
		type: Constants.GET_WEEK_APPOINTMENTS,
		week: week,
		year: year
	}
}
