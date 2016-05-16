Date.prototype.getWeek = function() {
	const date = new Date(this.getTime())
	date.setHours(0, 0, 0, 0)
	date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
	const week1 = new Date(date.getFullYear(), 0, 4)
	return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

function getMonday(d) {
	d = new Date(d)
	const day = d.getDay()
	let diff = d.getDate() - day + (day == 0 ? -6 : 1)
	return new Date(d.setDate(diff))
}

function getSunday(d) {
	d = new Date(d)
	const day = d.getDay()
	let diff = d.getDate() - day + (day != 0 ? -6 : 0)
	return new Date(d.setDate(diff))
}

export default class WeekUtils {
	constructor(weeksToRender) {
		this.weeks = []
		for (let i = 0; i < weeksToRender; i++) {
			const currentDate = new Date()
			let updatedDate
			updatedDate = new Date()
			if (!i) updatedDate.active = true
			updatedDate.setDate(currentDate.getDate() + i * 7)
			let monday = getMonday(updatedDate)
			let buffer = `${monday.getDate()}-${monday.getMonth()+1}`
			updatedDate.start = buffer
			let sunday = getSunday(updatedDate)
			buffer = `${sunday.getDate()}-${sunday.getMonth()+1}`
			updatedDate.end = buffer
			this.weeks.push(updatedDate)
		}
	}

	getWeeks() {
		return this.weeks
	}
}
