import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import me from '../image/me.png';
import { FaDownload } from 'react-icons/fa';

const Hero = ({ t, language }) => {
  const cvFile = language === 'pl'
  ? process.env.PUBLIC_URL + '/cv_pl.pdf'
  : process.env.PUBLIC_URL + '/cv_en.pdf';
  return (
<section
    id="home"
    className="d-flex align-items-center justify-content-center min-vh-100"
    style={{
      backgroundColor: 'inherit',
      color: 'inherit',
      paddingTop: '4vh',
      paddingBottom: '4vh',
      overflow: 'hidden',
    }}
  >
    <Container className="mt-n5">
      <Row className="justify-content-center align-items-center text-center text-md-start">
        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-center mb-4 mb-md-0"
        >
      <Image
        src={me}
        roundedCircle
        fluid
        alt="Avatar"
        className="hero-image d-block mx-auto mx-md-0"
      />
        </Col>
        <Col xs={12} md={6}>
          <h2 className="display-4 fw-bold">
            {t.welcome}
            <br />
            <span style={{ color: '#0d6efd', fontSize: 64 }}>{t.welcomeSub}</span>
          </h2>
          <p className="lead mt-3" style={{ fontSize: 32 }}>{t.subtitle}</p>
          {/* <p className="lead mt-3" style={{ fontSize: 28 }}>{t.company}</p> */}
          <div className="d-flex gap-3 mt-4 flex-wrap justify-content-center justify-content-md-start">
          <a
              href={cvFile}
              download
              type="application/pdf"
              className="btn btn-outline-primary btn-sm d-flex align-items-center"
              style={{ padding: '12px 24px', fontSize: '1.5rem' }}
            >
              <FaDownload className="me-2"  />
              {language === 'pl' ? 'Pobierz CV' : 'Download CV'}
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
};

export default Hero;
