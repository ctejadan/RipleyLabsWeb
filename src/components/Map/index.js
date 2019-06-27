import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPlace: {},
      lat: -33.447487,
      lng: -70.673676,
    }
  }

  onMapClicked = async (t, map, coord) => {
    const { handleMapClick } = this.props
    const { latLng } = coord
    const lat = latLng.lat()
    const lng = latLng.lng()
    handleMapClick(lat, lng)
    this.setState({ lat, lng })

  }

  render() {
    const { lat, lng } = this.state
    return (
      <Map google={this.props.google}
           zoom={3}
           initialCenter={{ lat, lng }}
           center={{ lat, lng }}
           onClick={this.onMapClicked}>
        <Marker position={{ lat, lng }}/>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAueKpEPYJVT85Cd36l5f6APcpZzvFOlLk')
})(MapContainer)
