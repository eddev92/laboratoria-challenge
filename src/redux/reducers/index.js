import { combineReducers } from 'redux'
import auth from './login'
import reset from './reset'
import home from './home'

const laboratoriaApp = combineReducers({
  auth,
  reset,
  home
})

export default laboratoriaApp