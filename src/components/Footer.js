import React from 'react';
import Icon from './Icon';
import StudioGlyph from './StudioGlyph';

export default function Footer({ c }) {
  return <footer className="site-footer section-wrap"><div className="footer-main"><a href="#top" className="footer-brand"><StudioGlyph/>paweł nowicki.</a><a href="#top" className="back-top">{c.top}<Icon name="arrow-up-right"/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} · {c.footer}</span><div><a href="https://github.com/pawelnowicki87" target="_blank" rel="noreferrer">GitHub<Icon name="arrow-up-right" size={13}/></a><a href="https://www.linkedin.com/in/pawe%C5%82-nowicki-305380268/" target="_blank" rel="noreferrer">LinkedIn<Icon name="arrow-up-right" size={13}/></a><a href="mailto:pawel.nowicki.dev@gmail.com">Email<Icon name="arrow-up-right" size={13}/></a></div></div></footer>;
}
