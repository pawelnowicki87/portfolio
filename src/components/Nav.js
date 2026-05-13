import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import { scrollToId } from '../hooks';

export default function Nav({ t, active, language, setLanguage, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { id: 'about',   label: t.nav.about },
    { id: 'skills',  label: t.nav.skills },
    { id: 'work',    label: t.nav.work },
    { id: 'voices',  label: t.nav.voices },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleLink = (id) => {
    setMenuOpen(false);
    setTimeout(() => scrollToId(id), 10);
  };

  return (
    <>
      <nav className={'nav' + (scrolled ? ' scrolled' : '') + (menuOpen ? ' menu-open' : '')}>
        {/* Brand */}
        <a className="nav-brand" href="#top" onClick={(e) => { e.preventDefault(); handleLink('top'); }}>
          <span className="nav-brand-mark"><span>PN</span></span>
          <span>
            Paweł Nowicki
            <small>{t.nav.brandSub}</small>
          </span>
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {links.map((l) => (
            <a
              key={l.id}
              className={'nav-link' + (active === l.id ? ' active' : '')}
              href={'#' + l.id}
              onClick={(e) => { e.preventDefault(); scrollToId(l.id); }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="nav-cta">
          <div className="lang-switch" role="radiogroup" aria-label="Language">
            <button type="button" className={'lang-btn' + (language === 'pl' ? ' active' : '')} onClick={() => setLanguage('pl')}>PL</button>
            <button type="button" className={'lang-btn' + (language === 'en' ? ' active' : '')} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button type="button" className="icon-btn" aria-label="Toggle theme" onClick={() => setDarkMode(!darkMode)}>
            {darkMode
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>
            }
          </button>
          <a className="icon-btn" href="https://github.com/pawelnowicki87" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a>
          <a className="icon-btn" href="https://www.linkedin.com/in/pawe%C5%82-nowicki-305380268/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
          <button className="btn btn-primary nav-cta-btn" onClick={() => scrollToId('contact')}>
            {t.nav.cta} <Icon name="arrow-right" size={14} />
          </button>
        </div>

        {/* Hamburger button (mobile/tablet) */}
        <button
          className={'nav-hamburger' + (menuOpen ? ' open' : '')}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          type="button"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <div className={'nav-mobile-overlay' + (menuOpen ? ' open' : '')} onClick={() => setMenuOpen(false)} />
      <div className={'nav-mobile-menu' + (menuOpen ? ' open' : '')}>
        <nav className="nav-mobile-links">
          {links.map((l) => (
            <a
              key={l.id}
              className={'nav-mobile-link' + (active === l.id ? ' active' : '')}
              href={'#' + l.id}
              onClick={(e) => { e.preventDefault(); handleLink(l.id); }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-mobile-bottom">
          <div className="lang-switch">
            <button type="button" className={'lang-btn' + (language === 'pl' ? ' active' : '')} onClick={() => setLanguage('pl')}>PL</button>
            <button type="button" className={'lang-btn' + (language === 'en' ? ' active' : '')} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button type="button" className="icon-btn" aria-label="Toggle theme" onClick={() => setDarkMode(!darkMode)}>
            {darkMode
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>
            }
          </button>
          <a className="icon-btn" href="https://github.com/pawelnowicki87" target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a>
          <a className="icon-btn" href="https://www.linkedin.com/in/pawe%C5%82-nowicki-305380268/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
        </div>

        <button className="btn btn-primary nav-mobile-cta" onClick={() => handleLink('contact')}>
          {t.nav.cta} <Icon name="arrow-right" size={14} />
        </button>
      </div>
    </>
  );
}
