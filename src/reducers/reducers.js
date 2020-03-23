import { combineReducers } from 'redux'
import caseRecords from './caseRecords'
import medicalFacilityRecords from './medicalFacilityRecords'

const rootReducer = combineReducers({
  caseRecords,
  medicalFacilityRecords,
})

export default rootReducer;
