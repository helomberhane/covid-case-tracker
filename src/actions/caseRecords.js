import axiosClient from '../utils/axios'

export const GET_CASE_RECORDS_REQUEST = 'GET_CASE_RECORDS_REQUEST'
export function getCaseRecordsRequest() {
  return {
    type: GET_CASE_RECORDS_REQUEST,
  }
}

export const GET_CASE_RECORDS_SUCCESS = 'GET_CASE_RECORDS_SUCCESS'
export function getCaseRecordsSuccess(caseRecords) {
  return {
    type: GET_CASE_RECORDS_SUCCESS,
    payload: caseRecords,
  }
}

export const GET_CASE_RECORDS_FAILURE = 'GET_CASE_RECORDS_FAILURE'
export function getCaseRecordsFailure(error) {
  return {
    type: GET_CASE_RECORDS_FAILURE,
    payload: error,
  }
}

export function getCaseRecords() {
  return (dispatch) => {
    dispatch(getCaseRecordsRequest())
    return axiosClient
      .get(`/`)
      .then((response) => {
        dispatch(getCaseRecordsSuccess(response.data))
      })
      .catch((error) => {
        dispatch(getCaseRecordsFailure(error))
      })
  }
}
