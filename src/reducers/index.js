import { combineReducers } from 'redux'
import homeReducer from './home/homeReducer.js'

const allReducers = combineReducers({
  homeReducer
})

export default allReducers