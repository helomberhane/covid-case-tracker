import axiosClient from '../utils/axios'

export const GET_MEDICAL_FACILITY_RECORDS_REQUEST = 'GET_MEDICAL_FACILITY_RECORDS_REQUEST'
export function getMedicalFacilityRecordsRequest() {
  return {
    type: GET_MEDICAL_FACILITY_RECORDS_REQUEST,
  }
}

export const GET_MEDICAL_FACILITY_RECORDS_SUCCESS = 'GET_MEDICAL_FACILITY_RECORDS_SUCCESS'
export function getMedicalFacilityRecordsSuccess(medicalFacilityRecords) {
  return {
    type: GET_MEDICAL_FACILITY_RECORDS_SUCCESS,
    payload: medicalFacilityRecords,
  }
}

export const GET_MEDICAL_FACILITY_RECORDS_FAILURE = 'GET_MEDICAL_FACILITY_RECORDS_FAILURE'
export function getMedicalFacilityRecordsFailure(error) {
  return {
    type: GET_MEDICAL_FACILITY_RECORDS_FAILURE,
    payload: error,
  }
}

export function getMedicalFacilityRecords() {
  return (dispatch) => {
    dispatch(getMedicalFacilityRecordsRequest())
    return axiosClient
      .get(`https://sheetsu.com/apis/v1.0su/97079a6a1458/`)
      .then((response) => {
        dispatch(getMedicalFacilityRecordsSuccess(response.data))
      })
      .catch((error) => {
        dispatch(getMedicalFacilityRecordsFailure(error))
      })
  }
}
