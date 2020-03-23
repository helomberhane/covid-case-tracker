import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import classNames from 'classnames'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const AVAILABLE_STATUS = "available"
const UNAVAILABLE_STATUS = "unavailable"
const FULL_STATUS = "full"

export default class HospitalDetails extends Component {
  render() {
    const { medicalFacilityRecord } = this.props

    const statusClasses = classNames({
        'hospital_details__status_available': (medicalFacilityRecord.status === AVAILABLE_STATUS),
        'hospital_details__status_unavailable': (medicalFacilityRecord.status === UNAVAILABLE_STATUS),
        'hospital_details__status_full': (medicalFacilityRecord.status === FULL_STATUS),
    })


    let percentFreeBeds = 100 - ((medicalFacilityRecord.occupied_beds / medicalFacilityRecord.total_beds) * 100)
    const availableBedsClasses = classNames({
        'hospital_details__available_beds_great': (percentFreeBeds > 70.0),
        'hospital_details__available_beds_good': (percentFreeBeds <= 70.0 && percentFreeBeds > 30.0),
        'hospital_details__available_beds_bad': (percentFreeBeds <= 30.0),
    })

    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <h4 className="hospital_details__faciliy_type_header">Facility Type: { capitalizeFirstLetter(medicalFacilityRecord.amenity) }</h4>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <p className="hospital_details__status">Status: <span className={statusClasses}>{ capitalizeFirstLetter(medicalFacilityRecord.status) }</span></p>
              <p className="hospital_details__available_beds">Available Beds: <span className={availableBedsClasses}>{ medicalFacilityRecord.total_beds - medicalFacilityRecord.occupied_beds }</span></p>
              <p className="hospital_details__address_street">{ medicalFacilityRecord.street },</p>
              <p className="hospital_details__address_city_state">{ medicalFacilityRecord.city }, { medicalFacilityRecord.admin_region_3 }</p>
              <p className="hospital_details__hours">Hours: { medicalFacilityRecord.opening_hours }</p>
              <p className="hospital_details__phone">Phone: { medicalFacilityRecord.contact_number } </p>
              <p className="hospital_details__operator">Operator: { medicalFacilityRecord.operator }</p>
              <p className="hospital_details__operator_phone">Operator Phone: { medicalFacilityRecord.operator_contact_number }</p>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
