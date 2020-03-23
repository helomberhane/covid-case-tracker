import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import _map from 'lodash/map'
import _filter from 'lodash/filter'

import MedicalFacilityCard from './MedicalFacilityCard'

class MedicalFacilitiesPanel extends Component {
  render() {
    const {
      currentRegionRecord,
      medicalFacilityRecords,
    } = this.props

    var title = ''
    if (currentRegionRecord) {
      title = (
        <h4 className="medical_facilities_panel__header">{ currentRegionRecord.name } Medical Facilities</h4>
      )
    } else {
      title = (
        <h4 className="medical_facilities_panel__empty_header">All Medical Facilities</h4>
      )
    }

    var medicalFacilitiesForRegion = []
    if (currentRegionRecord) {
      console.log(medicalFacilityRecords);
      let medicalFacilitiesRecordsForRegion = _filter(medicalFacilityRecords, { 'admin_region_3_id': currentRegionRecord.adminRegion3Id })

      if (medicalFacilitiesRecordsForRegion.length > 0) {
        medicalFacilitiesForRegion = _map(medicalFacilitiesRecordsForRegion, (medicalFacilityRecord) => {
          return (
            <MedicalFacilityCard
              medicalFacilityRecord={medicalFacilityRecord}
            />
          )
        })
      } else {
        medicalFacilitiesForRegion = (
          <h4 className="medical_facilities_panel__empty_header">No medical facilities in region</h4>
        )
      }
    } else {
      medicalFacilitiesForRegion = _map(medicalFacilityRecords, (medicalFacilityRecord) => {
        return (
          <MedicalFacilityCard
            medicalFacilityRecord={medicalFacilityRecord}
          />
        )
      })
    }

    return (
      <div>
        <Row>
          <Col xs={12}>
              { title }
              <div className="medical_facilities_panel__card_container">
                { medicalFacilitiesForRegion }
              </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => ({
    currentRegionRecord: state.caseRecords.currentRegionRecord,
    medicalFacilityRecords: state.medicalFacilityRecords.medicalFacilityRecords,
  }),
  dispatch => bindActionCreators({
  }, dispatch),
)(MedicalFacilitiesPanel)
