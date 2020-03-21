import { combineReducers } from 'redux'
import auth from './auth'
import caseRecords from './caseRecords'

const rootReducer = combineReducers({
  auth,
  caseRecords,
})

export default rootReducer;
