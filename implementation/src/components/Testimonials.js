import React, { useRef } from 'react';
import Icon from './Icon';
import { useInView } from '../hooks';

export default function Testimonials({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const sec = t.testiSec;
  return (
    <section id="voices" ref={ref}>
      <div className="container">
        <div className={'section-head reveal' + (inView ? ' in-view' : '')}>
          <span className="eyebrow"><span className="dot" /> {sec.eyebrow}</span>
          <h2 className="section-title">
            {sec.title}<span className="grad-text-accent">{sec.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{sec.sub}</p>
        </div>

        <div className="testi-grid">
          {sec.items.map((it, i) => (
            <div key={i} className={'testi reveal delay-' + (i + 1) + (inView ? ' in-view' : '')}>
              <div className="testi-quote-mark">"</div>
              <div className="testi-stars">
                {[0, 1, 2, 3, 4].map((s) => <Icon key={s} name="star" size={14} />)}
              </div>
              <div className="testi-text">"{it.text}"</div>
              <div className="testi-who">
                <div className="testi-avatar">{it.initials}</div>
                <div>
                  <div className="testi-name">{it.name}</div>
                  <div className="testi-role">{it.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
