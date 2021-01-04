import React, { Component } from 'react';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import myAssetImg from '../../assets/images/cms.png';

import Footer from '../common/footer/Footer';
import Logo from '../common/logo/Logo';
class Dashboard extends Component {
  clickHandler = (tiles) => {
    if (tiles === 'myassets') {
      this.props.history.push('/myassets');
    } else if (tiles === 'vodupload') {
      this.props.history.push('/vodupload');
    } else {
      this.props.history.push('/liveeventupload');
    }
  };
  render() {
    return (
      <div>
        {/* <div>
          {' '}
          <Logo />
        </div> */}
        <div className='top-padding'>
          <Container>
            <Row>
              <Col sm={4} onClick={() => this.clickHandler('myassets')}>
                <Card className='card-gardient'>
                  <Card.Body>
                    <img src={myAssetImg} alt='' className='tiles-img' />
                    <p className='text-middle'>MY ASSETS</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4} onClick={() => this.clickHandler('vodupload')}>
                <Card className='card-gardient'>
                  <Card.Body>
                    <img src={myAssetImg} alt='' className='tiles-img' />
                    <p className='text-middle'>UPLOAD ASSETS</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4} onClick={() => this.clickHandler('liveeventupload')}>
                <Card className='card-gardient'>
                  <Card.Body>
                    <img src={myAssetImg} alt='' className='tiles-img' />
                    <p className='text-middle'> UPLOAD LIVE EVENT</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
