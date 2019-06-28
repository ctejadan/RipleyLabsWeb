import React, { Component } from 'react'
import MapContainer from '../../components/MapContainer'
import ClientBFF from '../../common/ClientBFF'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Skycons from 'react-skycons'
import { connect } from 'react-redux'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: '',
      temperature: null,
      summary: null,
      showModal: false,
      showLoading: false
    }
    this.ClientBFF = new ClientBFF()
  }

  componentWillReceiveProps = async (nextProps) => {
    const { coordinates } = nextProps
    if (this.props.coordinates !== coordinates) {
      console.log(coordinates)
      await this.handleMapClick(coordinates.lat, coordinates.lng)
    }
  }

  handleMapClick = async (lat, lng) => {
    try {
      this.setState({
        showModal: true,
        showLoading: true
      })
      const weather = await this.ClientBFF.getWeather(lat, lng)
      this.setState({
        icon: weather.icon,
        temperature: weather.temperature,
        summary: weather.summary,
        showModal: true,
        showLoading: false
      })
    }
    catch (e) {
      console.log(e)
    }
  }

  handleCloseModal = () => {
    this.setState({ showLoading: false, showModal: false })
  }

  render() {
    const { showModal, showLoading, temperature, icon, summary } = this.state
    return (
      <div>
        <MapContainer handleMapClick={this.handleMapClick}/>
        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{showLoading ? '' : summary}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{showLoading ? (<div className="text-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>) : (<div className="text-center">
            <Skycons
              color="black"
              icon={icon.toUpperCase().replace(/-/g, '_')}
              autoplay={true}
            /><span>{Math.floor(temperature) + 'ºC ' + summary}</span></div>)}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  coordinates: state.coordinatesReducer.coordinates
})

export default connect(mapStateToProps, null)(Main);
