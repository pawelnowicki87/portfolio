import React, { useRef, useState } from 'react';
import Icon from './Icon';
import { Reveal } from './Motion';
import { sendContact, ContactError } from '../contactService';

const empty = { user_name: '', user_email: '', subject: '', message: '' };
export default function Contact({ c }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const onChange = e => { setForm(previous => ({ ...previous, [e.target.name]: e.target.value })); setStatus(''); };
  const submit = async e => {
    e.preventDefault();
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setStatus('');
    try {
      await sendContact(form);
      setForm(empty);
      setStatus('success');
    } catch (error) {
      setStatus(error instanceof ContactError ? error.code : 'error');
    } finally { lock.current = false; setBusy(false); }
  };
  return <section id="contact" className="contact-section">
    <div className="contact-art" aria-hidden="true"><img src="/art/blue-portal-1536.webp" srcSet="/art/blue-portal-768.webp 768w, /art/blue-portal-1536.webp 1536w" sizes="100vw" width="1536" height="1024" alt="" loading="lazy"/></div>
    <div className="section-wrap section-space contact-layout">
      <Reveal className="contact-copy"><p className="eyebrow">{c.contactLabel}</p><h2 className="section-title">{c.contactTitle}<br/><span>{c.contactAccent}</span></h2><p>{c.contactIntro}</p><a className="contact-email" href="mailto:pawel.nowicki.dev@gmail.com">pawel.nowicki.dev@gmail.com<Icon name="arrow-up-right"/></a><a className="contact-phone" href="tel:+48504782655">+48 504 782 655</a><div className="contact-availability"><span className="status-dot"/>{c.available}</div></Reveal>
      <Reveal className="contact-form-wrap" delay={100}><form className="contact-form" onSubmit={submit} aria-busy={busy}>
        <h3>{c.formTitle}</h3>
        <div className="form-row">
          <label>{c.name}<input name="user_name" autoComplete="name" required maxLength={100} value={form.user_name} onChange={onChange} placeholder={c.namePh} disabled={busy}/></label>
          <label>{c.email}<input type="email" name="user_email" autoComplete="email" required maxLength={254} value={form.user_email} onChange={onChange} placeholder={c.emailPh} disabled={busy}/></label>
        </div>
        <label>{c.subject}<input name="subject" maxLength={200} value={form.subject} onChange={onChange} placeholder={c.subjectPh} disabled={busy}/></label>
        <label>{c.message}<textarea name="message" required maxLength={5000} rows={4} value={form.message} onChange={onChange} placeholder={c.messagePh} disabled={busy}/></label>
        <p className="form-note">{c.contactNote}</p>
        <button type="submit" className="button send-button" disabled={busy}>{busy ? c.sending : c.send}<Icon name={status === 'success' ? 'check' : 'arrow-up-right'}/></button>
        <p className={'form-status ' + status} role="status" aria-live="polite" aria-atomic="true">{busy ? c.sending : status ? c[status] : ''}</p>
        {(status === 'error' || status === 'unavailable') && <a className="text-link" href="mailto:pawel.nowicki.dev@gmail.com">{c.direct}<Icon name="mail"/></a>}
      </form></Reveal>
    </div>
  </section>;
}
