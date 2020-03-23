import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'

class RegionDetails extends Component {
  render() {
    const { regionRecord } = this.props

    return (
      <Row>
        <Col xs={3} className="region_details___container">
          <Row>
            <Col xs={12}>
              <h2 className="region_details__name_header">{ regionRecord.name } <span className="region_details__region_id">ID: { regionRecord.adminRegion3Id }</span></h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div className="region_details__table_container">
                <table className="region_details__table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="region_details__table_row_recovered">Recovered</td>
                      <td>{ regionRecord.totalRecovered }</td>
                    </tr>
                    <tr>
                      <td className="region_details__table_row_hospitalized">Hospitalized</td>
                      <td>{ regionRecord.totalHospitalized }</td>
                    </tr>
                    <tr>
                      <td className="region_details__table_row_isolated">Isolated</td>
                      <td>{ regionRecord.totalIsolated }</td>
                    </tr>
                    <tr>
                      <td className="region_details__table_row_deceased">Deceased</td>
                      <td>{ regionRecord.totalDeceased }</td>
                    </tr>
                    <tr className="region_details__total_case_table_row">
                      <td className="region_details__total_case_table_entry">Total Cases</td>
                      <td className="region_details__total_case_table_entry">{ regionRecord.totalCases }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
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
)(RegionDetails)
