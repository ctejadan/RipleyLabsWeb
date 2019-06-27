import React, { Component, Fragment } from 'react'
import Navbar from 'react-bootstrap/Navbar'

class Header extends Component {
  render() {
    return (
      <div style={{ marginBottom: '56px' }}>
        <Navbar fixed="top" bg="light">
          <Navbar.Brand href="#home">Ripley Labs</Navbar.Brand>
        </Navbar>
      </div>
    )
  }
}

export default Header
