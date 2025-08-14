import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = ({ t, darkMode }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setLoading(true);
      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          formData,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          toast.success('Wiadomość została wysłana!');
          setFormData({ user_name: '', user_email: '', message: '' });
          setValidated(false);
        })
        .catch((error) => {
          toast.error('Wystąpił błąd. Spróbuj ponownie później.');
          console.error(error.text);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setValidated(true);
  };

  return (
    <section
      id="kontakt"
      className={`d-flex align-items-center justify-content-center min-vh-100 py-5 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center mb-4">{t.contact}</h2>
            <div className="contact-info mb-4 text-center">
              <p><FaPhone className="me-2" />+48 504782 655</p>
              <p><FaEnvelope className="me-2" />webstardevelop@gmail.com</p>
              <p>Wrocław, Polska</p>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>{t.name}</Form.Label>
                <Form.Control
                  required
                  name="user_name"
                  type="text"
                  placeholder={t.name}
                  value={formData.user_name}
                  onChange={handleChange}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  Wpisz swoje imię.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>{t.email}</Form.Label>
                <Form.Control
                  required
                  name="user_email"
                  type="email"
                  placeholder={t.email}
                  value={formData.user_email}
                  onChange={handleChange}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  Podaj prawidłowy adres email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>{t.message}</Form.Label>
                <Form.Control
                  required
                  name="message"
                  as="textarea"
                  rows={4}
                  placeholder={t.message}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                />
                <Form.Control.Feedback type="invalid">
                  Wpisz wiadomość.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    {t.send}...
                  </>
                ) : (
                  t.send
                )}
              </Button>
            </Form>
          </Col>
        </Row>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme={darkMode ? 'dark' : 'light'}
        />
      </Container>
    </section>
  );
};

export default Contact;
