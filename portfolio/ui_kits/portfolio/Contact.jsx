// Portfolio Contact — recreation of src/components/Contact.js
const PortfolioContact = ({ t }) => {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const change = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); setForm({ name:'', email:'', message:'' }); };
  return (
    <section id="contact" className="pf-section">
      <div className="pf-section-inner pf-contact">
        <div className="pf-contact-info">
          <p className="pf-eyebrow">{t.contact}</p>
          <h2 className="pf-h2">{t.contact}</h2>
          <p className="pf-lead">Open to senior full-stack engineering roles and consulting engagements across the EU. Drop a note — I'll reply within one business day.</p>
          <div className="pf-contact-line"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M22 16.9V21a1 1 0 0 1-1.1 1A19.8 19.8 0 0 1 2 3.1 1 1 0 0 1 3 2h4.1a1 1 0 0 1 1 .8 12 12 0 0 0 .7 2.6 1 1 0 0 1-.2 1L7 8a16 16 0 0 0 6 6l1.6-1.6a1 1 0 0 1 1-.2 12 12 0 0 0 2.6.7 1 1 0 0 1 .8 1z"/></svg> +48 504 782 655</div>
          <div className="pf-contact-line"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM2 6l10 7 10-7"/></svg> webstardevelop@gmail.com</div>
          <div className="pf-contact-line"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Wrocław, Poland</div>
        </div>
        <form className="pf-contact-form" onSubmit={submit}>
          <div className="pf-field">
            <label>{t.name}</label>
            <input required value={form.name} onChange={change('name')} className="ds-input" placeholder="Paweł Nowicki"/>
          </div>
          <div className="pf-field">
            <label>{t.email}</label>
            <input required type="email" value={form.email} onChange={change('email')} className="ds-input" placeholder="you@company.com"/>
          </div>
          <div className="pf-field">
            <label>{t.message}</label>
            <textarea required rows={4} value={form.message} onChange={change('message')} className="ds-input ds-textarea" placeholder="Tell me about your project…"/>
          </div>
          <button type="submit" className="ds-btn ds-btn-primary ds-btn-block">{t.send}</button>
          {sent && <div className="pf-toast">Message sent. I'll reply soon.</div>}
        </form>
      </div>
    </section>
  );
};
window.PortfolioContact = PortfolioContact;
