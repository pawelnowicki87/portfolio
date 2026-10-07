import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { Reveal, useParallax } from './Motion';
import giftOne from '../image/vfg-prezenty.webp';
import giftTwo from '../image/vfg-wydarzenie.webp';
import poster1 from '../image/vfg-reel-01-poster.webp';
import poster2 from '../image/vfg-reel-02-poster.webp';
import poster3 from '../image/vfg-reel-03-poster.webp';
import poster4 from '../image/vfg-reel-04-poster.webp';
import poster5 from '../image/vfg-reel-05-poster.webp';

const posters = [poster1, poster2, poster3, poster4, poster5];
const media = {
  voteforgift: [giftOne, giftTwo],
  smileexpress: ['/art/smileexpress.webp'],
  balconsonne: ['/art/solar.webp'],
  hematobieg: ['/art/hematobieg.webp'],
  phonecatalog: ['/art/catalog.webp'],
  welcometothemet: ['/art/museum.webp'],
};
const links = {
  voteforgift: 'https://voteforgift.pl/',
  smileexpress: 'https://smileexpress.com/',
  balconsonne: 'https://balkonsonne.app/?lang=en',
  hematobieg: 'https://hematobieg.org/',
  phonecatalog: 'https://pawelnowicki87.github.io/react_phone-catalog/',
  welcometothemet: 'https://pawelnowicki87.github.io/welcome_to_the_met/',
};

function ProjectCard({ project: p, index, c, onOpen }) {
  const ref = useParallax();
  const featured = p.key === 'voteforgift';
  return <Reveal as="article" className={'work-card work-' + p.key + (featured ? ' work-featured' : '')} delay={(index % 2) * 90}>
    <button ref={ref} type="button" className="work-visual" onClick={() => onOpen(p)} aria-label={c.details + ': ' + p.title}>
      <div className="visual-label"><span>{featured ? c.featured : c.categories[p.key]}</span><span>/ 0{index + 1}</span></div>
      {featured ? <div className="gift-stage"><div className="gift-wordmark">Vote<span>For</span>Gift<span className="gift-dot">.</span></div><div className="gift-ring"/><div className="gift-device device-one"><img src={giftOne} alt="" loading="lazy" width="390" height="844"/></div><div className="gift-device device-two"><img src={giftTwo} alt="" loading="lazy" width="390" height="844"/></div><span className="gift-sticker">ONE GIFT.<br/>MANY SMILES.<Icon name="sparkles" size={25}/></span></div> : <div className="browser-preview"><div className="browser-top"><i/><i/><i/><span>{new URL(links[p.key]).hostname}</span></div><img src={media[p.key][0]} alt="" loading="lazy" width="1400" height="900"/></div>}
      <span className="view-bubble"><Icon name="arrow-up-right" size={26}/></span>
    </button>
    <div className="work-caption"><div><p className="eyebrow">{c.categories[p.key]}</p><h3>{p.title}</h3><p>{c.summaries[p.key]}</p></div><button type="button" className="text-link" onClick={() => onOpen(p)} aria-label={c.details + ': ' + p.title}>{c.details}<Icon name="arrow-up-right"/></button></div>
    <div className="work-technologies">{p.chips.slice(0, 4).map(chip => <span key={chip}>{chip}</span>)}</div>
  </Reveal>;
}

function ProjectDialog({ project: p, c, onClose }) {
  const ref = useRef(null);
  const [preview, setPreview] = useState(null);
  const [reel, setReel] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      el.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={ref} className={'project-dialog' + (preview !== null ? ' preview-open' : '')} aria-labelledby="project-dialog-title" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="project-dialog-content">
      <div className="dialog-toolbar"><span className="eyebrow">{c.categories[p.key]}</span><button className="icon-button" type="button" onClick={onClose} aria-label={c.close} autoFocus><Icon name="x" size={22}/></button></div>
      <h2 id="project-dialog-title">{p.title}</h2>
      {preview !== null ? <div className="full-preview"><button type="button" className="text-link" onClick={() => setPreview(null)}>{c.back}<Icon name="arrow-right"/></button><img src={media[p.key][preview]} alt={p.shots?.[preview] || p.title}/></div> : <>
        <p className="dialog-summary">{c.summaries[p.key]}</p>
        <div className="dialog-details"><div><h3>{c.solution}</h3><p>{p.desc}</p></div><div><h3>{c.stack}</h3><div className="dialog-chips">{p.chips.map(chip => <span key={chip}>{chip}</span>)}</div><a className="button" href={links[p.key]} target="_blank" rel="noreferrer">{c.live}<Icon name="arrow-up-right"/></a></div></div>
        <h3>{c.previews}</h3><div className={'dialog-screens' + (p.key === 'voteforgift' ? ' phone-screens' : '')}>{media[p.key].map((src, i) => <button type="button" key={src} onClick={() => setPreview(i)} aria-label={c.preview + ': ' + (p.shots?.[i] || p.title)}><img src={src} alt={p.shots?.[i] || p.title} loading="lazy"/></button>)}</div>
        {p.reels && <div className="campaign"><h3>{c.campaign}</h3><div className="campaign-layout"><video key={reel} src={'/media/vfg-reel-0' + (reel + 1) + '.mp4'} poster={posters[reel]} controls playsInline preload="none" aria-label={p.reelAlt + ' — ' + p.reels[reel]}/><div className="reel-options">{p.reels.map((name, i) => <button type="button" key={name} aria-pressed={reel === i} onClick={() => setReel(i)}><img src={posters[i]} alt="" loading="lazy"/><span>0{i + 1} / {name}</span><Icon name="arrow-right"/></button>)}</div></div></div>}
      </>}
    </div>
  </dialog>;
}

export default function Projects({ t, c }) {
  const [selectedKey, setSelectedKey] = useState(null);
  const selected = t.projectsSec.items.find(p => p.key === selectedKey);
  return <section id="work" className="work-section section-wrap section-space">
    <Reveal className="section-heading"><div><p className="eyebrow">{c.workLabel}</p><h2 className="section-title">{c.workTitle}<br/><span>{c.workAccent}</span></h2></div><p>{c.workIntro}</p></Reveal>
    <div className="work-grid">{t.projectsSec.items.map((p, i) => <ProjectCard key={p.key} project={p} index={i} c={c} onOpen={p => setSelectedKey(p.key)}/>)}</div>
    {selected && <ProjectDialog key={selected.key} project={selected} c={c} onClose={() => setSelectedKey(null)}/>}
  </section>;
}
