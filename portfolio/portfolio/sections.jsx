// ============================================================
// Shared atoms
// ============================================================
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add('in'), delay);
        io.disconnect();
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

const SectionLabel = ({ index, children }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-[11px] tracking-widest text-fog-50">{index}</span>
    <span className="h-px w-8 bg-white/10" />
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog-100">{children}</span>
  </div>
);

const Counter = ({ to, suffix = "", duration = 1400 }) => {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
};

// tiny inline icons (stroke based)
const I = {
  arrow:  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ext:    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5"><path d="M5 11l6-6M7 5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  github: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.24 2.75.12 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>,
  link:   <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5"><path d="M6.5 9.5l3-3M7 4l1.5-1.5a2.5 2.5 0 1 1 3.5 3.5L10.5 7.5M9.5 12L8 13.5a2.5 2.5 0 1 1-3.5-3.5L6 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  spark:  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5"><path d="M8 1.5l1.4 4.3 4.3 1.4-4.3 1.4L8 12.9 6.6 8.6 2.3 7.2l4.3-1.4L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
  dot:    <span className="w-1 h-1 rounded-full bg-current inline-block" />,
};

// ============================================================
// NAV
// ============================================================
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 8);
    onS();
    window.addEventListener('scroll', onS);
    return () => window.removeEventListener('scroll', onS);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors ${scrolled ? 'backdrop-blur-md bg-ink-0/70 border-b border-white/5' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-violet to-mint/70 grid place-items-center text-ink-0 text-[11px] font-bold shadow-glow-violet">N</span>
          <span className="font-medium tracking-tight">nowicki<span className="text-fog-50">.dev</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-fog-100">
          <a href="#work" className="link-u hover:text-white">Work</a>
          <a href="#stack" className="link-u hover:text-white">Stack</a>
          <a href="#experience" className="link-u hover:text-white">Experience</a>
          <a href="#stats" className="link-u hover:text-white">Metrics</a>
          <a href="#contact" className="link-u hover:text-white">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 chip">
            <span className="w-1.5 h-1.5 rounded-full bg-mint pulse-dot" />
            Open to Staff roles
          </span>
          <a href="#contact" className="btn-shimmer text-sm bg-white text-ink-0 px-3.5 py-1.5 rounded-full font-medium hover:bg-fog-200 transition">
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden noise">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="aurora" />
      <Hero3D />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-[100svh] flex flex-col justify-center">
        <Reveal>
          <div className="flex items-center gap-2 chip mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-mint pulse-dot" />
            <span>Available · Q3 2026</span>
            <span className="text-fog-50">·</span>
            <span>Remote / EU+UK</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="text-[clamp(2.6rem,7.2vw,6.4rem)] leading-[0.95] tracking-[-0.035em] font-semibold">
            <span className="grad-text">Senior full-stack</span><br/>
            <span className="grad-violet">engineer</span><span className="text-fog-50">,</span>{" "}
            <span className="grad-text">building </span>
            <span className="italic font-light text-fog-200">resilient</span>{" "}
            <span className="grad-text">systems.</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-7 max-w-xl text-fog-100 text-lg leading-relaxed">
            I'm <span className="text-white">Marek Nowicki</span> — twelve years shipping
            type-safe products, real-time infra, and design systems for teams from seed-stage to
            public companies. Currently focused on edge runtimes and developer platforms.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-shimmer inline-flex items-center gap-2 bg-white text-ink-0 px-4 py-2.5 rounded-full text-sm font-medium hover:bg-fog-200 transition">
              View selected work {I.arrow}
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border border-white/10 hover:border-white/20 hover:bg-white/5 transition">
              Book a call
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-fog-100 hover:text-white transition">
              {I.github} GitHub
            </a>
          </div>
        </Reveal>

        {/* Hero stats strip */}
        <Reveal delay={360}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden card max-w-3xl">
            {[
              { k: 'Years shipping', v: <Counter to={12} suffix="+" /> },
              { k: 'Production deploys', v: <Counter to={4280} suffix="" /> },
              { k: 'p95 latency, last role', v: '38ms' },
              { k: 'Uptime, 2025', v: '99.992%' },
            ].map((s) => (
              <div key={s.k} className="bg-ink-50 p-5">
                <div className="text-2xl font-medium tracking-tight">{s.v}</div>
                <div className="mt-1 text-[11px] font-mono uppercase tracking-widest text-fog-50">{s.k}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-fog-50 text-[10px] font-mono uppercase tracking-widest">
          <span>scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-fog-50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STACK MARQUEE
// ============================================================
const STACK = [
  { name: 'TypeScript', tag: 'lang' },
  { name: 'React', tag: 'ui' },
  { name: 'Next.js', tag: 'framework' },
  { name: 'Remix', tag: 'framework' },
  { name: 'Node.js', tag: 'runtime' },
  { name: 'Bun', tag: 'runtime' },
  { name: 'Deno', tag: 'runtime' },
  { name: 'Go', tag: 'lang' },
  { name: 'Rust', tag: 'lang' },
  { name: 'Postgres', tag: 'data' },
  { name: 'Redis', tag: 'data' },
  { name: 'ClickHouse', tag: 'data' },
  { name: 'Kafka', tag: 'infra' },
  { name: 'gRPC', tag: 'infra' },
  { name: 'tRPC', tag: 'infra' },
  { name: 'GraphQL', tag: 'infra' },
  { name: 'Kubernetes', tag: 'platform' },
  { name: 'Terraform', tag: 'platform' },
  { name: 'AWS', tag: 'cloud' },
  { name: 'GCP', tag: 'cloud' },
  { name: 'Cloudflare', tag: 'cloud' },
  { name: 'Fly.io', tag: 'cloud' },
  { name: 'Tailwind', tag: 'ui' },
  { name: 'Framer Motion', tag: 'ui' },
  { name: 'Three.js', tag: 'ui' },
  { name: 'WebGL', tag: 'ui' },
  { name: 'Prisma', tag: 'data' },
  { name: 'Drizzle', tag: 'data' },
  { name: 'Playwright', tag: 'test' },
  { name: 'Vitest', tag: 'test' },
  { name: 'OpenTelemetry', tag: 'obs' },
  { name: 'Datadog', tag: 'obs' },
];

function StackMarquee() {
  const row1 = [...STACK, ...STACK];
  const row2 = [...STACK.slice().reverse(), ...STACK.slice().reverse()];
  const Pill = ({ s }) => (
    <div className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-violet/40 hover:bg-violet/5 transition-colors whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-fog-50 group-hover:bg-violet transition-colors" />
      <span className="text-sm font-medium tracking-tight">{s.name}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-fog-50">{s.tag}</span>
    </div>
  );
  return (
    <section id="stack" className="relative py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionLabel index="01 / stack">Tooling</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-4xl md:text-5xl tracking-[-0.03em] font-semibold max-w-2xl">
              <span className="grad-text">The instruments I reach for</span>
              <span className="text-fog-50"> — chosen for fit, not fashion.</span>
            </h2>
            <p className="text-fog-100 max-w-md">
              I keep a deliberately narrow toolbox. Each item below has carried production traffic
              under my watch — usually for years, sometimes for a weekend prototype that survived.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="marquee-fade space-y-4">
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-3 w-max">
            {row1.map((s, i) => <Pill key={`a-${i}`} s={s} />)}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track reverse flex gap-3 w-max">
            {row2.map((s, i) => <Pill key={`b-${i}`} s={s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FEATURED PROJECTS
// ============================================================
const PROJECTS = [
  {
    name: 'Orbital',
    role: 'Lead engineer · 2024 – present',
    blurb: 'Realtime collaboration runtime — CRDT engine and edge presence layer powering 6 design tools.',
    metric: [{ k: 'p50 sync', v: '11ms' }, { k: 'active sessions', v: '210k' }, { k: 'CRDT throughput', v: '1.4M ops/s' }],
    tags: ['Rust', 'WebSockets', 'CRDT', 'Cloudflare DO'],
    accent: 'violet',
    big: true,
  },
  {
    name: 'Beacon',
    role: 'Tech lead · 2023',
    blurb: 'Observability stack for serverless. Sub-second flame graphs across 12 runtimes.',
    metric: [{ k: 'cold start', v: '38ms' }, { k: 'orgs', v: '4.1k' }],
    tags: ['Go', 'ClickHouse', 'OpenTelemetry'],
    accent: 'mint',
  },
  {
    name: 'Atlas UI',
    role: 'OSS · 2022 – present',
    blurb: 'Headless component primitives. 38k stars; the foundation for our internal design system.',
    metric: [{ k: 'stars', v: '38.2k' }, { k: 'weekly dl', v: '420k' }],
    tags: ['TypeScript', 'React', 'a11y'],
    accent: 'amber',
  },
  {
    name: 'Ledger Sync',
    role: 'IC · 2022',
    blurb: 'Double-entry sync engine for fintech back-offices. Reduced reconciliation MTTR by 92%.',
    metric: [{ k: 'txns / day', v: '8.6M' }, { k: 'MTTR', v: '−92%' }],
    tags: ['Postgres', 'Kafka', 'Node'],
    accent: 'violet',
  },
];

function Projects() {
  return (
    <section id="work" className="relative py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionLabel index="02 / work">Selected projects</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <h2 className="text-4xl md:text-5xl tracking-[-0.03em] font-semibold max-w-2xl grad-text">
              Four cuts from the last four years.
            </h2>
            <a href="#" className="text-sm text-fog-100 hover:text-white inline-flex items-center gap-2 link-u">
              See the full archive {I.arrow}
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className={p.big ? 'col-span-12' : 'col-span-12 md:col-span-6 lg:col-span-4'}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }) {
  const accent = { violet:'#a78bfa', mint:'#5eead4', amber:'#fbbf24' }[p.accent];
  return (
    <a href="#" className="group relative block card card-strong p-7 md:p-8 overflow-hidden hover:border-white/15 transition-colors">
      {/* hover glow */}
      <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity"
           style={{ background: `radial-gradient(600px 200px at var(--mx,50%) 0%, ${accent}22, transparent 60%)` }} />
      {/* corner brackets */}
      <span className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest text-fog-50">
        case · 0{PROJECTS.indexOf(p)+1}
      </span>

      <div className={`grid ${p.big ? 'md:grid-cols-12 gap-8' : 'grid-cols-1 gap-5'}`}>
        <div className={p.big ? 'md:col-span-5' : ''}>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 16px ${accent}` }} />
            <span className="font-mono text-[11px] uppercase tracking-widest text-fog-50">{p.role}</span>
          </div>
          <h3 className={`tracking-[-0.02em] font-semibold ${p.big ? 'text-5xl md:text-6xl' : 'text-2xl'}`}>
            {p.name}
          </h3>
          <p className={`mt-3 text-fog-100 leading-relaxed ${p.big ? 'text-lg max-w-md' : 'text-sm'}`}>
            {p.blurb}
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/90">
            <span>Open case study</span>
            <span className="transition-transform group-hover:translate-x-1">{I.arrow}</span>
          </div>
        </div>

        {/* metrics / preview */}
        <div className={p.big ? 'md:col-span-7' : ''}>
          <div className={`relative rounded-xl border border-white/[0.06] bg-ink-100 ${p.big ? 'p-6 md:p-8' : 'p-5'} overflow-hidden`}>
            <DashboardPreview p={p} accent={accent} />
          </div>
        </div>
      </div>
    </a>
  );
}

// Mini animated dashboard inside each project card
function DashboardPreview({ p, accent }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1400);
    return () => clearInterval(id);
  }, []);

  // generate a sparkline path
  const pts = React.useMemo(() => {
    const n = 40; const arr = [];
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 100;
      const noise = Math.sin(i * 0.5 + tick * 0.3) * 6 + Math.sin(i * 0.13) * 12;
      const y = 50 - noise - (i / n) * 8;
      arr.push([x, y]);
    }
    return arr;
  }, [tick]);
  const path = `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')}`;
  const area = `${path} L 100 100 L 0 100 Z`;

  return (
    <div className="space-y-5">
      {/* header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-mint pulse-dot" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-fog-100">live · realtime</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="chip">24h</span>
          <span className="chip" style={{ borderColor: `${accent}55`, color:'#fff' }}>7d</span>
          <span className="chip">30d</span>
        </div>
      </div>

      {/* metric tiles */}
      <div className="grid grid-cols-3 gap-3">
        {p.metric.map((m) => (
          <div key={m.k} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-fog-50">{m.k}</div>
            <div className="mt-1 text-xl font-medium tracking-tight">{m.v}</div>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="relative h-32 rounded-lg border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
        {/* y-grid */}
        {[0,1,2,3].map(i => (
          <div key={i} className="absolute left-0 right-0 h-px bg-white/[0.04]" style={{ top: `${(i+1) * 25}%` }} />
        ))}
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id={`g-${p.name}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#g-${p.name})`} transform="translate(0 10)" />
          <path d={path} fill="none" stroke={accent} strokeWidth="0.8" transform="translate(0 10)" />
        </svg>
        <div className="absolute top-2 left-3 text-[10px] font-mono text-fog-50">requests / s</div>
        <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[10px] font-mono" style={{ color: accent }}>
          ▲ 12.4% wow
        </div>
      </div>

      {/* event ticker */}
      <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1.5">
        {[
          ['deploy', 'edge-08 · iad', 'ok'],
          ['migrate', '0042_add_indices', 'ok'],
          ['alert', 'sync-lag · p99', 'cleared'],
        ].map(([t, n, s], i) => (
          <div key={i} className="flex items-center justify-between font-mono text-[11px] text-fog-100">
            <span className="flex items-center gap-2">
              <span className="text-fog-50">{`0${i+1}`}</span>
              <span className="text-fog-100 w-14 uppercase tracking-widest text-[10px]">{t}</span>
              <span className="text-white/80">{n}</span>
            </span>
            <span className="text-mint flex items-center gap-1">{I.dot} {s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// EXPERIENCE TIMELINE
// ============================================================
const TIMELINE = [
  { y:'2024 — Now', co:'Vector Labs', role:'Staff Engineer, Platform', loc:'Remote · Berlin HQ',
    notes:['Owner of edge runtime + presence layer','Led RFC for v2 CRDT engine (35% lower CPU)','Hiring bar-raiser for platform IC4+'] },
  { y:'2022 — 2024', co:'Helix Financial', role:'Tech Lead, Ledger Platform', loc:'London',
    notes:['Rebuilt double-entry core; cut MTTR 92%','Migrated 8.6M txns/day to Postgres + Kafka','Mentored 6 engineers across two squads'] },
  { y:'2019 — 2022', co:'Outpost', role:'Senior Full-Stack Engineer', loc:'Warsaw',
    notes:['Shipped marketing site, dashboard, billing','Set up infra-as-code from zero (Terraform, EKS)','First engineer hired; grew team to 18'] },
  { y:'2016 — 2019', co:'Studio Foxglove', role:'Founding Engineer', loc:'Kraków',
    notes:['Agency turned product co. — 14 launches','Built component library used across 9 clients','Sold the studio to a Berlin holding in 2019'] },
];

function Timeline() {
  return (
    <section id="experience" className="relative py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionLabel index="03 / experience">Trajectory</SectionLabel>
          <h2 className="text-4xl md:text-5xl tracking-[-0.03em] font-semibold mb-14 max-w-2xl grad-text">
            A decade of compounding context.
          </h2>
        </Reveal>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 relative rail pl-10">
            {TIMELINE.map((e, i) => (
              <Reveal key={e.co} delay={i * 90}>
                <div className="relative mb-10 last:mb-0">
                  <span className="absolute -left-[39px] top-1.5 w-5 h-5 rounded-full bg-ink-100 border border-white/15 grid place-items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet" style={{ boxShadow:'0 0 12px #a78bfa' }} />
                  </span>
                  <div className="card p-6">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <div className="font-mono text-[11px] uppercase tracking-widest text-fog-50">{e.y}</div>
                        <h3 className="mt-1 text-2xl tracking-[-0.01em] font-semibold">{e.role}</h3>
                        <div className="text-fog-100 mt-1">{e.co} · <span className="text-fog-50">{e.loc}</span></div>
                      </div>
                      <span className="chip">case file</span>
                    </div>
                    <ul className="mt-5 space-y-1.5">
                      {e.notes.map(n => (
                        <li key={n} className="text-fog-100 text-sm flex gap-3">
                          <span className="text-violet shrink-0">{I.spark}</span>
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Sidebar: principles + speaking */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            <Reveal>
              <div className="card p-6">
                <SectionLabel index="•">Operating principles</SectionLabel>
                <ul className="space-y-3 text-sm">
                  {[
                    'Boring infra, interesting product.',
                    'Ship the first useful thing in week one.',
                    'Postgres until proven otherwise.',
                    'Observability before features.',
                    'Optimize for the next engineer.',
                  ].map(t => (
                    <li key={t} className="flex gap-3 text-fog-100">
                      <span className="font-mono text-fog-50 text-[11px] mt-0.5 w-5">→</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="card p-6">
                <SectionLabel index="•">Recent talks</SectionLabel>
                <ul className="space-y-3 text-sm">
                  {[
                    ['Edge CRDTs at scale', 'JSConf EU · 2025'],
                    ['Designing platform APIs', 'Render ATL · 2024'],
                    ['The ledger that ate London', 'DDD Europe · 2023'],
                  ].map(([t, w]) => (
                    <li key={t} className="flex justify-between items-baseline gap-4">
                      <span className="text-white">{t}</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-fog-50 shrink-0">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GITHUB / METRICS
// ============================================================
function GithubStats() {
  // contribution grid — deterministic pseudo random
  const cells = React.useMemo(() => {
    const out = [];
    let seed = 7;
    const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let w = 0; w < 53; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const r = rand();
        const v = r < 0.55 ? 0 : r < 0.75 ? 1 : r < 0.9 ? 2 : r < 0.97 ? 3 : 4;
        col.push(v);
      }
      out.push(col);
    }
    return out;
  }, []);

  const SHADES = ['#0e1014', '#1e1738', '#382a6b', '#6b4ed1', '#a78bfa'];

  return (
    <section id="stats" className="relative py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionLabel index="04 / metrics">Open-source & contribution</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="text-4xl md:text-5xl tracking-[-0.03em] font-semibold grad-text max-w-2xl">
              The signal beneath the commits.
            </h2>
            <span className="chip">@nowicki · pulled live every 6h</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-5">
          {/* big contribution graph card */}
          <Reveal className="col-span-12 lg:col-span-8">
            <div className="card p-6 md:p-7 h-full">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-sm text-fog-100">Contributions, last 12 months</div>
                  <div className="text-3xl tracking-tight font-medium mt-1">
                    <Counter to={3142} /> <span className="text-fog-50 text-base font-normal">commits across 84 repos</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-fog-50">
                  less
                  <span className="flex gap-1">
                    {SHADES.map((c,i) => <span key={i} className="w-3 h-3 rounded-sm" style={{ background:c }} />)}
                  </span>
                  more
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="flex gap-[3px] min-w-max">
                  {cells.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-[3px]">
                      {col.map((v, di) => (
                        <span
                          key={di}
                          className="w-[11px] h-[11px] rounded-sm transition-all hover:scale-125"
                          style={{
                            background: SHADES[v],
                            animation: 'pulseDot 4s ease-in-out infinite',
                            animationDelay: `${(ci * 7 + di) * 12}ms`,
                            animationIterationCount: 1,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-7 pt-6 border-t border-white/5">
                {[
                  ['Longest streak', '64 days'],
                  ['PRs merged', <Counter to={612} />],
                  ['Issues closed', <Counter to={1284} />],
                  ['Repos maintained', '17'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[11px] font-mono uppercase tracking-widest text-fog-50">{k}</div>
                    <div className="text-xl tracking-tight font-medium mt-1">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* language breakdown */}
          <Reveal className="col-span-12 lg:col-span-4" delay={120}>
            <div className="card p-6 md:p-7 h-full">
              <div className="text-sm text-fog-100">Languages — last 90 days</div>
              <div className="mt-4 space-y-3">
                {[
                  ['TypeScript', 52, '#a78bfa'],
                  ['Rust',       18, '#fbbf24'],
                  ['Go',         14, '#5eead4'],
                  ['Python',      9, '#7c5cff'],
                  ['Shell',       5, '#ec4899'],
                  ['Other',       2, '#475569'],
                ].map(([n, p, c]) => (
                  <div key={n}>
                    <div className="flex justify-between text-sm">
                      <span>{n}</span>
                      <span className="font-mono text-fog-50">{p}%</span>
                    </div>
                    <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${p}%`, background:c, boxShadow:`0 0 12px ${c}66` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* repo cards */}
          {[
            { name:'nowicki/atlas-ui', desc:'Headless React primitives. WAI-ARIA-first.', stars:'38.2k', forks:'1.4k', lang:'TypeScript', c:'#a78bfa' },
            { name:'nowicki/orbital-rs', desc:'CRDT engine in Rust, with edge transport.', stars:'4.8k', forks:'212', lang:'Rust', c:'#fbbf24' },
            { name:'nowicki/beacon', desc:'OpenTelemetry → ClickHouse pipeline.', stars:'2.1k', forks:'94', lang:'Go', c:'#5eead4' },
          ].map((r, i) => (
            <Reveal key={r.name} className="col-span-12 md:col-span-4" delay={i * 100}>
              <a href="#" className="card p-5 block hover:border-white/15 transition-colors h-full">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-fog-50">{I.github}</span>
                  <span className="font-mono">{r.name}</span>
                </div>
                <p className="mt-3 text-sm text-fog-100">{r.desc}</p>
                <div className="mt-4 flex items-center gap-4 text-[12px] font-mono text-fog-50">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background:r.c }} />{r.lang}</span>
                  <span>★ {r.stars}</span>
                  <span>⑂ {r.forks}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  return (
    <section id="contact" className="relative py-32 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="aurora opacity-60" />
      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionLabel index="05 / contact">Let's talk</SectionLabel>
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="text-5xl md:text-7xl tracking-[-0.035em] font-semibold leading-[0.95]">
                <span className="grad-text">Have a hard</span><br />
                <span className="grad-violet">engineering problem?</span>
              </h2>
              <p className="mt-7 text-fog-100 text-lg max-w-xl leading-relaxed">
                Currently considering Staff and Principal roles, plus a short list of advisory engagements.
                Fastest way to reach me is email — I usually reply within a working day.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="card p-6 md:p-7">
                <div className="font-mono text-[11px] uppercase tracking-widest text-fog-50">direct</div>
                <a href="mailto:m@nowicki.dev" className="mt-2 block text-2xl md:text-3xl tracking-tight font-medium hover:text-violet transition-colors">
                  m@nowicki.dev
                </a>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  {[
                    ['GitHub', '@nowicki'],
                    ['LinkedIn', '/in/nowicki'],
                    ['Read.cv', '@nowicki'],
                    ['X', '@m_nowicki'],
                  ].map(([k, v]) => (
                    <a key={k} href="#" className="group rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 hover:border-white/15 transition">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-fog-50">{k}</div>
                      <div className="text-sm mt-0.5 flex items-center justify-between">
                        <span>{v}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-fog-50">{I.ext}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <footer className="relative mt-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] font-mono text-fog-50">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-mint pulse-dot" />
            <span>system status · all green</span>
          </div>
          <div className="flex items-center gap-5">
            <span>© 2026 Marek Nowicki</span>
            <span className="hidden md:inline">built with care, not vibes</span>
            <span>v 4.2.1</span>
          </div>
        </div>
      </footer>
    </section>
  );
}

Object.assign(window, { Nav, Hero, StackMarquee, Projects, Timeline, GithubStats, Contact });
