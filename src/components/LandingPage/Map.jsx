import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

export class MapContainer extends Component {
  render() {
    const { centerCoordinates, polygons, markers, infoWindows } = this.props

    return (
      <Map
        google={this.props.google}
        className="map___container"
        initialCenter={centerCoordinates}
        zoom={6.52}
      >
        { polygons }
        { markers }
        { infoWindows }
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
