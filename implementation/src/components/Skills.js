import React, { useRef } from 'react';
import Icon from './Icon';
import { useInView, useMouseTrack } from '../hooks';

const SKILLS = [
  { name: 'React',        cat: 'Frontend', icon: 'react',    w: 92 },
  { name: 'JavaScript',   cat: 'Language', icon: 'js',       w: 95 },
  { name: 'TypeScript',   cat: 'Language', icon: 'code',     w: 80 },
  { name: 'Redux',        cat: 'State',    icon: 'layers',   w: 78 },
  { name: 'Node.js',      cat: 'Backend',  icon: 'server',   w: 82 },
  { name: 'Express',      cat: 'Backend',  icon: 'box',      w: 80 },
  { name: 'REST APIs',    cat: 'Integ.',   icon: 'database', w: 86 },
  { name: 'HTML & CSS',   cat: 'Markup',   icon: 'palette',  w: 96 },
  { name: 'Bootstrap',    cat: 'UI Kit',   icon: 'layers',   w: 88 },
  { name: 'Sass',         cat: 'Styling',  icon: 'palette',  w: 84 },
  { name: 'Git · GitHub', cat: 'Workflow', icon: 'git',      w: 90 },
  { name: 'Responsive',   cat: 'Craft',    icon: 'sparkles', w: 94 },
];

function SkillCard({ s, i, inView }) {
  const [ref, onMouseMove] = useMouseTrack();
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={'skill reveal delay-' + ((i % 6) + 1) + (inView ? ' in-view' : '')}
    >
      <div className="skill-icon"><Icon name={s.icon} size={22} /></div>
      <div className="skill-name">{s.name}</div>
      <div className="skill-cat">{s.cat}</div>
      <div className="skill-bar">
        <i style={{ '--w': s.w + '%', '--delay': (0.2 + i * 0.05) + 's' }} />
      </div>
    </div>
  );
}

export default function Skills({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const sec = t.skillsSec;
  return (
    <section id="skills" ref={ref}>
      <div className="container">
        <div className={'section-head reveal' + (inView ? ' in-view' : '')}>
          <span className="eyebrow"><span className="dot" /> {sec.eyebrow}</span>
          <h2 className="section-title">
            {sec.title}<span className="grad-text-accent">{sec.titleAccent}</span>
          </h2>
          <p className="section-subtitle">{sec.sub}</p>
        </div>

        <div className="skills-grid">
          {SKILLS.map((s, i) => <SkillCard key={s.name} s={s} i={i} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}
