import React, { Component } from 'react';
import {
  Col,
  Row,
  Container,
  Card,
  Button,
  NavbarBrand,
  Navbar,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className='fixed-bottom'>
        <Navbar>
          <Container>
            <NavbarBrand style={{ marginLeft: '-20px' }}>
              Terms and Conditions
            </NavbarBrand>
            <NavbarBrand>
              Copyright 2015-2019 TRIVUS. All rights reserved
            </NavbarBrand>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Footer);
