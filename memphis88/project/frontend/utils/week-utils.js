import moment from 'moment'
import { defaultDays } from '../constants/constants'


function generateWeek(weekMoment, weekMultiplier, days) {
	let updatedWeek = moment(weekMoment)
	if (!weekMultiplier) updatedWeek.active = true
	updatedWeek.day(1 + weekMultiplier * 7)
	updatedWeek.weekNumber = updatedWeek.isoWeek()
	updatedWeek.start = moment(updatedWeek).day(1).format('D/M')
	updatedWeek.end = moment(updatedWeek).day(5).format('D/M')
	generateDays(updatedWeek, days)
	return Object.assign({}, updatedWeek)
}

function generateDays(weekMoment, days) {
	days = days || defaultDays
	weekMoment.days = []
	for (let day of days) {
		day.date = moment(weekMoment).day(day.name).format('Do')
		weekMoment.days.push(Object.assign({}, day))
	}
}

export default class WeekUtils {
	constructor(weeksToRender, days) {
		this.weeks = []
		for (let i = 0; i < weeksToRender; i++) {
			let currentWeek = moment();
			this.weeks.push(generateWeek(currentWeek, i, days))
		}
	}

	getWeeks() {
		return this.weeks
	}
}
