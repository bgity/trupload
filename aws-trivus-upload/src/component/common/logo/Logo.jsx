import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';

class Logo extends Component {
  render() {
    return <img src={logo} alt='' className='custom-logo' />;
  }
}

export default withRouter(Logo);
