import React, { useRef, useEffect } from 'react';
import { projectsList } from '../texts';
import hematobieg from '../image/Hematobieg.png';
import phonecatalog from '../image/phonecatalog.png';
import welcome from '../image/welcometothemet.png';
import todo from '../image/todo.png';
import listofposts from '../image/listofposts.jpg';
import game from '../image/game.png';

const images = { hematobieg, phonecatalog, welcome, todo, listofposts, game };
const ACCENTS = ['#a78bfa', '#5eead4', '#fbbf24', '#a78bfa', '#5eead4', '#fbbf24'];

const ExtIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" style={{ width: 14, height: 14 }}>
    <path d="M5 11l6-6M7 5h4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const GhIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
  </svg>
);

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add('in'), delay); io.disconnect(); }
    }, { threshold: 0.06 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal" style={{ height: '100%' }}>{children}</div>;
}

function ProjectCard({ project, index, t, language }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const title  = language === 'pl' ? project.title   : project.titleEn;
  const desc   = language === 'pl' ? project.descPl  : project.descEn;

  return (
    <div
      className="group card-strong relative flex flex-col overflow-hidden h-full"
      style={{ borderRadius: 14, transition: 'border-color 0.2s' }}
    >
      {/* hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(400px 180px at 50% 0%, ${accent}1a, transparent 65%)` }}
      />

      {/* Corner number */}
      <span
        style={{
          position: 'absolute', top: 12, right: 14, zIndex: 2,
          fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
          letterSpacing: '0.10em', color: 'var(--c-text-3)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Screenshot */}
      <div style={{ height: 210, overflow: 'hidden', position: 'relative' }}>
        <img
          src={images[project.image]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(6,7,10,0.85) 100%)',
          }}
        />
      </div>

      {/* Card body */}
      <div style={{ padding: '1.25rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Tags row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: accent, boxShadow: `0 0 14px ${accent}`, flexShrink: 0 }} />
          {project.tags.map(tag => (
            <span key={tag} className="chip" style={{ fontSize: 11 }}>{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.25rem', fontWeight: 650, letterSpacing: '-0.02em', color: 'var(--c-text-1)', marginBottom: 10 }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.97rem', lineHeight: 1.65, color: 'var(--c-text-2)', flex: 1, marginBottom: 20 }}>
          {desc}
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0.55rem 1.1rem', borderRadius: 999,
              fontSize: 13, fontWeight: 600,
              background: 'var(--c-btn-bg)', color: 'var(--c-btn-text)',
              textDecoration: 'none',
            }}
          >
            <ExtIcon /> {t.projects.demo}
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0.55rem 1.1rem', borderRadius: 999,
              fontSize: 13, fontWeight: 500,
              border: '1px solid var(--c-ghost-bdr)',
              color: 'var(--c-ghost-text)',
              textDecoration: 'none',
            }}
          >
            <GhIcon /> {t.projects.github}
          </a>
        </div>
      </div>
    </div>
  );
}

function Projects({ t, language }) {
  return (
    <section
      id="projects"
      className="relative py-28"
      style={{ borderTop: '1px solid var(--c-border-s)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span className="section-num">02 /</span>
            <span style={{ height: 1, width: 32, background: 'var(--c-sep)' }} />
            <span className="section-label">{t.projects.label}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em', fontWeight: 700, marginBottom: '3.5rem' }}>
            <span className="grad-text">{t.projects.heading}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectsList.map((project, i) => (
            <Reveal key={project.image} delay={i * 80}>
              <ProjectCard project={project} index={i} t={t} language={language} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
