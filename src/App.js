import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import texts from './texts';
import copy from './portfolioCopy';
import { MotionContext } from './components/Motion';
import './App.css';

function saved(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
export default function App() {
  const [language, setLanguage] = useState(() => saved('pn:lang', 'pl') === 'en' ? 'en' : 'pl');
  const [darkMode, setDarkMode] = useState(() => saved('pn:theme', 'dark') === 'dark');
  const [motion, setMotion] = useState(() => saved('pn:motion', 'on') !== 'off');
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    document.documentElement.dataset.motion = motion && !reduced ? 'on' : 'off';
    document.querySelector('meta[name="description"]').content = copy[language].meta;
    try {
      localStorage.setItem('pn:lang', language);
      localStorage.setItem('pn:theme', darkMode ? 'dark' : 'light');
      localStorage.setItem('pn:motion', motion ? 'on' : 'off');
    } catch { /* Storage may be unavailable. */ }
  }, [language, darkMode, motion, reduced]);
  const t = texts[language];
  const c = copy[language];
  return (
    <MotionContext.Provider value={motion && !reduced}>
      <div className="app-shell">
        <a className="skip-link" href="#main">{c.skip}</a>
        <Nav {...{ c, language, setLanguage, darkMode, setDarkMode, motion, setMotion, reduced }} />
        <main id="main" tabIndex={-1}>
          <Hero c={c} />
          <Projects t={t} c={c} />
          <About c={c} />
          <Process c={c} />
          <Contact c={c} />
        </main>
        <Footer c={c} />
      </div>
    </MotionContext.Provider>
  );
}
