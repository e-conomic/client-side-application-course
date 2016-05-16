import TimeframeUtils from '../utils/timeframes'
import Constants, { defaultDays } from '../constants/constants'
import moment from 'moment'


const tfUtils = new TimeframeUtils()

function timeframes(state = {}, action) {
	switch (action.type) {
		case Constants.INITIALIZE_TIMEFRAMES:
			let initTfs = tfUtils.getWeekTimeframes(action.start)
			return initTfs
		case Constants.GET_WEEK_APPOINTMENTS:
			let newStart = moment().isoWeek(action.week).hours(0).toDate()
			let updTfs = tfUtils.getWeekTimeframes(newStart)
			return updTfs
		default:
			return state
	}
}

export default timeframes
