import React, { useRef, useEffect } from 'react';
import Hero3D from './Hero3D';

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" style={{ width: 15, height: 15 }}>
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add('in'), delay);
        io.disconnect();
      }
    }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}

function Hero({ t, language }) {
  const cvFile = language === 'pl'
    ? process.env.PUBLIC_URL + '/cv_pl.pdf'
    : process.env.PUBLIC_URL + '/cv_en.pdf';

  return (
    <section
      id="top"
      className="relative overflow-hidden noise"
      style={{ minHeight: '100svh', background: 'inherit' }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg" style={{ opacity: 0.6 }} />
      <div className="aurora" />

      {/* 3D Scene — right half on desktop, full-bg on mobile */}
      <div
        className="absolute inset-0 md:left-1/2"
        style={{ zIndex: 0 }}
      >
        <Hero3D />
      </div>

      {/* Foreground content */}
      <div
        className="relative max-w-7xl mx-auto px-6 flex flex-col justify-center"
        style={{ minHeight: '100svh', paddingTop: '7rem', paddingBottom: '5rem', zIndex: 1 }}
      >
        <div className="max-w-2xl">

          {/* Badge */}
          <Reveal>
            <div className="chip w-fit mb-8" style={{ fontSize: 13 }}>
              <span className="w-2 h-2 rounded-full pulse-dot flex-shrink-0" style={{ background: '#5eead4' }} />
              {t.hero.badge}
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={80}>
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 6rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.96,
                fontWeight: 700,
                marginBottom: '1.75rem',
              }}
            >
              <span className="grad-text block">{t.hero.headline1}</span>
              <span className="grad-text">{t.hero.headline2} </span>
              <span className="grad-violet">{t.hero.headline3}</span>
            </h1>
          </Reveal>

          {/* Subtext */}
          <Reveal delay={180}>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                lineHeight: 1.65,
                color: 'var(--c-text-2)',
                maxWidth: '55ch',
                marginBottom: '2.25rem',
              }}
            >
              {t.hero.sub}
              <strong style={{ color: 'var(--c-text-1)', fontWeight: 600 }}>{t.hero.name}</strong>
              {t.hero.subEnd}
            </p>
          </Reveal>

          {/* CTA buttons */}
          <Reveal delay={260}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
              <a
                href="#projects"
                className="btn-shimmer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '0.75rem 1.5rem', borderRadius: 999,
                  fontSize: '0.95rem', fontWeight: 600,
                  background: 'var(--c-btn-bg)', color: 'var(--c-btn-text)',
                  textDecoration: 'none',
                }}
              >
                {t.hero.viewProjects} <ArrowIcon />
              </a>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '0.75rem 1.5rem', borderRadius: 999,
                  fontSize: '0.95rem', fontWeight: 500,
                  border: '1px solid var(--c-ghost-bdr)',
                  color: 'var(--c-ghost-text)',
                  textDecoration: 'none',
                }}
              >
                {t.hero.contact}
              </a>
              <a
                href={cvFile}
                download
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '0.75rem 1.25rem', borderRadius: 999,
                  fontSize: '0.92rem', fontWeight: 500,
                  color: 'var(--c-text-3)',
                  textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
                  <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t.hero.downloadCV}
              </a>
            </div>
          </Reveal>

          {/* Social links */}
          <Reveal delay={340}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <a
                href="https://github.com/pawelnowicki87"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: 'var(--c-text-3)', textDecoration: 'none' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pawelnowicki87/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', color: 'var(--c-text-3)', textDecoration: 'none' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18 }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            fontFamily: '"JetBrains Mono", monospace', fontSize: 11,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'var(--c-text-3)',
          }}
        >
          <span>scroll</span>
          <span style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, var(--c-text-3), transparent)' }} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
