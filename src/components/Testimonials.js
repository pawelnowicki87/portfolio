import React, { useRef, useEffect, useState } from 'react';
import Icon from './Icon';
import { useInView } from '../hooks';

const SPEED = 8; // degrees per second
const MOBILE_INTERVAL = 3500; // ms

function getRadius() {
  if (window.innerWidth < 640) return 0;   // mobile: flat slider
  if (window.innerWidth < 900) return 360;
  return 520;
}

function isMobile() {
  return window.innerWidth < 640;
}

export default function Testimonials({ t }) {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
  const sec = t.testiSec;
  const items = sec.items;
  const N = items.length;
  const ANGLE_STEP = 360 / N;

  // 3D carousel refs
  const stageRef = useRef(null);
  const rotRef = useRef(0);
  const pausedRef = useRef(false);
  const lastTsRef = useRef(null);
  const rafRef = useRef(null);
  const radiusRef = useRef(getRadius());

  // Mobile slider state
  const [mobile, setMobile] = useState(isMobile);
  const [activeIdx, setActiveIdx] = useState(0);

  // Detect resize
  useEffect(() => {
    const onResize = () => {
      radiusRef.current = getRadius();
      setMobile(isMobile());
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Mobile auto-advance
  useEffect(() => {
    if (!mobile) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % N);
    }, MOBILE_INTERVAL);
    return () => clearInterval(id);
  }, [mobile, N]);

  // Desktop 3D RAF
  useEffect(() => {
    if (mobile) return;
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
  }, [mobile]);

  const Card = ({ it }) => (
    <div className="testi-card-inner">
      <div className="testi-quote-mark">"</div>
      <div className="testi-stars">
        {[0, 1, 2, 3, 4].map((s) => <Icon key={s} name="star" size={13} />)}
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
  );

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

        {mobile ? (
          /* ── MOBILE: flat slider ── */
          <div className="testi-slider">
            <div className="testi-slide">
              <Card it={items[activeIdx]} />
            </div>
            <div className="testi-dots">
              {items.map((_, i) => (
                <button
                  key={i}
                  className={'testi-dot' + (i === activeIdx ? ' active' : '')}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Opinia ${i + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* ── DESKTOP: 3D carousel ── */
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
                  <Card it={it} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
