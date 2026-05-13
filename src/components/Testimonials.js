import React, { useRef, useEffect } from 'react';
import Icon from './Icon';
import { useInView } from '../hooks';

const SPEED = 8; // degrees per second

function getRadius() {
  if (window.innerWidth < 600) return 260;
  if (window.innerWidth < 900) return 360;
  return 520;
}

export default function Testimonials({ t }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const sec = t.testiSec;
  const items = sec.items;
  const N = items.length;
  const ANGLE_STEP = 360 / N;

  const stageRef = useRef(null);
  const rotRef = useRef(0);
  const pausedRef = useRef(false);
  const lastTsRef = useRef(null);
  const rafRef = useRef(null);
  const radiusRef = useRef(getRadius());

  useEffect(() => {
    const onResize = () => { radiusRef.current = getRadius(); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const tick = (ts) => {
      if (!pausedRef.current) {
        if (lastTsRef.current !== null) {
          rotRef.current += SPEED * (ts - lastTsRef.current) / 1000;
        }
        lastTsRef.current = ts;
      } else {
        lastTsRef.current = null;
      }
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateY(${-rotRef.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section id="voices" ref={sectionRef}>
      <div className="container">
        <div className={'section-head reveal' + (inView ? ' in-view' : '')}>
          <span className="eyebrow"><span className="dot" /> {sec.eyebrow}</span>
          <h2 className="section-title">
            {sec.title}<span className="grad-text-accent">{sec.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{sec.sub}</p>
        </div>

        <div
          className="testi-scene"
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <div className="testi-stage" ref={stageRef}>
            {items.map((it, i) => (
              <div
                key={i}
                className="testi"
                style={{
                  transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${radiusRef.current}px)`,
                }}
              >
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
      </div>
    </section>
  );
}
