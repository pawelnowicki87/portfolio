import React, { useRef } from 'react';
import Icon from './Icon';
import { useInView, useMouseTrack } from '../hooks';

import hematobieg    from '../image/Hematobieg.png';
import phonecatalog  from '../image/phonecatalog.png';
import welcome       from '../image/welcometothemet.png';
import balconsonne   from '../image/balconsolar.jpeg';
import smileexpress  from '../image/smileexpress.png';
import vfgPrezenty   from '../image/vfg-prezenty.webp';
import vfgWydarzenie from '../image/vfg-wydarzenie.webp';
import vfgPoster     from '../image/vfg-reel-poster.webp';

const REEL = (process.env.PUBLIC_URL || '') + '/media/voteforgift-reel.mp4';

/* Media & links keyed by project id — order of items in texts.js can change freely. */
const MEDIA = {
  voteforgift:     { kind: 'phones', shots: [vfgPrezenty, vfgWydarzenie], video: REEL, poster: vfgPoster },
  smileexpress:    { kind: 'shot', src: smileexpress },
  balconsonne:     { kind: 'shot', src: balconsonne },
  hematobieg:      { kind: 'shot', src: hematobieg },
  phonecatalog:    { kind: 'shot', src: phonecatalog },
  welcometothemet: { kind: 'shot', src: welcome },
};

const LINKS = {
  voteforgift:     'https://voteforgift.pl/',
  smileexpress:    'https://smileexpress.com/',
  balconsonne:     'https://balkonsonne.app/?lang=en&utm_source=chatgpt.com',
  hematobieg:      'https://hematobieg.org/',
  phonecatalog:    'https://pawelnowicki87.github.io/react_phone-catalog/',
  welcometothemet: 'https://pawelnowicki87.github.io/welcome_to_the_met/',
};

const LAYOUT_CLASS = {
  feature:       'project feature',
  'feature-alt': 'project feature feature-alt',
  showcase:      'project feature project-showcase',
  third:         'project compact',
};

function ProjectMedia({ p, media }) {
  if (media.kind === 'phones') {
    const alt = p.shots || [];
    return (
      <div className="project-media phone-stack">
        <div className="phone">
          <img src={media.shots[0]} alt={alt[0] || p.title} loading="lazy" />
        </div>
        <div className="phone phone-reel">
          <video
            src={media.video}
            poster={media.poster}
            controls
            preload="none"
            playsInline
            aria-label={p.reelAlt || p.title}
          />
        </div>
        <div className="phone">
          <img src={media.shots[1]} alt={alt[1] || p.title} loading="lazy" />
        </div>
      </div>
    );
  }
  return (
    <div className="project-media">
      <img src={media.src} alt={p.title} loading="lazy" />
    </div>
  );
}

function ProjectCard({ p, i, inView, t }) {
  const [ref, onMouseMove] = useMouseTrack();
  const media = MEDIA[p.key];
  const cls = LAYOUT_CLASS[p.layout] || 'project';
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cls + ' reveal delay-' + ((i % 4) + 1) + (inView ? ' in-view' : '')}
    >
      <div className="project-tag"><span className="dot" />{p.tag}</div>
      <div className="project-num">/ 0{i + 1}</div>
      <div className="project-glow" />
      <ProjectMedia p={p} media={media} />
      <div className="project-body">
        <div className="project-title">{p.title}</div>
        <div className="project-desc">{p.desc}</div>
        <div className="project-meta">
          {p.chips.map((c) => <span key={c} className="project-chip">{c}</span>)}
        </div>
        <div className="project-actions">
          <a className="btn btn-primary" href={LINKS[p.key]} target="_blank" rel="noreferrer">
            {t.projectsSec.demo} <Icon name="arrow-up-right" size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const sec = t.projectsSec;
  return (
    <section id="work" ref={ref}>
      <div className="container">
        <div className={'section-head reveal' + (inView ? ' in-view' : '')}>
          <span className="eyebrow"><span className="dot" /> {sec.eyebrow}</span>
          <h2 className="section-title">
            {sec.title}<span className="grad-text-accent">{sec.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{sec.sub}</p>
        </div>

        <div className="projects-grid">
          {sec.items.map((p, i) => <ProjectCard key={p.key} p={p} i={i} inView={inView} t={t} />)}
        </div>
      </div>
    </section>
  );
}
