import React, { useState, useEffect } from 'react';

function Navbar({ t, language, setLanguage, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#projects', label: t.nav.projects },
    { href: '#about',    label: t.nav.about },
    { href: '#contact',  label: t.nav.contact },
  ];

  const headerBg = scrolled
    ? (darkMode ? 'rgba(6,7,10,0.82)' : 'rgba(250,251,252,0.90)')
    : 'transparent';
  const headerBorder = scrolled
    ? (darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)')
    : 'transparent';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${scrolled ? 'backdrop-blur-md border-b' : ''}`}
      style={{ background: headerBg, borderColor: headerBorder }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 60 }}>
        {/* Logo */}
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <span
            style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'linear-gradient(135deg, #a78bfa, #5eead4)',
              display: 'grid', placeItems: 'center',
              color: '#fff', fontSize: 15, fontWeight: 700,
              flexShrink: 0,
            }}
          >P</span>
          <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--c-text-1)' }}>
            nowicki<span style={{ color: 'var(--c-text-3)' }}>.dev</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="link-u"
              style={{ fontSize: 15, fontWeight: 500, color: 'var(--c-text-2)', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Available badge */}
          <span className="chip hidden sm:inline-flex" style={{ fontSize: 12 }}>
            <span className="w-2 h-2 rounded-full pulse-dot flex-shrink-0" style={{ background: '#5eead4' }} />
            {t.nav.available}
          </span>

          {/* Language toggle */}
          <button
            onClick={() => setLanguage(l => l === 'pl' ? 'en' : 'pl')}
            className="chip"
            style={{ cursor: 'pointer', borderColor: 'rgba(167,139,250,0.35)', color: '#a78bfa', fontSize: 12 }}
            aria-label="Toggle language"
          >
            {language === 'pl' ? 'EN' : 'PL'}
          </button>

          {/* Dark / light toggle */}
          <button
            onClick={() => setDarkMode(d => !d)}
            style={{
              width: 36, height: 36, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--c-chip-bg)', border: '1px solid var(--c-chip-bdr)',
              color: 'var(--c-text-2)', cursor: 'pointer',
            }}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8 1v1M8 14v1M1 8h1M14 8h1M3.05 3.05l.7.7M12.25 12.25l.7.7M12.95 3.05l-.7.7M3.75 12.25l-.7.7"
                  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}>
                <path d="M13.5 9A6 6 0 0 1 7 2.5a5.5 5.5 0 1 0 6.5 6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="btn-shimmer hidden sm:inline-flex"
            style={{
              alignItems: 'center', gap: 6,
              padding: '0.5rem 1.1rem', borderRadius: 999,
              fontSize: 14, fontWeight: 600,
              background: 'var(--c-btn-bg)', color: 'var(--c-btn-text)',
              textDecoration: 'none',
            }}
          >
            {t.nav.getInTouch}
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              width: 36, height: 36, borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--c-chip-bg)', border: '1px solid var(--c-chip-bdr)',
              color: 'var(--c-text-2)', cursor: 'pointer',
            }}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              : <svg viewBox="0 0 16 16" fill="none" style={{ width: 16, height: 16 }}><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-5 flex flex-col"
          style={{
            gap: 20,
            background: darkMode ? 'rgba(6,7,10,0.97)' : 'rgba(250,251,252,0.97)',
            borderColor: 'var(--c-border-s)',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 17, fontWeight: 500, color: 'var(--c-text-2)', textDecoration: 'none' }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-shimmer"
            style={{
              display: 'inline-flex', justifyContent: 'center',
              padding: '0.75rem 1.25rem', borderRadius: 999,
              fontSize: 15, fontWeight: 600,
              background: 'var(--c-btn-bg)', color: 'var(--c-btn-text)',
              textDecoration: 'none', marginTop: 4,
            }}
          >
            {t.nav.getInTouch}
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
