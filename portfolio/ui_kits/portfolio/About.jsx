// Portfolio About — recreation of src/components/About.js
const PortfolioAbout = ({ t }) => (
  <section id="about" className="pf-section">
    <div className="pf-section-inner pf-about">
      <div className="pf-about-img">
        <img src="../../assets/about-portrait.jpg" alt="Paweł" />
      </div>
      <div>
        <p className="pf-eyebrow">{t.aboutTitle}</p>
        <h2 className="pf-h2">{t.aboutTitle}</h2>
        <p className="pf-lead">{t.aboutText}</p>
        <div className="pf-facts">
          <div className="pf-fact"><b>8+</b><span>years engineering</span></div>
          <div className="pf-fact"><b>30+</b><span>projects shipped</span></div>
          <div className="pf-fact"><b>EU</b><span>remote, GMT+1</span></div>
        </div>
      </div>
    </div>
  </section>
);
window.PortfolioAbout = PortfolioAbout;
