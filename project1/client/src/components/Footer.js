import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto" sticky="bottom">
      <Container>
        <Row>
          <Col className="text-left">
            &copy;{new Date().getFullYear()} All Rights Reserved.
          </Col>

          <Col className="text-center">
            <a href="#" className="text-light mx-2">YouTube</a>
            <a href="#" className="text-light mx-2">Twitter</a>
            <a href="#" className="text-light mx-2">Facebook</a>
          </Col>

          <Col className="text-center d-flex justify-content-center">
            <p className="text-light mx-2">Contact us</p>
            <p className="text-light mx-2">Privacy Policies</p>
            <p className="text-light mx-2">Help</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

