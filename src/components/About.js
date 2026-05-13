import React, { useRef, useEffect } from 'react';
import me from '../image/me.png';

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

function About({ t, language }) {
  const cvFile = language === 'pl'
    ? process.env.PUBLIC_URL + '/cv_pl.pdf'
    : process.env.PUBLIC_URL + '/cv_en.pdf';

  return (
    <section
      id="about"
      className="relative py-28"
      style={{ borderTop: '1px solid var(--c-border-s)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span className="section-num">03 /</span>
            <span style={{ height: 1, width: 32, background: 'var(--c-sep)' }} />
            <span className="section-label">{t.about.label}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em', fontWeight: 700, marginBottom: '3.5rem', lineHeight: 1.1 }}>
            <span className="grad-text block">{t.about.heading1}</span>
            <span className="grad-violet">{t.about.heading2}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Portrait */}
          <Reveal style={{ gridColumn: 'span 4 / span 4' }} delay={80}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute', inset: -16, borderRadius: 24,
                  opacity: 0.2, filter: 'blur(24px)',
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.5), rgba(94,234,212,0.3))',
                }}
              />
              <img
                src={me}
                alt="Paweł Nowicki"
                style={{
                  position: 'relative', width: '100%', borderRadius: 20,
                  objectFit: 'cover', maxHeight: 500, objectPosition: 'center top',
                  border: '1px solid var(--c-border)',
                }}
              />
            </div>
          </Reveal>

          {/* Text column */}
          <div className="lg:col-span-8 space-y-8">
            <Reveal delay={120}>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.75, color: 'var(--c-text-2)', maxWidth: '65ch' }}>
                {t.about.text}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <a
                href={cvFile}
                download
                className="btn-shimmer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '0.7rem 1.4rem', borderRadius: 999,
                  fontSize: 15, fontWeight: 600,
                  background: 'var(--c-btn-bg)', color: 'var(--c-btn-text)',
                  textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 15, height: 15 }}>
                  <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t.about.downloadCV}
              </a>
            </Reveal>

            {/* Principles card */}
            <Reveal delay={280}>
              <div className="card" style={{ padding: '1.5rem 1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ height: 1, width: 16, background: 'var(--c-sep)' }} />
                  <span className="section-label">{t.about.principles.title}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {t.about.principles.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: '#a78bfa', marginTop: 2, flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: '1rem', color: 'var(--c-text-2)', lineHeight: 1.6 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
