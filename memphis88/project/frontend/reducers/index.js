import appointments from './appointments'
import weeks from './weeks'
import timeframes from './timeframes'
import form from './form'
import { combineReducers } from 'redux'

const reducers = combineReducers({
	appointments,
	timeframes,
	weeks,
	form
})

export default reducers
