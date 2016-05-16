import Constants from '../constants/constants'
import WeekUtils from '../utils/week-utils'

const upcomingFiveWeeks = new WeekUtils(5).getWeeks()

const defaultDays = [{
	name: 'Monday'
}, {
	name: 'Tuesday'
}, {
	name: 'Wednesday'
}, {
	name: 'Thursday'
}, {
	name: 'Friday'
}]

for (let week of upcomingFiveWeeks) {
	week.days = defaultDays
}

function weeks(state = upcomingFiveWeeks, action) {
	switch (action.type) {
		case Constants.GET_WEEK_APPOINTMENTS:
			let newActive = makeActive(state, action)
			return [...days(newActive, action)]
		default:
			return state
	}
}

function days(state = [], action) {
	switch (action.type) {
		case Constants.GET_WEEK_APPOINTMENTS:
			let date
			let newState = []
			let newWeek = {}
			console.log(state)
			for (let week of state) {
				date = `${week.getDate()} - ${week.getMonth()}`
				newWeek = Object.assign({}, week)
				newWeek.date = date
				newState.push(newWeek)
			}
			console.log(newState)
			return [...newState]
		default:
			return state
	}
}

function makeActive(state = [], action) {
	switch (action.type) {
		case Constants.GET_WEEK_APPOINTMENTS:
			let newWeek = {}
			let newState = []
			for (let week of state) {
				if (week.getWeek() == action.week) {
					Object.assign({}, week, {
						active: true
					})
				} else {
					Object.assign({}, week, {
						active: false
					})
				}
			}
			return [...newState]
		default:
			return state
	}
}

export default weeks
