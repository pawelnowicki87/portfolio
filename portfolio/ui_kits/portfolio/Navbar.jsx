// Portfolio Navbar — recreation of src/components/Navbar.js
// Brand mark preserves blue-highlighted initials; FA icons swapped for Lucide.
const PortfolioNavbar = ({ t, language, setLanguage, darkMode, setDarkMode }) => {
  const Icon = ({ d }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
  return (
    <nav className="pf-nav">
      <div className="pf-nav-inner">
        <a href="#home" className="pf-brand">
          <span className="ac">P</span>aweł <span className="ac">N</span>owicki
        </a>
        <div className="pf-nav-links">
          <a href="#about">{t.about}</a>
          <a href="#projects">{t.projects}</a>
          <a href="#contact">{t.contact}</a>
        </div>
        <div className="pf-nav-actions">
          {/* react-icons: FaGithub */}
          <a href="https://github.com/pawelnowicki87" target="_blank" rel="noreferrer" className="pf-icon-btn" aria-label="GitHub">
            <Icon d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.5-1.6 6.5-7.5A5.4 5.4 0 0 0 19 3a5 5 0 0 0-.1-3.7s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C5.3-1 4.1-.6 4.1-.6A5 5 0 0 0 4 3a5.4 5.4 0 0 0-1.5 3.8c0 5.9 3.2 7.1 6.5 7.5A3.5 3.5 0 0 0 8 17v5"/>
          </a>
          {/* react-icons: FaLinkedin */}
          <a href="#" className="pf-icon-btn" aria-label="LinkedIn">
            <Icon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
          </a>
          <div className="pf-seg">
            <button className={'pf-seg-btn ' + (language === 'pl' ? 'on' : '')} onClick={() => setLanguage('pl')}>PL</button>
            <button className={'pf-seg-btn ' + (language === 'en' ? 'on' : '')} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button className="pf-theme" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
            {darkMode
              ? <Icon d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.4-6.4-.7.7M6.3 17.7l-.7.7m12.8 0-.7-.7M6.3 6.3l-.7-.7M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
              : <Icon d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>}
          </button>
        </div>
      </div>
    </nav>
  );
};

window.PortfolioNavbar = PortfolioNavbar;
