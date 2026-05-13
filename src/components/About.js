import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import about from '../image/about.jpg';

const About = ({ t, darkMode }) => (
  <section
    id="about"
    className={`d-flex align-items-center ${
      darkMode ? 'bg-dark text-white' : 'bg-light text-dark'
    } min-vh-100 py-5`}
  >
    <Container>
      <Row className="align-items-center justify-content-center text-center text-md-start">
        <Col md={5} className="mb-4 mb-md-0">
          <Image
            src={about}
            fluid
            alt="Avatar"
            style={{ maxWidth: '250px', borderRadius: '12px' }}
          />
        </Col>
        <Col md={7}>
          <h2 className="mb-4">{t.aboutTitle}</h2>
          <p className="lead">{t.aboutText}</p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default About;
