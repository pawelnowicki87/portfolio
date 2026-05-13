// Portfolio Hero — recreation of src/components/Hero.js
// Adds a subtle radial blue glow behind the portrait (marketing-only motif).
const PortfolioHero = ({ t, language }) => {
  return (
    <section id="home" className="pf-hero">
      <div className="pf-hero-glow"></div>
      <div className="pf-hero-grid">
        <div className="pf-hero-portrait">
          <img src="../../assets/founder-portrait.png" alt="Paweł Nowicki" />
        </div>
        <div className="pf-hero-copy">
          <p className="pf-eyebrow">{language === 'pl' ? 'Senior Full-Stack Engineer · Wrocław' : 'Senior Full-Stack Engineer · Wrocław'}</p>
          <h1 className="pf-hero-title">
            {t.welcome}
            <br/>
            <span className="ac">{t.welcomeSub}</span>
          </h1>
          <p className="pf-hero-sub">{t.subtitle}</p>
          <div className="pf-hero-cta">
            <a className="ds-btn ds-btn-primary" href="#" download>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              {language === 'pl' ? 'Pobierz CV' : 'Download CV'}
            </a>
            <a className="ds-btn ds-btn-secondary" href="#projects">
              {t.projectsBtn}
            </a>
          </div>
          <div className="pf-stack-row">
            <span className="pf-chip">React</span>
            <span className="pf-chip">TypeScript</span>
            <span className="pf-chip">NestJS</span>
            <span className="pf-chip">PostgreSQL</span>
            <span className="pf-chip">AWS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

window.PortfolioHero = PortfolioHero;
