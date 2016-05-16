import Constants from '../constants/constants'
import moment from 'moment'
import axios from 'axios'

export function getWeekAppointments(week, year) {
	return dispatch => {
		axios.get(`http://localhost:8080/week/${week}?year=${year||''}`)
		.then((response) => {
			dispatch({
				type: Constants.GET_WEEK_APPOINTMENTS,
				week: week,
				events: response
			})
		})
		.catch((error) => {
			console.log(error)
		})
	}
}

export function initializeTimeframes(start) {
	start = moment(start).hours(0).toDate()
	return {
		type: Constants.INITIALIZE_TIMEFRAMES,
		start: start
	}
}
