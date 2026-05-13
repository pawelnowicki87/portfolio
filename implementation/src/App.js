import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import texts from './texts';
import { useScrollActive } from './hooks';

import './App.css';

const SECTION_IDS = ['about', 'skills', 'work', 'voices', 'contact'];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('pn:theme');
    return saved ? saved === 'dark' : true;
  });
  const [language, setLanguage] = useState(() => localStorage.getItem('pn:lang') || 'pl');
  const active = useScrollActive(SECTION_IDS);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-light', !darkMode);
    localStorage.setItem('pn:theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('pn:lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = texts[language];

  return (
    <div className="app-shell">
      <div className="grid-overlay" />
      <Nav
        t={t}
        active={active}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Hero t={t} language={language} enable3D />
      <About t={t} />
      <Skills t={t} />
      <Projects t={t} />
      <Testimonials t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}
