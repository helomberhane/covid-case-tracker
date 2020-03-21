import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'
import classNames from 'classnames'

export class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showMarker: false,
    }
  }
  componentDidMount(props) {
  }
  render() {
    const { centerCoordinates, howMarker, polygons } = this.props

    var mapContainerClasses = classNames({
        'map___container': true,
    })

    return (
      <Map
        google={this.props.google}
        className={mapContainerClasses}
        initialCenter={centerCoordinates}
        zoom={6.52}
      >
        { polygons }
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
