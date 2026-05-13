import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add('in'), delay); io.disconnect(); }
    }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal" style={style}>{children}</div>;
}

const SOCIAL = [
  { label: 'GitHub',   value: '@pawelnowicki87',                 href: 'https://github.com/pawelnowicki87' },
  { label: 'LinkedIn', value: '/in/pawelnowicki87',              href: 'https://www.linkedin.com/in/pawelnowicki87/' },
  { label: 'Email',    value: 'pawelnowickifullstack@gmail.com', href: 'mailto:pawelnowickifullstack@gmail.com' },
  { label: 'Location', value: 'Wrocław, Polska',                 href: null },
];

const ExtIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" style={{ width: 12, height: 12, flexShrink: 0 }}>
    <path d="M5 11l6-6M7 5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Contact({ t }) {
  const [form, setForm]       = useState({ user_name: '', user_email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.user_name || !form.user_email || !form.message) return;
    setLoading(true);
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      toast.success(t.contact.successMsg);
      setForm({ user_name: '', user_email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      toast.error(t.contact.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = (name) => ({
    width: '100%',
    background: 'var(--c-input-bg)',
    border: `1px solid ${focused === name ? 'rgba(167,139,250,0.5)' : 'var(--c-input-bdr)'}`,
    boxShadow: focused === name ? '0 0 0 3px rgba(167,139,250,0.12)' : 'none',
    borderRadius: 10,
    padding: '0.7rem 1rem',
    fontSize: '1rem',
    color: 'var(--c-text-1)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  });

  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{ borderTop: '1px solid var(--c-border-s)' }}
    >
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.5 }} />
      <div className="aurora" style={{ opacity: 0.6 }} />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Label */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span className="section-num">04 /</span>
            <span style={{ height: 1, width: 32, background: 'var(--c-sep)' }} />
            <span className="section-label">{t.contact.label}</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: heading + social */}
          <Reveal delay={80} style={{ gridColumn: 'span 5 / span 5' }}>
            <h2 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: '1.75rem' }}>
              <span className="grad-text block">{t.contact.heading1}</span>
              <span className="grad-violet">{t.contact.heading2}</span>
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--c-text-2)', marginBottom: '2.5rem', maxWidth: '45ch' }}>
              {t.contact.sub}
            </p>

            {/* Social grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {SOCIAL.map(({ label, value, href }) => (
                <div
                  key={label}
                  className="card group"
                  style={{ padding: '0.85rem 1rem', cursor: href ? 'pointer' : 'default' }}
                  onClick={() => href && window.open(href, '_blank', 'noopener noreferrer')}
                >
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 4 }}>
                    {label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--c-text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {value}
                    </span>
                    {href && <span style={{ opacity: 0, transition: 'opacity 0.2s', color: 'var(--c-text-3)' }} className="group-hover:opacity-100"><ExtIcon /></span>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={160} style={{ gridColumn: 'span 7 / span 7' }}>
            <div className="card" style={{ padding: '2rem 2rem' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { name: 'user_name',  label: t.contact.namePlaceholder,    type: 'text',     ph: t.contact.namePlaceholder },
                  { name: 'user_email', label: t.contact.emailPlaceholder,   type: 'email',    ph: t.contact.emailPlaceholder },
                ].map(f => (
                  <div key={f.name}>
                    <label style={{ display: 'block', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 8 }}>
                      {f.label}
                    </label>
                    <input
                      name={f.name} type={f.type} value={form[f.name]}
                      onChange={handleChange} placeholder={f.ph} required disabled={loading}
                      onFocus={() => setFocused(f.name)} onBlur={() => setFocused(null)}
                      style={fieldStyle(f.name)}
                    />
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 8 }}>
                    {t.contact.messagePlaceholder}
                  </label>
                  <textarea
                    name="message" rows={5} value={form.message}
                    onChange={handleChange} placeholder={t.contact.messagePlaceholder}
                    required disabled={loading}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle('message'), resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="btn-shimmer"
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '0.85rem', borderRadius: 999,
                    fontSize: '1rem', fontWeight: 600,
                    background: 'var(--c-btn-bg)', color: 'var(--c-btn-text)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    border: 'none', fontFamily: 'inherit',
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" viewBox="0 0 24 24" fill="none" style={{ width: 18, height: 18 }}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.2"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      {t.contact.sending}
                    </>
                  ) : t.contact.send}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ position: 'relative', marginTop: '6rem', borderTop: '1px solid var(--c-border-s)' }}>
        <div
          className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: 'var(--c-text-3)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="w-2 h-2 rounded-full pulse-dot flex-shrink-0" style={{ background: '#5eead4' }} />
            <span>{t.footer.status}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span>{t.footer.copyright}</span>
            <span className="hidden md:inline">{t.footer.tagline}</span>
          </div>
        </div>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="dark"
        style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14 }}
      />
    </section>
  );
}

export default Contact;
