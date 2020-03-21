import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import _map from 'lodash/map'


class DataPanel extends Component {
  render() {
    const { loading, totalCount, totalCaseRecordsRecovered, totalCaseRecordsHospitalized, totalCaseRecordsIsolated, totalCaseRecordsDeceased, topFiveRegions } = this.props

    const totalCasesHeaderClasses = classNames({
        'data_panel___header': true,
        'data_panel___total_cases_header': true,
    })

    const totalRecoveredHeaderClasses = classNames({
        'data_panel___header': true,
        'data_panel___total_recovered_header': true,
    })

    const totalHospitalizedHeaderClasses = classNames({
        'data_panel___header': true,
        'data_panel___total_hospitalized_header': true,
    })

    const totalIsolatedHeaderClasses = classNames({
        'data_panel___header': true,
        'data_panel___total_isolated_header': true,
    })

    const totalDeceasedHeaderClasses = classNames({
        'data_panel___header': true,
        'data_panel___total_deceased_header': true,
    })

    const totalHeaderContainerClasses = classNames({
        'data_panel___total_header_container': true,
    })

    const topRegions = _map(topFiveRegions, (regionRecord, index) => {
      return (
        <tr key={index}>
          <td className="data_panel___table_row">{ regionRecord.name }</td>
          <td className="data_panel___table_row">{ regionRecord.totalCases }</td>
        </tr>
      )
    })

    return (
      <Row>
        <Col xs={4} className="data_panel___container">
          <h1 className="data_panel___main_header">Ethiopia COVID-19 Tracker</h1>
          {
            loading && (loading == true) ?
              <p>Loading...</p>
            :
              (
                <div>
                  <div className="data_panel___total_cases_container">
                    <Row>
                      <Col xs={8}>
                        <h3 className={totalCasesHeaderClasses}>Total Confirmed Cases</h3>
                      </Col>
                      <Col xs={4}>
                        <h3 className="data_panel___total_cases_value">{ totalCount }</h3>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col xs={8}>
                      <h3 className={totalRecoveredHeaderClasses}>Total Recovered</h3>
                    </Col>
                    <Col xs={4}>
                      <p className="data_panel___value">{ totalCaseRecordsRecovered }</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8}>
                      <h3 className={totalHospitalizedHeaderClasses}>Total Hospitalized</h3>
                    </Col>
                    <Col xs={4}>
                      <p className="data_panel___value">{ totalCaseRecordsHospitalized }</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8}>
                      <h3 className={totalIsolatedHeaderClasses}>Total Isolated</h3>
                    </Col>
                    <Col xs={4}>
                      <p className="data_panel___value">{ totalCaseRecordsIsolated }</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={8}>
                      <h3 className={totalDeceasedHeaderClasses}>Total Deceased</h3>
                    </Col>
                    <Col xs={4}>
                      <p className="data_panel___value">{ totalCaseRecordsDeceased }</p>
                    </Col>
                  </Row>
                  <Row className="data_panel___total_header_container">
                    <Col xs={8}>
                      <h3 className="data_panel___header">Total</h3>
                    </Col>
                    <Col xs={4}>
                      <p className="data_panel___value"><strong>{ totalCount }</strong></p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h3 className="data_panel___table_container_header">Most Affected Regions</h3>
                      <div className="data_panel___table_container">
                        <table className="data_panel___table">
                          <thead>
                            <tr>
                              <th className="data_panel___table_header">Woreda</th>
                              <th className="data_panel___table_header">Cases</th>
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
        </Col>
      </Row>
    )
  }
}

export default connect(
  state => ({
  }),
  dispatch => bindActionCreators({
  }, dispatch),
)(DataPanel)
