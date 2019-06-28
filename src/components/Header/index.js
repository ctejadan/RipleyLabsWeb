import React, { Component, Fragment } from 'react'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import ClientBFF from '../../common/ClientBFF'
import { FaSearch } from 'react-icons/fa';
import setCoordinates from '../../actions/setCoordinates'
import Spinner from 'react-bootstrap/Spinner'


class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: '',
      buttonClicked: false
    }
    this.ClientBFF = new ClientBFF()
  }

  handleSearchIngput = (input) => {
    this.setState({ city: input.target.value })
  }

  handleButtonClick = async () => {
    const { city } = this.state
    const { setCoordinates } = this.props
    this.setState({ buttonClicked: true })
    const coordinates = await this.ClientBFF.getCoordinatesByCity(city)
    setCoordinates(coordinates)
    this.setState({ buttonClicked: false })
  }

  render() {
    const { buttonClicked } = this.state
    return (
      <div style={{
        height: '60px',
        background: 'white',
        width: '100%',
        paddingTop: '10px'
      }}>
        <div className="d-flex justify-content-between">
          <img style={{ paddingLeft: '20px' }} height={40} src="/ripley.svg"/>
          <div style={{display: 'inherit'}}>
            <FormControl type="text"
                         placeholder="Buscar..."
                         onChange={(e) => {
                           this.handleSearchIngput(e)
                         }}
                         className="mr-sm-2"
                         style={{ maxWidth: '50%', marginRight: '5px' }}/>
            <Button variant="dark" onClick={() => {
              this.handleButtonClick()
            }}>{buttonClicked ? (<Spinner animation="border" role="status" size="sm">
              <span className="sr-only">Loading...</span>
            </Spinner>) : (<FaSearch/>)}</Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCoordinates: coordinates => dispatch(setCoordinates(coordinates)),
})

export default connect(null, mapDispatchToProps)(Header)
