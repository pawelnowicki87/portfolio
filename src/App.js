import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stack from './components/Stack';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import texts from './texts';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('pl');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.body.style.background = darkMode ? '#06070a' : '#fafbfc';
  }, [darkMode]);

  const t = texts[language];

  return (
    <>
      <Navbar
        t={t}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main>
        <Hero t={t} language={language} />
        <Stack t={t} />
        <Projects t={t} language={language} />
        <About t={t} language={language} />
        <Contact t={t} />
      </main>
    </>
  );
}

export default App;
