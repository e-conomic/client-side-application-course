import Constants from '../constants/constants'
import WeekUtils from '../utils/week-utils'

const upcomingFiveWeeks = new WeekUtils(5).getWeeks()

function weeks(state = upcomingFiveWeeks, action) {
	switch (action.type) {
		case Constants.INITIALIZE_TIMEFRAMES:
		case Constants.GET_WEEK_APPOINTMENTS:
			return makeActiveWeek(state, action)
		default:
			return state
	}
}

function makeActiveWeek(state = [], action) {
	switch (action.type) {
		case Constants.GET_WEEK_APPOINTMENTS:
			let newState = []
			for (let week of state) {
				let newWeek = {}
				if (week.weekNumber == action.week) {
					Object.assign(newWeek, week, {
						active: true
					})
				} else {
					Object.assign(newWeek, week, {
						active: false
					})
				}
				newState.push(newWeek)
			}
			return [...newState]
		default:
			return state
	}
}

export default weeks
