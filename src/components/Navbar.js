import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const NavbarComponent = ({ t, language, setLanguage, darkMode, setDarkMode }) => {
  

  return (
    <Navbar
      expand="lg"
      fixed="top"
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          <span style={{ color: '#0d6efd' }}>P</span>aweł{' '}
          <span style={{ color: '#0d6efd' }}>N</span>owicki
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse
          className={`justify-content-between navbar-collapse-custom ${
            darkMode ? 'bg-dark' : 'bg-light'
          }`}
        >
          <Nav className="gap-3">
            <Nav.Link href="#about">{t.about}</Nav.Link>
            <Nav.Link href="#projekty">{t.projects}</Nav.Link>
            <Nav.Link href="#kontakt">{t.contact}</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center flex-wrap gap-4 mt-3 mt-lg-0">
            <a
              href="https://github.com/pawelnowicki87"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={32} />
            </a>

            <a
              href="https://www.linkedin.com/in/pawe%C5%82-nowicki-305380268/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={32} />
            </a>

    

            <ToggleButtonGroup
              type="radio"
              name="lang"
              value={language}
              size="sm"
              onChange={(val) => setLanguage(val)}
            >
              <ToggleButton
                id="lang-pl"
                value="pl"
                variant="outline-secondary"
              >
                {t.langPL || 'PL'}
              </ToggleButton>
              <ToggleButton
                id="lang-en"
                value="en"
                variant="outline-secondary"
              >
                {t.langEN || 'EN'}
              </ToggleButton>
            </ToggleButtonGroup>

            <Form.Check
              type="switch"
              label="Dark"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="ms-2"
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
