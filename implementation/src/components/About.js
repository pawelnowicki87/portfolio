import React, { useRef } from 'react';
import Icon from './Icon';
import about from '../image/about.jpg';
import { useInView } from '../hooks';

export default function About({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const sec = t.aboutSec;

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <div className={'section-head reveal' + (inView ? ' in-view' : '')}>
          <span className="eyebrow"><span className="dot" /> {sec.eyebrow}</span>
          <h2 className="section-title">
            {sec.title}<span className="grad-text-accent">{sec.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{sec.sub}</p>
        </div>

        <div className="about-grid">
          <div className={'about-portrait reveal delay-1' + (inView ? ' in-view' : '')}>
            <img src={about} alt="Paweł Nowicki" />
            <div className="about-portrait-tag">{sec.portraitTag}</div>
            <div className="about-portrait-badge">
              <span className="pulse" />
              {sec.portraitBadge}
            </div>
          </div>

          <div className={'reveal delay-2' + (inView ? ' in-view' : '')}>
            <p className="about-bio">{sec.bio1}</p>
            <p className="about-bio" style={{ marginBottom: 0 }}>{sec.bio2}</p>

            <div className="about-meta" style={{ marginTop: 28 }}>
              {sec.meta.map((m) => (
                <div className="about-meta-item" key={m.label}>
                  <div className="ic"><Icon name={m.icon} /></div>
                  <div>
                    <div className="label">{m.label}</div>
                    <div className="val">{m.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="timeline">
              {sec.timeline.map((tl, i) => (
                <div className="timeline-item" key={i}>
                  <div className="timeline-year">{tl.year}</div>
                  <div className="timeline-title">{tl.title}</div>
                  <div className="timeline-desc">{tl.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
