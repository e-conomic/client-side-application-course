import appointments from './appointments'
import weeks from './weeks'
import { combineReducers } from 'redux'

const reducers = combineReducers({
	appointments,
	weeks
})

export default reducers
