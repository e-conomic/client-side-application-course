import later from 'later'

const defaultSchedule = `every weekday every 30 minutes
after 9:00 am before 5:00 pm`
later.date.localTime()

export default class Timeframe {
	constructor(schedule = defaultSchedule) {
		this.schedule = later.parse.text(schedule)
	}
	getNextTen() {
		return later.schedule(this.schedule).next(40)
	}
}


let test = new Timeframe()
console.log(test.getNextTen())
