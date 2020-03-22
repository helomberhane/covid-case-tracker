import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { Polygon } from 'google-maps-react'
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'
import _filter from 'lodash/filter'
import _find from 'lodash/find'
import _orderBy from 'lodash/orderBy'

import administrativeZoneDataAll from '../../data/ethiopia_administrative_zones_full.json'

import { getCaseRecords } from '../../actions/caseRecords'

import MapContainer from './Map'
import DataPanel from './DataPanel'
import RegionDetails from './RegionDetails'

const POLYGON_COLORS = [
  "#228b22",
  "#ff8000",
  "#ff0000"
]

function roundValue(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function polygonColor(count) {
  if (count === 0) {
    return POLYGON_COLORS[0]
  }

  if (count < 10 && count > 0) {
    return POLYGON_COLORS[1]
  }

  if (count > 10) {
    return POLYGON_COLORS[2]
  }
}

function transformDataForGoogleMaps(latLongData) {
  return { lat: parseFloat(roundValue(latLongData[1], 3)) ? parseFloat(roundValue(latLongData[1], 3)) : 0, lng: parseFloat(roundValue(latLongData[0], 3)) ? parseFloat(roundValue(latLongData[0], 3)) : 0 }
}

function createNewRegionRecord(data) {
  return {
    adminRegion3Id: data.properties.ID_3,
    name: data.properties.NAME_3,
    totalCases: 0,
    totalRecovered: 0,
    totalHospitalized: 0,
    totalIsolated: 0,
    totalDeceased: 0,
    firstCase: null,
  }
}

var regionRecords = []
const regionOverlayRecords = _map(administrativeZoneDataAll[0].features, (data, index) => {
  let regionRecord = createNewRegionRecord(data)
  regionRecords.push(regionRecord)

  const formattedCoordinates = _map(data.geometry.coordinates[0], (latLongData) => {
    const coordinates = transformDataForGoogleMaps(latLongData)
    return coordinates
  })

  return { adminRegion3Id: data.properties.ID_3, key: index, paths: formattedCoordinates, strokeColor: "#000000", strokeWeight: 2, fillColor: POLYGON_COLORS[1], fillOpacity: 0.5 }
})

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showRegionDetails: false,
      currentRegionRecord: null,
    }

    this.showRegionDetails = this.showRegionDetails.bind(this)
  }
  componentDidMount() {
    const { getCaseRecords } = this.props
    getCaseRecords()
  }
  showRegionDetails(regionId) {
    let currentRegionRecord = _find(regionRecords, { 'adminRegion3Id': regionId })
    this.setState({
      showRegionDetails: true,
      currentRegionRecord: currentRegionRecord
    })
  }
  render() {
    const { loading, caseRecords } = this.props

    const centerPoint = {
     lat: 9.1606,
     lng: 37.6
    }

    var totalCasesCount = 0
    var caseRecordsRecovered = []
    var caseRecordsHospitalized = []
    var caseRecordsIsolated = []
    var caseRecordsDeceased = []
    var topFiveRegions = []
    if (caseRecords.length > 0) {
      _forEach(regionRecords, (regionRecord) => {
        let regionId = parseInt(regionRecord.adminRegion3Id)
        let caseRecordsForRegion = _filter(caseRecords, { 'admin_region_3_id': regionId })

        let caseRecordsForRegionRecovered = _filter(caseRecordsForRegion, { 'status': 'recovered' })
        let caseRecordsForRegionHospitalized = _filter(caseRecordsForRegion, { 'status': 'hospitalized' })
        let caseRecordsForRegionIsolated = _filter(caseRecordsForRegion, { 'status': 'isolated' })
        let caseRecordsForRegionDeceased = _filter(caseRecordsForRegion, { 'status': 'deceased' })

        let firstCase = _orderBy(caseRecordsForRegion, ['date_reported', 'name'], ['asc', 'desc'])[0]
        if (firstCase) {
          regionRecord.firstCase = firstCase.date_reported
        }
        regionRecord.totalRecovered = caseRecordsForRegionRecovered.length
        regionRecord.totalHospitalized = caseRecordsForRegionHospitalized.length
        regionRecord.totalIsolated = caseRecordsForRegionIsolated.length
        regionRecord.totalDeceased = caseRecordsForRegionDeceased.length

        totalCasesCount = caseRecords.length
        caseRecordsRecovered = _filter(caseRecords, { 'status': 'recovered' })
        caseRecordsHospitalized = _filter(caseRecords, { 'status': 'hospitalized' })
        caseRecordsIsolated = _filter(caseRecords, { 'status': 'isolated' })
        caseRecordsDeceased = _filter(caseRecords, { 'status': 'deceased' })

        regionRecord.totalCases = caseRecordsForRegion.length
      })

      topFiveRegions = _orderBy(regionRecords, ['totalCases', 'name'], ['desc', 'asc']).slice(0, 20)
    }

    var regionOverlays = []
    if (caseRecords.length > 0 && regionOverlayRecords.length > 0) {
      regionOverlays = _map(regionOverlayRecords, (regionOverlayRecord) => {
        let regionId = regionOverlayRecord.adminRegion3Id
        let regionRecordForOverlay = _find(regionRecords, { 'adminRegion3Id': regionId })

        const caseLevelColor = polygonColor(regionRecordForOverlay.totalCases)
        return (
          <Polygon
              key={regionOverlayRecord.key}
              onMouseover={() => this.showRegionDetails(regionId)}
              paths={regionOverlayRecord.paths}
              strokeColor={regionOverlayRecord.strokeColor}
              strokeOpacity={regionOverlayRecord.strokeOpacity}
              strokeWeight={regionOverlayRecord.strokeWeight}
              fillColor={caseLevelColor}
              fillOpacity={regionOverlayRecord.fillOpacity}
            />
        )
      })
    }


    return (
      <div>
        <DataPanel
          loading={loading}
          totalCount={totalCasesCount}
          totalCaseRecordsRecovered={caseRecordsRecovered.length}
          totalCaseRecordsHospitalized={caseRecordsHospitalized.length}
          totalCaseRecordsIsolated={caseRecordsIsolated.length}
          totalCaseRecordsDeceased={caseRecordsDeceased.length}
          totalDeceased={caseRecordsDeceased.length}
          topFiveRegions={topFiveRegions}
        />
        {
          this.state.showRegionDetails ?
          <RegionDetails
            regionRecord={this.state.currentRegionRecord}
          />
          :
          ''
        }
        <MapContainer
          centerCoordinates={centerPoint}
          polygons={regionOverlays}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: state.caseRecords.loading,
    caseRecords: state.caseRecords.caseRecords,
  }),
  dispatch => bindActionCreators({
    getCaseRecords,
  }, dispatch),
)(Home)
