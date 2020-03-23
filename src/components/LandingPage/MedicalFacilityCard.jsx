import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import classNames from 'classnames'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const AVAILABLE_STATUS = "available"
const UNAVAILABLE_STATUS = "unavailable"
const FULL_STATUS = "full"

export default class MedicalFacilityCard extends Component {
  render() {
    const { medicalFacilityRecord  } = this.props

    const statusClasses = classNames({
        'medical_facility_card__status_available': (medicalFacilityRecord.status === AVAILABLE_STATUS),
        'medical_facility_card__status_unavailable': (medicalFacilityRecord.status === UNAVAILABLE_STATUS),
        'medical_facility_card__status_full': (medicalFacilityRecord.status === FULL_STATUS),
    })


    let percentFreeBeds = 100 - ((medicalFacilityRecord.occupied_beds / medicalFacilityRecord.total_beds) * 100)
    const availableBedsClasses = classNames({
        'medical_facility_card__available_beds_great': (percentFreeBeds > 70.0),
        'medical_facility_card__available_beds_good': (percentFreeBeds <= 70.0 && percentFreeBeds > 30.0),
        'medical_facility_card__available_beds_bad': (percentFreeBeds <= 30.0),
    })

    let percentICUFreeBeds = 100 - ((medicalFacilityRecord.occupied_icu_beds / medicalFacilityRecord.total_icu_beds) * 100)
    const availableICUBedsClasses = classNames({
        'medical_facility_card__available_beds_great': (percentICUFreeBeds > 70.0),
        'medical_facility_card__available_beds_good': (percentICUFreeBeds <= 70.0 && percentICUFreeBeds > 30.0),
        'medical_facility_card__available_beds_bad': (percentICUFreeBeds <= 30.0),
    })

    const availableTestingKitsClasses = classNames({
        'medical_facility_card__great': (medicalFacilityRecord.testing_kits > 300),
        'medical_facility_card__good': (medicalFacilityRecord.testing_kits <= 300 && medicalFacilityRecord.testing_kits > 100),
        'medical_facility_card__bad': (medicalFacilityRecord.testing_kits <= 100),
    })

    const availableMasksClasses= classNames({
      'medical_facility_card__great': (medicalFacilityRecord.masks > 300),
      'medical_facility_card__good': (medicalFacilityRecord.masks <= 300 && medicalFacilityRecord.masks > 100),
      'medical_facility_card__bad': (medicalFacilityRecord.masks <= 100),
    })

    const availableGlovesClasses= classNames({
        'medical_facility_card__great': (medicalFacilityRecord.gloves > 300),
        'medical_facility_card__good': (medicalFacilityRecord.gloves <= 300 && medicalFacilityRecord.gloves > 100),
        'medical_facility_card__bad': (medicalFacilityRecord.gloves <= 100),
    })


    return (
      <div>
        <Row>
          <Col xs={12}>
            <h4 className="medical_facility_card__name">{ medicalFacilityRecord.name }</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="medical_facility_card__table_container">
              <table className="medical_facility_card__table">
                <tbody>
                  <tr>
                    <td className="">Facility Type</td>
                    <td>{ capitalizeFirstLetter(medicalFacilityRecord.amenity) }</td>
                  </tr>
                  <tr>
                    <td className="">Status</td>
                    <td className={statusClasses}>{ capitalizeFirstLetter(medicalFacilityRecord.status) }</td>
                  </tr>
                  <tr>
                    <td className="">Occupied Beds</td>
                    <td>{ medicalFacilityRecord.occupied_beds }</td>
                  </tr>
                  <tr>
                    <td className="">Available Beds</td>
                    <td className={availableBedsClasses}>{ medicalFacilityRecord.total_beds - medicalFacilityRecord.occupied_beds }</td>
                  </tr>
                  <tr>
                    <td className="">Total Beds</td>
                    <td>{ medicalFacilityRecord.total_beds }</td>
                  </tr>
                  <tr>
                    <td className="">Occupied ICU Beds</td>
                    <td>{ medicalFacilityRecord.occupied_icu_beds }</td>
                  </tr>
                  <tr>
                    <td className="">Available ICU Beds</td>
                    <td className={availableICUBedsClasses}>{ medicalFacilityRecord.total_icu_beds - medicalFacilityRecord.occupied_icu_beds }</td>
                  </tr>
                  <tr>
                    <td className="">Total ICU Beds</td>
                    <td>{ medicalFacilityRecord.total_icu_beds }</td>
                  </tr>
                  <tr>
                    <td className="">Testing Kits</td>
                    <td className={availableTestingKitsClasses}>{ medicalFacilityRecord.testing_kits }</td>
                  </tr>
                  <tr>
                    <td className="">Masks</td>
                    <td className={availableMasksClasses}>{ medicalFacilityRecord.masks }</td>
                  </tr>
                  <tr>
                    <td className="">Gloves</td>
                    <td className={availableGlovesClasses}>{ medicalFacilityRecord.gloves }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
