import React, { Component } from 'react';
import { Button, Row, Container } from 'react-bootstrap';

class LiveEventUpload extends Component {
  backToDashboard = () => {
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <Container>
          <Row className='justify-content-center'>
            <h1>COMMING SOON</h1>
          </Row>
          <Row className='justify-content-center'>
            <Button variant='warning' onClick={this.backToDashboard}>
              Back
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LiveEventUpload;
