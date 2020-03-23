import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import classNames from 'classnames'
import _map from 'lodash/map'
import moment from 'moment'

export default class TotalCasesPanel extends Component {
  render() {
    const { totalCount, totalCaseRecordsRecovered, totalCaseRecordsHospitalized, totalCaseRecordsIsolated, totalCaseRecordsDeceased, topFiveRegions } = this.props

    const totalCasesHeaderClasses = classNames({
        'total_cases_panel___header': true,
        'total_cases_panel___total_cases_header': true,
    })

    const totalRecoveredHeaderClasses = classNames({
        'total_cases_panel___header': true,
        'total_cases_panel___total_recovered_header': true,
    })

    const totalHospitalizedHeaderClasses = classNames({
        'total_cases_panel___header': true,
        'total_cases_panel___total_hospitalized_header': true,
    })

    const totalIsolatedHeaderClasses = classNames({
        'total_cases_panel___header': true,
        'total_cases_panel___total_isolated_header': true,
    })

    const totalDeceasedHeaderClasses = classNames({
        'total_cases_panel___header': true,
        'total_cases_panel___total_deceased_header': true,
    })

    const topRegions = _map(topFiveRegions, (regionRecord, index) => {
      return (
        <tr key={index}>
          <td className="total_cases_panel___table_row">{ regionRecord.name }</td>
          <td className="total_cases_panel___table_row">{ regionRecord.totalCases }</td>
          <td className="total_cases_panel___table_row">{ regionRecord.firstCase ? moment(regionRecord.firstCase).format("M/DD/YYYY") : "N/A" }</td>
        </tr>
      )
    })

    return (
      <div>
        <div className="total_cases_panel___total_cases_container">
          <Row>
            <Col xs={8}>
              <h3 className={totalCasesHeaderClasses}>Total Confirmed Cases</h3>
            </Col>
            <Col xs={4}>
              <h3 className="total_cases_panel___total_cases_value">{ totalCount }</h3>
            </Col>
          </Row>
        </div>
        <Row>
          <Col xs={8}>
            <h3 className={totalRecoveredHeaderClasses}>Total Recovered</h3>
          </Col>
          <Col xs={4}>
            <p className="total_cases_panel___value">{ totalCaseRecordsRecovered }</p>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <h3 className={totalHospitalizedHeaderClasses}>Total Hospitalized</h3>
          </Col>
          <Col xs={4}>
            <p className="total_cases_panel___value">{ totalCaseRecordsHospitalized }</p>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <h3 className={totalIsolatedHeaderClasses}>Total Isolated</h3>
          </Col>
          <Col xs={4}>
            <p className="total_cases_panel___value">{ totalCaseRecordsIsolated }</p>
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <h3 className={totalDeceasedHeaderClasses}>Total Deceased</h3>
          </Col>
          <Col xs={4}>
            <p className="total_cases_panel___value">{ totalCaseRecordsDeceased }</p>
          </Col>
        </Row>
        <Row className="total_cases_panel___total_header_container">
          <Col xs={8}>
            <h3 className="total_cases_panel___header">Total</h3>
          </Col>
          <Col xs={4}>
            <p className="total_cases_panel___value"><strong>{ totalCount }</strong></p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h3 className="total_cases_panel___table_container_header">Most Affected Regions</h3>
            <div className="total_cases_panel___table_container">
              <table className="total_cases_panel___table">
                <thead>
                  <tr>
                    <th className="total_cases_panel___table_header">Woreda</th>
                    <th className="total_cases_panel___table_header">Cases</th>
                    <th className="total_cases_panel___table_header">First Case</th>
                  </tr>
                </thead>
                <tbody>
                  { topRegions }
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
