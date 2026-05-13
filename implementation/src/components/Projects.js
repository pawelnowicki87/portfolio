import React, { useRef } from 'react';
import Icon from './Icon';
import { useInView, useMouseTrack } from '../hooks';

import hematobieg    from '../image/Hematobieg.png';
import phonecatalog  from '../image/phonecatalog.png';
import welcome       from '../image/welcometothemet.png';
import todo          from '../image/todo.png';
import listofposts   from '../image/listofposts.jpg';
import game          from '../image/game.png';

const IMAGES = [hematobieg, phonecatalog, welcome, todo, listofposts, game];

const LINKS = [
  { demo: 'https://hematobieg.org/',                                          github: 'https://github.com/pawelnowicki87/hematobieg' },
  { demo: 'https://pawelnowicki87.github.io/react_phone-catalog/',            github: 'https://github.com/pawelnowicki87/phone_catalog_react' },
  { demo: 'https://pawelnowicki87.github.io/welcome_to_the_met/',             github: 'https://github.com/pawelnowicki87/welcome_to_the_met' },
  { demo: 'https://pawelnowicki87.github.io/todo_app_with_api_react/',        github: 'https://github.com/pawelnowicki87/todo_app_with_api_react' },
  { demo: 'https://pawelnowicki87.github.io/list_of_posts_react_redux/',      github: 'https://github.com/pawelnowicki87/list_of_posts_react_redux' },
  { demo: 'https://pawelnowicki87.github.io/2048_game/',                      github: 'https://github.com/pawelnowicki87/2048_game' },
];

function ProjectCard({ p, i, inView, t }) {
  const [ref, onMouseMove] = useMouseTrack();
  const cls = p.layout === 'feature' ? 'project feature' :
              p.layout === 'third'   ? 'project compact' : 'project';
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cls + ' reveal delay-' + ((i % 4) + 1) + (inView ? ' in-view' : '')}
    >
      <div className="project-tag"><span className="dot" />{p.tag}</div>
      <div className="project-num">/ 0{i + 1}</div>
      <div className="project-glow" />
      <div className="project-media">
        <img src={IMAGES[i]} alt={p.title} loading="lazy" />
      </div>
      <div className="project-body">
        <div className="project-title">{p.title}</div>
        <div className="project-desc">{p.desc}</div>
        <div className="project-meta">
          {p.chips.map((c) => <span key={c} className="project-chip">{c}</span>)}
        </div>
        <div className="project-actions">
          <a className="btn btn-primary" href={LINKS[i].demo} target="_blank" rel="noreferrer">
            {t.projectsSec.demo} <Icon name="arrow-up-right" size={14} />
          </a>
          <a className="btn btn-ghost" href={LINKS[i].github} target="_blank" rel="noreferrer">
            <Icon name="github" size={14} /> {t.projectsSec.source}
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
          {sec.items.map((p, i) => <ProjectCard key={p.title} p={p} i={i} inView={inView} t={t} />)}
        </div>
      </div>
    </section>
  );
}
