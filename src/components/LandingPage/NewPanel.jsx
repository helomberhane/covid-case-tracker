import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'

export default class NewPanel extends Component {
  render() {
    // const { } = this.props

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h4>New Panel</h4>
            <p>**input your content here**</p>
          </Col>
        </Row>
      </div>
    )
  }
}
