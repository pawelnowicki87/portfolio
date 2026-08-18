import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { useInView, useMouseTrack } from '../hooks';

import hematobieg    from '../image/Hematobieg.png';
import phonecatalog  from '../image/phonecatalog.png';
import welcome       from '../image/welcometothemet.png';
import balconsonne   from '../image/balconsolar.jpeg';
import smileexpress  from '../image/smileexpress.png';
import vfgPrezenty   from '../image/vfg-prezenty.webp';
import vfgWydarzenie from '../image/vfg-wydarzenie.webp';
import reelPoster1   from '../image/vfg-reel-01-poster.webp';
import reelPoster2   from '../image/vfg-reel-02-poster.webp';
import reelPoster3   from '../image/vfg-reel-03-poster.webp';
import reelPoster4   from '../image/vfg-reel-04-poster.webp';
import reelPoster5   from '../image/vfg-reel-05-poster.webp';

const PUB = process.env.PUBLIC_URL || '';
const REELS = [reelPoster1, reelPoster2, reelPoster3, reelPoster4, reelPoster5].map((poster, i) => ({
  poster,
  src: `${PUB}/media/vfg-reel-0${i + 1}.mp4`,
}));

/* Media & links keyed by project id — order of items in texts.js can change freely. */
const MEDIA = {
  voteforgift:     { kind: 'phones', shots: [vfgPrezenty, vfgWydarzenie], reels: REELS },
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

/* ── Lightbox ───────────────────────────────────────────────── */
function Lightbox({ shot, onClose, closeLabel }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={shot.alt}>
      <button ref={closeRef} className="lightbox-close" onClick={onClose} aria-label={closeLabel} type="button">
        <Icon name="x" size={18} />
      </button>
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img src={shot.src} alt={shot.alt} />
        <figcaption>{shot.alt}</figcaption>
      </figure>
    </div>,
    document.body
  );
}

function ProjectMedia({ p, media, onOpen, activeReel }) {
  if (media.kind === 'phones') {
    const alt = p.shots || [];
    const reel = media.reels[activeReel];
    const reelName = (p.reels || [])[activeReel] || '';
    return (
      <div className="project-media phone-stack">
        <button
          type="button"
          className="phone phone-shot"
          onClick={() => onOpen({ src: media.shots[0], alt: alt[0] || p.title })}
          aria-label={alt[0] || p.title}
        >
          <img src={media.shots[0]} alt="" loading="lazy" />
        </button>
        <div className="phone phone-reel">
          {/* key remounts the element so a new src actually loads */}
          <video
            key={activeReel}
            src={reel.src}
            poster={reel.poster}
            controls
            preload="none"
            playsInline
            aria-label={`${p.reelAlt || p.title} — ${reelName}`}
          />
        </div>
        <button
          type="button"
          className="phone phone-shot"
          onClick={() => onOpen({ src: media.shots[1], alt: alt[1] || p.title })}
          aria-label={alt[1] || p.title}
        >
          <img src={media.shots[1]} alt="" loading="lazy" />
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="project-media project-media-btn"
      onClick={() => onOpen({ src: media.src, alt: p.title })}
      aria-label={p.title}
    >
      <img src={media.src} alt="" loading="lazy" />
    </button>
  );
}

function ReelStrip({ p, media, active, onPick, label }) {
  return (
    <div className="reel-strip">
      <span className="reel-strip-label">{label}</span>
      <div className="reel-strip-items">
        {p.reels.map((name, idx) => (
          <button
            key={name}
            type="button"
            className={'reel-thumb' + (idx === active ? ' is-active' : '')}
            onClick={() => onPick(idx)}
            aria-pressed={idx === active}
          >
            <img src={media.reels[idx].poster} alt="" loading="lazy" />
            <span className="reel-thumb-name">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p, i, inView, t, onOpen }) {
  const [ref, onMouseMove] = useMouseTrack();
  const [activeReel, setActiveReel] = useState(0);
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
      <ProjectMedia p={p} media={media} onOpen={onOpen} activeReel={activeReel} />
      <div className="project-body">
        <div className="project-title">{p.title}</div>
        <div className="project-desc">{p.desc}</div>
        <div className="project-meta">
          {p.chips.map((c) => <span key={c} className="project-chip">{c}</span>)}
        </div>
        {media.kind === 'phones' && p.reels && (
          <ReelStrip
            p={p}
            media={media}
            active={activeReel}
            onPick={setActiveReel}
            label={t.projectsSec.reelStrip}
          />
        )}
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
  const [shot, setShot] = useState(null);
  const close = useCallback(() => setShot(null), []);

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
          {sec.items.map((p, i) => (
            <ProjectCard key={p.key} p={p} i={i} inView={inView} t={t} onOpen={setShot} />
          ))}
        </div>
      </div>

      {shot && <Lightbox shot={shot} onClose={close} closeLabel={sec.closeImage} />}
    </section>
  );
}
