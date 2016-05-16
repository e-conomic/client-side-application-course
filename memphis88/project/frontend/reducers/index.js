import appointments from './appointments'
import weeks from './weeks'
import timeframes from './timeframes'
import { combineReducers } from 'redux'

const reducers = combineReducers({
	appointments,
	timeframes,
	weeks
})

export default reducers
