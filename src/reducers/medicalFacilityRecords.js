import {
  GET_MEDICAL_FACILITY_RECORDS_REQUEST,
  GET_MEDICAL_FACILITY_RECORDS_SUCCESS,
  GET_MEDICAL_FACILITY_RECORDS_FAILURE,
} from '../actions/medicalFacilityRecords'
import _map from 'lodash/map'

export const defaultState = {
  loading: false,
  medicalFacilityRecords: [],
}

export default (state = defaultState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case GET_MEDICAL_FACILITY_RECORDS_REQUEST:
      newState.loading = true
      return newState

    case GET_MEDICAL_FACILITY_RECORDS_SUCCESS:
      newState.loading = false
      newState.medicalFacilityRecords = _map(action.payload, (medicalFacilityRecord) => {
        return Object.assign({}, medicalFacilityRecord, {
          osm_id: parseInt(medicalFacilityRecord.osm_id),
          admin_region_3_id: parseInt(medicalFacilityRecord.admin_region_3_id),
          latitude: parseFloat(medicalFacilityRecord.latitude),
          longitude: parseFloat(medicalFacilityRecord.longitude),
        });
      })
      return newState

    case GET_MEDICAL_FACILITY_RECORDS_FAILURE:
      newState.loading = false
      return newState

    default:
      return state
  }
};
