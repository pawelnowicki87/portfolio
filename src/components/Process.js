import React, { useState } from 'react';
import { Reveal } from './Motion';
import StudioGlyph from './StudioGlyph';

export default function Process({ c }) {
  const [active, setActive] = useState(0);
  return <section id="process" className="process-section">
    <div className="section-wrap section-space process-layout">
      <Reveal className="process-heading"><p className="eyebrow">{c.processLabel}</p><h2 className="section-title">{c.processTitle}<br/><span>{c.processAccent}</span></h2><div className={'process-orbit step-' + active} aria-hidden="true"><div className="process-ring"/><div className="process-ring ring-two"/><StudioGlyph type={['interface', 'architecture', 'launch', 'asterisk'][active]}/><span>0{active + 1} / 04</span></div></Reveal>
      <div className="process-steps">{c.steps.map(([title, description], i) => <Reveal key={title} delay={i * 60}><div className={'process-step' + (active === i ? ' active' : '')}><h3><button type="button" id={'step-button-' + i} onClick={() => setActive(i)} aria-expanded={active === i} aria-controls={'step-panel-' + i}><span className="step-number">0{i + 1}</span><span>{title}</span><span className="step-toggle" aria-hidden="true">{active === i ? '−' : '+'}</span></button></h3><div id={'step-panel-' + i} role="region" aria-labelledby={'step-button-' + i} hidden={active !== i}><p>{description}</p></div></div></Reveal>)}</div>
    </div>
  </section>;
}
