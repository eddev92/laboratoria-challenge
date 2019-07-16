import { combineReducers } from 'redux'
import auth from './login'

const riqraApp = combineReducers({
  auth,
})

export default riqraApp