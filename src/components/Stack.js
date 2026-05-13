import React, { useRef, useEffect } from 'react';

const STACK = [
  { name: 'React',        tag: 'ui' },
  { name: 'JavaScript',   tag: 'lang' },
  { name: 'TypeScript',   tag: 'lang' },
  { name: 'Node.js',      tag: 'runtime' },
  { name: 'Express',      tag: 'framework' },
  { name: 'Redux',        tag: 'state' },
  { name: 'HTML5',        tag: 'markup' },
  { name: 'CSS3',         tag: 'style' },
  { name: 'Tailwind CSS', tag: 'style' },
  { name: 'Bootstrap',    tag: 'style' },
  { name: 'REST API',     tag: 'data' },
  { name: 'Git',          tag: 'tool' },
  { name: 'GitHub',       tag: 'tool' },
  { name: 'npm',          tag: 'tool' },
  { name: 'Webpack',      tag: 'build' },
  { name: 'React Router', tag: 'nav' },
  { name: 'Sass',         tag: 'style' },
  { name: 'MySQL',        tag: 'data' },
  { name: 'MongoDB',      tag: 'data' },
  { name: 'Jest',         tag: 'test' },
  { name: 'Figma',        tag: 'design' },
];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => el.classList.add('in'), delay); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}

function Pill({ item }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '0.65rem 1.1rem', borderRadius: 12,
        background: 'var(--c-chip-bg)',
        border: '1px solid var(--c-chip-bdr)',
        whiteSpace: 'nowrap', cursor: 'default',
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#9ca0aa', flexShrink: 0 }} />
      <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--c-text-1)' }}>{item.name}</span>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-text-3)' }}>{item.tag}</span>
    </div>
  );
}

function Stack({ t }) {
  const row1 = [...STACK, ...STACK];
  const row2 = [...STACK.slice().reverse(), ...STACK.slice().reverse()];

  return (
    <section
      id="stack"
      className="relative py-28"
      style={{ borderTop: '1px solid var(--c-border-s)' }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span className="section-num">01 /</span>
            <span style={{ height: 1, width: 32, background: 'var(--c-sep)' }} />
            <span className="section-label">{t.stack.label}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.03em', fontWeight: 700, maxWidth: '30ch', lineHeight: 1.1 }}>
              <span className="grad-text">{t.stack.heading1}</span>
              <span style={{ color: 'var(--c-text-3)' }}>{t.stack.heading2}</span>
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--c-text-2)', maxWidth: '45ch', lineHeight: 1.65 }}>{t.stack.desc}</p>
          </div>
        </Reveal>
      </div>

      <div className="marquee-fade space-y-3">
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-3 w-max">
            {row1.map((s, i) => <Pill key={`a-${i}`} item={s} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track reverse flex gap-3 w-max">
            {row2.map((s, i) => <Pill key={`b-${i}`} item={s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stack;
