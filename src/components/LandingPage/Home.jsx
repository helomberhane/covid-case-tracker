import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Polygon, Marker, InfoWindow } from 'google-maps-react'
import _map from 'lodash/map'
import _forEach from 'lodash/forEach'
import _filter from 'lodash/filter'
import _find from 'lodash/find'
import _orderBy from 'lodash/orderBy'
import { Auth } from 'aws-amplify';

import administrativeZoneDataAll from '../../data/ethiopia_administrative_zones_full.json'

import {
  getCaseRecords,
  setCurrentRegionRecord,
  clearCurrentRegionRecord,
} from '../../actions/caseRecords'
import { getMedicalFacilityRecords } from '../../actions/medicalFacilityRecords'

import MapContainer from './Map'
import DataPanel from './DataPanel'
import RegionDetails from './RegionDetails'
import HospitalDetails from './HospitalDetails'

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

  return { adminRegion3Id: data.properties.ID_3, key: index, paths: formattedCoordinates, strokeColor: "#000000", strokeWeight: 2, fillColor: POLYGON_COLORS[1], fillOpacity: 0.45 }
})


class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showRegionDetails: false,
      activeMarker: null,
      currentMedicalFacility: null,
      showingInfoWindow: false,
    }

    this.showRegionDetails = this.showRegionDetails.bind(this)
    this.showMedicalFacility = this.showMedicalFacility.bind(this)
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this)
  }
  componentDidMount() {
    const { getCaseRecords, getMedicalFacilityRecords, clearCurrentRegionRecord } = this.props

    clearCurrentRegionRecord()
    getCaseRecords()
    getMedicalFacilityRecords()

    // Cognito code
    let username = "admin"
    let password = "Ethiopia!123"

    Auth.signIn(username, password)
    .then(user => console.log(user))
    .catch(err => console.log(err));
  }
  showRegionDetails(regionId) {
    const { setCurrentRegionRecord } = this.props

    let currentRegionRecord = _find(regionRecords, { 'adminRegion3Id': regionId })
    if (currentRegionRecord) {
      setCurrentRegionRecord(currentRegionRecord)

      this.setState({
        showRegionDetails: true,
      })
    }
  }
  showMedicalFacility(props, marker) {
    const { medicalFacilityRecords } = this.props

    let currentMedicalFacility = _find(medicalFacilityRecords, { 'osm_id': props.medicalFacilityRecord.osm_id })
    this.setState({
      activeMarker: marker,
      currentMedicalFacility: currentMedicalFacility,
      showingInfoWindow: true
    })
  }
  onMapClicked() {
    if (this.state.showingInfoWindow) {
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      })
    }
  }
  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    })
  }
  render() {
    const { loadingCaseRecords, currentRegionRecord, loadingMedicalFacilityRecords, caseRecords, medicalFacilityRecords } = this.props

    const centerPoint = {
     lat: 9.1606,
     lng: 37.6
    }


    // Total Cases Panel data
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


    // Map Overlay for each region
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

    // Medical facility markers
    var markers = []
    if (medicalFacilityRecords.length > 0) {
      markers = _map(medicalFacilityRecords, (medicalFacilityRecord, index) => {
        let coordinates = { lat: medicalFacilityRecord.latitude, lng: medicalFacilityRecord.longitude }
        return (
          <Marker
            key={index}
            medicalFacilityRecord={medicalFacilityRecord}
            title={medicalFacilityRecord.amenity}
            name={medicalFacilityRecord.amenity}
            position={coordinates}
            onClick={this.showMedicalFacility}
          />
        )
      })
    }

    // Medical facility tooltips
    var infoWindows = []
    if (this.state.currentMedicalFacility) {
      infoWindows = _map(medicalFacilityRecords, (medicalFacilityRecord, index) => {
        return (
          <InfoWindow
            key={index}
            marker={this.state.activeMarker}
            visible={(this.state.currentMedicalFacility.osm_id === medicalFacilityRecord.osm_id) && this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}
          >
            <div className="home__info_window_container">
              <h3 className="home__info_window_header">{ this.state.currentMedicalFacility.name }</h3>
              <HospitalDetails
                medicalFacilityRecord={this.state.currentMedicalFacility}
              />
            </div>
          </InfoWindow>
        )
      })
    }


    return (
      <div>
        <DataPanel
          medicalFacilityRecords={medicalFacilityRecords}
          loadingCaseRecords={loadingCaseRecords}
          loadingMedicalFacilityRecords={loadingMedicalFacilityRecords}
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
            regionRecord={currentRegionRecord}
          />
          :
          ''
        }
        <MapContainer
          onClick={this.onMapClicked}
          centerCoordinates={centerPoint}
          polygons={regionOverlays}
          markers={markers}
          infoWindows={infoWindows}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    loadingCaseRecords: state.caseRecords.loading,
    caseRecords: state.caseRecords.caseRecords,
    currentRegionRecord: state.caseRecords.currentRegionRecord,
    loadingMedicalFacilityRecords: state.medicalFacilityRecords.loading,
    medicalFacilityRecords: state.medicalFacilityRecords.medicalFacilityRecords,
  }),
  dispatch => bindActionCreators({
    getCaseRecords,
    setCurrentRegionRecord,
    clearCurrentRegionRecord,
    getMedicalFacilityRecords,
  }, dispatch),
)(Home)
