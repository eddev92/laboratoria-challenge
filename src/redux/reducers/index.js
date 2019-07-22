import { combineReducers } from 'redux'
import auth from './login'

const laboratoriaApp = combineReducers({
  auth,
})

export default laboratoriaApp