import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import classNames from 'classnames'

import TotalCasesPanel from './TotalCasesPanel'
import MedicalFacilitiesPanel from './MedicalFacilitiesPanel'
import NewPanel from './NewPanel'

const TOTAL_CASES_TAB = "totalCases"
const MEDICAL_FACILITIES_TAB = "medicalFacilities"
const NEW_TAB = "new"

export default class DataPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTab: TOTAL_CASES_TAB,
    }

    this.showPanel = this.showPanel.bind(this)
  }
  showPanel(panelName) {
    this.setState({
      currentTab: panelName,
    })
  }
  render() {
    const {
      loadingCaseRecords,
      loadingMedicalFacilityRecords,
      totalCount,
      totalCaseRecordsRecovered,
      totalCaseRecordsHospitalized,
      totalCaseRecordsIsolated,
      totalCaseRecordsDeceased,
      topFiveRegions,
    } = this.props

    const tabOneClasses = classNames({
        'data_panel___tab': true,
        'data_panel___tab_active': (this.state.currentTab === TOTAL_CASES_TAB),
    })

    const tabTwoClasses = classNames({
        'data_panel___tab': true,
        'data_panel___tab_active': (this.state.currentTab === MEDICAL_FACILITIES_TAB),
    })

    const tabThreeClasses = classNames({
        'data_panel___tab': true,
        'data_panel___tab_active': (this.state.currentTab === NEW_TAB),
    })

    const finishedLoadingCaseRecords = loadingCaseRecords && (loadingCaseRecords === true)
    const finishedLoadingMedicalFacilityRecords = loadingMedicalFacilityRecords && (loadingMedicalFacilityRecords === true)

    // Logic for choosing panel
    var currentPanel = ''
    if (this.state.currentTab === TOTAL_CASES_TAB) {
      if (finishedLoadingCaseRecords) {
        currentPanel = (
          <p>Loading...</p>
        )
      } else {
        currentPanel = (
          <TotalCasesPanel
            totalCount={totalCount}
            totalCaseRecordsRecovered={totalCaseRecordsRecovered}
            totalCaseRecordsHospitalized={totalCaseRecordsHospitalized}
            totalCaseRecordsIsolated={totalCaseRecordsIsolated}
            totalCaseRecordsDeceased={totalCaseRecordsDeceased}
            topFiveRegions={topFiveRegions}
          />
        )
      }
    }

    if (this.state.currentTab === MEDICAL_FACILITIES_TAB) {
      if (
        finishedLoadingCaseRecords &&
        finishedLoadingMedicalFacilityRecords &&
        totalCount
      )
      {
        currentPanel = (
          <p>Loading...</p>
        )
      } else {
        currentPanel = (
          <MedicalFacilitiesPanel
            totalCount={totalCount}
          />
        )
      }
    }


    // Update accordingly with your data loading
    if (this.state.currentTab === NEW_TAB) {
      if (finishedLoadingCaseRecords && finishedLoadingMedicalFacilityRecords) {
        currentPanel = (
          <p>Loading...</p>
        )
      } else {
        currentPanel = (
          <NewPanel
          />
        )
      }
    }

    return (
      <Row className="data_panel___row_container">
        <Col xs={4} className="data_panel___container">
        <div className="data_panel___tabs_shadow_cutoff_container">
            <div className="data_panel___tabs_container">
              <Row>
                <Col xs={4}>
                  <div className={tabOneClasses}>
                    <p className="data_panel___tab_link" onClick={(e) => this.showPanel(TOTAL_CASES_TAB, e)}>Cases</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className={tabTwoClasses}>
                    <p className="data_panel___tab_link" onClick={(e) => this.showPanel(MEDICAL_FACILITIES_TAB, e)}>Facilities</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className={tabThreeClasses}>
                    <p className="data_panel___tab_link" onClick={(e) => this.showPanel(NEW_TAB, e)}>New</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <h1 className="data_panel___main_header">Ethiopia COVID-19 Case Tracker</h1>
          { currentPanel }
        </Col>
      </Row>
    )
  }
}
