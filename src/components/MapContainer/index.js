import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import setCoordinates from '../../actions/setCoordinates'
import { connect } from 'react-redux'
import { compose } from 'redux'

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedPlace: {},
      lat: -33.447487,
      lng: -70.673676,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { coordinates } = nextProps
    if (this.props.coordinates !== coordinates) {
      this.setState({ lat: coordinates.lat, lng: coordinates.lng })
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
           style={{ width: '100%', height: '100%' }}
           containerStyle={{ width: '100%', height: '90%', position: 'absolute' }}
           onClick={this.onMapClicked}>
        <Marker position={{ lat, lng }}/>
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  coordinates: state.coordinatesReducer.coordinates
})

const mapDispatchToProps = dispatch => ({
  setCoordinates: coordinates => dispatch(setCoordinates(coordinates)),
})

const enhance = compose(
  GoogleApiWrapper({
    apiKey: ('AIzaSyAueKpEPYJVT85Cd36l5f6APcpZzvFOlLk')
  }),
  connect(mapStateToProps, mapDispatchToProps))

export default enhance(MapContainer);
