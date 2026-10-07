import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import StudioGlyph from './StudioGlyph';

export default function Nav({ c, language, setLanguage, darkMode, setDarkMode, motion, setMotion, reduced }) {
  const dialog = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)');
    const closeOnDesktop = () => { if (mq.matches) dialog.current?.close(); };
    mq.addEventListener('change', closeOnDesktop);
    return () => mq.removeEventListener('change', closeOnDesktop);
  }, []);
  const close = () => dialog.current?.close();
  const controls = <div className="nav-controls">
    <div className="language-switch" aria-label="Language">
      {['pl', 'en'].map(lang => <button key={lang} type="button" aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang.toUpperCase()}</button>)}
    </div>
    <button className="icon-button theme-switch" onClick={() => setDarkMode(!darkMode)} aria-label={c.theme} type="button">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{darkMode ? <><circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/></> : <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>}</svg>
    </button>
    <button className="icon-button motion-switch" onClick={() => setMotion(!motion)} aria-label={c.motion} aria-pressed={motion && !reduced} disabled={reduced} title={reduced ? c.reduced : c.motion} type="button">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{motion && !reduced ? <path d="M8 5v14M16 5v14"/> : <path d="m7 4 13 8-13 8Z"/>}</svg>
    </button>
  </div>;
  return <>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Paweł Nowicki"><StudioGlyph /><span>paweł nowicki<span className="brand-period">.</span></span></a>
      <nav className="desktop-nav" aria-label={language === 'pl' ? 'Nawigacja główna' : 'Main navigation'}>
        {c.nav.map(([id, label]) => <a key={id} href={'#' + id}>{label}</a>)}
      </nav>
      <div className="desktop-controls">{controls}<a href="#contact" className="button button-small">{c.talk}<Icon name="arrow-up-right" size={15}/></a></div>
      <button type="button" className="icon-button mobile-toggle" aria-label={c.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => { dialog.current.showModal(); setOpen(true); }}><span/><span/></button>
    </header>
    <dialog id="mobile-menu" ref={dialog} className="menu-dialog" aria-label={c.menu} onClose={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) close(); }}>
      <div className="menu-panel">
        <div className="menu-top"><StudioGlyph/><button type="button" className="icon-button" onClick={close} aria-label={c.close}><Icon name="x"/></button></div>
        <nav className="mobile-links">{[...c.nav, ['contact', c.talk]].map(([id, label], i) => <a key={id} href={'#' + id} onClick={close}><small>0{i + 1}</small>{label}<Icon name="arrow-up-right" size={24}/></a>)}</nav>
        {controls}
        <a className="menu-email" href="mailto:pawel.nowicki.dev@gmail.com">pawel.nowicki.dev@gmail.com</a>
      </div>
    </dialog>
  </>;
}
