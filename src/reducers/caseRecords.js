import {
  GET_CASE_RECORDS_REQUEST,
  GET_CASE_RECORDS_SUCCESS,
  GET_CASE_RECORDS_FAILURE,
} from '../actions/caseRecords'
import _map from 'lodash/map'

export const defaultState = {
  loading: false,
  caseRecords: [],
}

export default (state = defaultState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case GET_CASE_RECORDS_REQUEST:
      newState.loading = true
      return newState

    case GET_CASE_RECORDS_SUCCESS:
      newState.loading = false
      newState.caseRecords = _map(action.payload, (caseRecord) => {
        return Object.assign({}, caseRecord, {admin_region_3_id: parseInt(caseRecord.admin_region_3_id)});
      })
      return newState

    case GET_CASE_RECORDS_FAILURE:
      newState.loading = false
      return newState

    default:
      return state
  }
};
