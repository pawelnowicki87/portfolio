import React from 'react';

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-mono">{t.footer.built}</div>
      <div className="links">
        <a href="https://github.com/pawelnowicki87" target="_blank" rel="noreferrer">GitHub</a>
        <span style={{ color: 'var(--fg-mute)' }}>·</span>
        <a href="https://www.linkedin.com/in/pawe%C5%82-nowicki-305380268/" target="_blank" rel="noreferrer">LinkedIn</a>
        <span style={{ color: 'var(--fg-mute)' }}>·</span>
        <a href="mailto:webstardevelop@gmail.com">Email</a>
      </div>
    </footer>
  );
}
