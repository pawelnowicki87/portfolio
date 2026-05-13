import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Projects from './components/Projects';
import Contact from './components/Contact';
import About from './components/About';
import texts from './texts';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('pl');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const t = texts[language];

  return (
    <>
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <About t={t} 
        darkMode={darkMode} 
        language={language}/>
      <Projects t={t} />
      <Contact t={t} darkMode={darkMode} />
    </>
  );
}

export default App;