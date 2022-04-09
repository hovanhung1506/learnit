import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';

function About() {
  return (
    <Row className="mt-5" style={{ marginRight: 0 }}>
      <Col className="text-center">
        <Button variant="primary" href="https://google.com" size="lg">
          Visit Google
        </Button>
      </Col>
    </Row>
  );
}

export default About;
