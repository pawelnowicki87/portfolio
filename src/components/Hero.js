import React, { useContext, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import StudioGlyph from './StudioGlyph';
import { MotionContext, useParallax } from './Motion';

function KineticWord({ word, offset = 0 }) {
  return <span className="kinetic-word" aria-hidden="true">{Array.from(word).map((letter, i) => <span className="kinetic-letter" style={{ '--letter-delay': (offset + i * 35) + 'ms' }} key={i}>{letter === ' ' ? '\u00a0' : letter}</span>)}</span>;
}

export default function Hero({ c }) {
  const ref = useParallax();
  const mount = useRef(null);
  const sculpture = useRef(null);
  const energyRef = useRef(false);
  const motion = useContext(MotionContext);
  const [energy, setEnergy] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    energyRef.current = energy;
    sculpture.current?.setEnergy(energy);
  }, [energy]);
  useEffect(() => {
    setReady(false);
    if (!motion) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      import('../lib/createSculpture').then(({ createSculpture }) => {
        if (cancelled || !mount.current) return;
        sculpture.current = createSculpture(mount.current, {
          onReady: () => { if (!cancelled) setReady(true); },
          onUnavailable: () => { if (!cancelled) setReady(false); },
        });
        sculpture.current?.setEnergy(energyRef.current);
      }).catch(() => { if (!cancelled) setReady(false); });
    }, 180);
    return () => { cancelled = true; clearTimeout(timer); sculpture.current?.destroy(); sculpture.current = null; };
  }, [motion]);
  return <>
    <section className={'hero hero-immersive section-wrap' + (ready ? ' scene-ready' : '') + (energy ? ' energy-hot' : '')} id="top" ref={ref}>
      <div className="hero-aurora" aria-hidden="true"/><div className="hero-fine-grid" aria-hidden="true"/>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="availability"><span className="status-dot"/>{c.available}</div>
          <p className="eyebrow hero-role">{c.role}</p>
          <h1 key={c.hero.join('')} aria-label={c.hero.join(' ')}><span className="hero-opening"><KineticWord word={c.hero[0]}/></span><span><KineticWord word={c.hero[1]} offset={170}/></span><span className="hero-accent"><KineticWord word={c.hero[2]} offset={300}/><span className="title-star" aria-hidden="true"><StudioGlyph/></span></span></h1>
          <p className="hero-intro">{c.intro}</p>
          <div className="hero-actions"><a className="button" href="#work">{c.viewWork}<Icon name="arrow-up-right"/></a><a className="text-link" href="/CV_Pawel_Nowicki.pdf" download>{c.cv}<Icon name="download" size={16}/></a></div>
        </div>
        <div className="hero-art">
          <div className="hero-art-image" aria-hidden="true"><img src="/art/chrome-knot-1536.webp" srcSet="/art/chrome-knot-768.webp 768w, /art/chrome-knot-1536.webp 1536w" sizes="(max-width: 760px) 100vw, 65vw" width="1536" height="1024" alt="" fetchPriority="high"/></div>
          <div ref={mount} className="sculpture-canvas" role="group" aria-label={c.sceneInput} tabIndex={ready ? 0 : -1} aria-hidden={!ready}/>
          <div className="orbital-track orbit-one" aria-hidden="true"/><div className="orbital-track orbit-two" aria-hidden="true"/>
          <div className="art-cross cross-one" aria-hidden="true">+</div><div className="art-cross cross-two" aria-hidden="true">+</div>
          <div className="art-coordinate" aria-hidden="true"><span>EXPERIMENT — 001</span><span>{ready ? 'LIVE / WEBGL' : 'FORM / FUNCTION'}</span></div>
          <div className="scene-annotation" aria-hidden="true"><span className="annotation-line"/><span>{energy ? 'CHROMATIC / AMBER' : 'LIQUID / COBALT'}<small>DESIGN MEETS ENGINEERING</small></span></div>
          <div className="energy-controls"><button type="button" className="energy-button" aria-pressed={energy} onClick={() => setEnergy(!energy)}><span className="energy-dot"/>{energy ? c.energyActive : c.energyButton}<Icon name="zap" size={15}/></button><span>{ready ? c.sceneHint : c.artCaption}</span></div>
          <div className="orbit-label" aria-hidden="true">IDEA → DESIGN → CODE → IMPACT</div>
        </div>
      </div>
      <div className="hero-bottom"><a href="#work"><span className="scroll-arrow">↓</span>{c.explore}</a><span>REACT · NEXT.JS · NODE.JS</span><span className="edition">PORTFOLIO — 2026</span></div>
    </section>
    <div className="manifesto-strip"><div className="section-wrap">{c.strip.map(item => <span key={item}><StudioGlyph/>{item}</span>)}</div></div>
  </>;
}
