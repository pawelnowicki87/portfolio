import React, { useRef } from 'react';
import Icon from './Icon';
import HeroScene from './HeroScene';
import CountUp from './CountUp';
import { useTypewriter, scrollToId } from '../hooks';

export default function Hero({ t, language, enable3D = true }) {
  const canvasRef = useRef(null);
  const role = useTypewriter(t.hero.roles);
  const cvFile = (process.env.PUBLIC_URL || '') + (language === 'pl' ? '/cv_pl.pdf' : '/cv_en.pdf');
  const titleWords = t.hero.title;

  return (
    <section id="top" className="hero">
      <div className="hero-canvas" ref={canvasRef} />
      <HeroScene containerRef={canvasRef} enabled={enable3D} />

      <div className="hero-inner">
        <div className="hero-status">
          <span className="dot" />
          {t.hero.status}
        </div>

        <h1 className="hero-title">
          {titleWords.map((w, i) => (
            <span className="line" key={i}>
              <span className={'word delay-' + (i + 1) + (i === 1 ? ' grad-text' : i === 2 ? ' grad-text-accent' : '')}>
                {w}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-roles">
          <span>&gt;</span>
          <span className="accent">{role}</span>
          <span className="cursor" />
        </div>

        <p className="hero-desc">{t.hero.desc('Paweł Nowicki')}</p>

        <div className="hero-cta">
          <button className="btn btn-primary" onClick={() => scrollToId('work')}>
            {t.hero.viewWork} <Icon name="arrow-right" size={14} />
          </button>
          <a className="btn btn-ghost" href={cvFile} download>
            <Icon name="download" size={14} /> {t.hero.downloadCv}
          </a>
        </div>

        <div className="hero-stats reveal in-view">
          {t.hero.stats.map((s, i) => (
            <div className="hero-stat" key={i}>
              <div className="hero-stat-num">
                <CountUp to={s.num} />
                <span className="unit">{s.unit}</span>
              </div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-hint">
        <div className="mouse" />
        <span>{t.hero.scroll}</span>
      </div>
    </section>
  );
}
