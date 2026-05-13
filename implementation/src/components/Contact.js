import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Icon from './Icon';
import { useInView } from '../hooks';

export default function Contact({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const sec = t.contactSec;

  const [form, setForm] = useState({ user_name: '', user_email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.user_name || !form.user_email || !form.message) {
      setStatusType('err');
      setStatus(sec.valError);
      return;
    }
    setBusy(true);
    setStatusType('');
    setStatus(sec.sending);

    const serviceId  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      /* No env configured — simulate so the form is still demoable. */
      setTimeout(() => {
        setBusy(false);
        setStatusType('ok');
        setStatus(sec.sendOk);
        setForm({ user_name: '', user_email: '', subject: '', message: '' });
      }, 900);
      return;
    }

    emailjs
      .send(serviceId, templateId, form, publicKey)
      .then(() => {
        setStatusType('ok');
        setStatus(sec.sendOk);
        setForm({ user_name: '', user_email: '', subject: '', message: '' });
      })
      .catch((err) => {
        setStatusType('err');
        setStatus(sec.sendErr);
        // eslint-disable-next-line no-console
        console.error(err);
      })
      .finally(() => setBusy(false));
  };

  return (
    <section id="contact" ref={ref}>
      <div className="container">
        <div className={'section-head reveal' + (inView ? ' in-view' : '')} style={{ textAlign: 'left' }}>
          <span className="eyebrow"><span className="dot" /> {sec.eyebrow}</span>
          <h2 className="section-title">
            {sec.title}<span className="grad-text-accent">{sec.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{sec.sub}</p>
        </div>

        <div className="contact-grid">
          <div className={'contact-info reveal' + (inView ? ' in-view' : '')}>
            <a className="contact-item" href="mailto:webstardevelop@gmail.com">
              <div className="ic"><Icon name="mail" /></div>
              <div>
                <div className="label">{sec.info.email}</div>
                <div className="val">webstardevelop@gmail.com</div>
              </div>
            </a>
            <a className="contact-item" href="tel:+48504782655">
              <div className="ic"><Icon name="phone" /></div>
              <div>
                <div className="label">{sec.info.phone}</div>
                <div className="val">+48 504 782 655</div>
              </div>
            </a>
            <div className="contact-item">
              <div className="ic"><Icon name="pin" /></div>
              <div>
                <div className="label">{sec.info.location}</div>
                <div className="val">{sec.info.locationVal}</div>
              </div>
            </div>
            <a className="contact-item" href="https://github.com/pawelnowicki87" target="_blank" rel="noreferrer">
              <div className="ic"><Icon name="github" /></div>
              <div>
                <div className="label">{sec.info.github}</div>
                <div className="val">@pawelnowicki87</div>
              </div>
            </a>
            <a className="contact-item" href="https://www.linkedin.com/in/pawe%C5%82-nowicki-305380268/" target="_blank" rel="noreferrer">
              <div className="ic"><Icon name="linkedin" /></div>
              <div>
                <div className="label">{sec.info.linkedin}</div>
                <div className="val">/in/pawel-nowicki</div>
              </div>
            </a>
          </div>

          <form className={'contact-card reveal delay-1' + (inView ? ' in-view' : '')} onSubmit={submit}>
            <div className="contact-card-title">{sec.formTitle}</div>
            <div className="contact-card-sub">{sec.formSub}</div>

            <div className="field-row">
              <label className="field">
                <span className="field-label">{sec.fName}</span>
                <input
                  className="field-input" type="text" name="user_name" required
                  value={form.user_name} placeholder={sec.fNamePh}
                  onChange={onChange} disabled={busy}
                />
              </label>
              <label className="field">
                <span className="field-label">{sec.fEmail}</span>
                <input
                  className="field-input" type="email" name="user_email" required
                  value={form.user_email} placeholder={sec.fEmailPh}
                  onChange={onChange} disabled={busy}
                />
              </label>
            </div>

            <label className="field">
              <span className="field-label">{sec.fSubject}</span>
              <input
                className="field-input" type="text" name="subject"
                value={form.subject} placeholder={sec.fSubjectPh}
                onChange={onChange} disabled={busy}
              />
            </label>

            <label className="field">
              <span className="field-label">{sec.fMessage}</span>
              <textarea
                className="field-textarea" name="message" required
                value={form.message} placeholder={sec.fMessagePh}
                onChange={onChange} disabled={busy}
              />
            </label>

            <button className="btn btn-primary send-btn" type="submit" disabled={busy}>
              {busy ? sec.sending : sec.sendBtn} <Icon name="arrow-right" size={14} />
            </button>
            <div className={'send-status' + (statusType === 'ok' ? ' ok' : '')}>{status}</div>
          </form>
        </div>
      </div>
    </section>
  );
}
