import { combineReducers } from 'redux'
import comments from '../reducers/comments'

const riqraApp = combineReducers({
  comments,
})

export default riqraApp