import React from 'react';
import NavbarComponent from './Navbar';
import Hero from './Hero'

const Header = ({ t, language, setLanguage, darkMode, setDarkMode }) => {
  return (
    <header>
      <NavbarComponent
        t={t}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Hero 
        t={t} 
        language={language} />
    </header>
  );
};

export default Header;
