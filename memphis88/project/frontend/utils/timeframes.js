import later from 'later'
import moment from 'moment'
import {
	defaultDays
} from '../constants/constants'

const defaultDuration = 30
const defaulStart = '9:00 am'
const defaultEnd = '5:01 pm'

const defaultSchedule = `every ${defaultDuration} mins every weekday after ${defaulStart} before ${defaultEnd}`

const defaultRange = 2 * 8 * 5

later.date.localTime()

export default class Timeframe {
	constructor(schedule = defaultSchedule) {
		this.schedule = later.parse.text(schedule)
	}

	getWeekTimeframes(start, range = defaultRange) {
		let timeframesByDay = {
			days: {},
			masterTimeframes: []
		}
		for (let day of defaultDays) {
			timeframesByDay.days[day.name] = []
		}
		let occurrences = later.schedule(this.schedule).nextRange(range, start)
		for (let occurrence of occurrences) {
			for (let day of defaultDays) {
				if (day.name == moment(occurrence[0]).format('dddd')) {
					timeframesByDay.days[day.name].push(occurrence[0])
					timeframesByDay.days[day.name].push(occurrence[1])
					break
				}
			}
		}
		let max = 0
		let maxDay = ''
		for (let day in timeframesByDay.days) {
			if (max < day.length) {
				max = day.length
				maxDay = day.toString()
			}
		}
		for (let i = 0; i < timeframesByDay.days[maxDay].length/2; i++) {
			if(!timeframesByDay.days[maxDay][i*2+2]) break
			timeframesByDay.masterTimeframes.push({
				start: timeframesByDay.days[maxDay][i*2],
				end: timeframesByDay.days[maxDay][i*2+2]
			})
		}
		return timeframesByDay
	}

}
