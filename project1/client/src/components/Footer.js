import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
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

          <Col className="text-center">
            <h className="text-light mx-2">Contact us</h>
            <h className="text-light mx-2">Privacy Policies</h>
            <h className="text-light mx-2">Help</h>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

