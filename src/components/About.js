import React from 'react';
import Icon from './Icon';
import StudioGlyph from './StudioGlyph';
import { Reveal } from './Motion';
import portrait from '../image/me.png';

export default function About({ c }) {
  return <section id="about" className="about-section section-wrap section-space">
    <Reveal><p className="eyebrow">{c.aboutLabel}</p></Reveal>
    <div className="about-layout">
      <Reveal className="portrait-card"><div className="portrait-frame"><img src={portrait} alt={c.portrait} width="600" height="750" loading="lazy"/><span className="portrait-monogram">pn.</span></div><div className="portrait-caption"><span><i className="status-dot"/>{c.based}</span><span>{c.languages}</span></div></Reveal>
      <Reveal className="about-copy" delay={100}>
        <h2 className="section-title">{c.aboutTitle}<br/><span>{c.aboutAccent}</span></h2>
        <p className="about-lead">{c.aboutIntro}</p><p className="muted">{c.aboutText}</p>
        <a className="text-link" href="https://github.com/pawelnowicki87" target="_blank" rel="noreferrer">{c.aboutLink}<Icon name="arrow-up-right"/></a>
        <div className="about-signature"><span>Paweł Nowicki</span><StudioGlyph/></div>
      </Reveal>
    </div>
    <div className="capabilities">{c.capabilities.map((item, i) => <Reveal className="capability" key={item.title} delay={i * 70}><div className="capability-top"><StudioGlyph type={item.icon}/><span>0{i + 1}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="capability-tags">{item.tags}</div></Reveal>)}</div>
  </section>;
}
