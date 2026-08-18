import React from 'react';

/* Inline SVG icon set — no runtime icon-lib dependency. */
const PATHS = {
  'arrow-right':    (s) => <svg {...s}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>,
  'arrow-up-right': (s) => <svg {...s}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>,
  'download':       (s) => <svg {...s}><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>,
  'mail':           (s) => <svg {...s}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  'phone':          (s) => <svg {...s}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>,
  'pin':            (s) => <svg {...s}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  'star':           (s) => <svg width={s.width} height={s.height} viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.3 5.8 21l1.7-7-5.5-4.7 7.2-.6L12 2l2.8 6.7 7.2.6-5.5 4.7 1.7 7Z"/></svg>,
  'check':          (s) => <svg {...s}><path d="m5 12 5 5L20 7"/></svg>,
  'x':              (s) => <svg {...s}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  'code':           (s) => <svg {...s}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  'react':          (s) => <svg {...s}><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>,
  'js':             (s) => <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 10v6a2 2 0 1 1-4 0"/><path d="M19 10s-1-1-3-1c-1.5 0-3 .7-3 2 0 2.5 5 2 5 4.5 0 1.3-1.4 2-3 2-2 0-3-1-3-1"/></svg>,
  'database':       (s) => <svg {...s}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/></svg>,
  'server':         (s) => <svg {...s}><rect x="2" y="3" width="20" height="7" rx="1"/><rect x="2" y="14" width="20" height="7" rx="1"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/></svg>,
  'box':            (s) => <svg {...s}><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.3 7 12 12 20.7 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>,
  'palette':        (s) => <svg {...s}><circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.8 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.5-1-.3-.3-.5-.6-.5-1 0-.8.7-1.5 1.5-1.5h2c2.5 0 4.5-2 4.5-4.5C20.5 6.5 16.7 2 12 2Z"/></svg>,
  'git':            (s) => <svg {...s}><circle cx="12" cy="12" r="9"/><path d="M12 8v8M9 12h6"/><path d="m15 9 3 3-3 3"/></svg>,
  'layers':         (s) => <svg {...s}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  'sparkles':       (s) => <svg {...s}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
  'rocket':         (s) => <svg {...s}><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9-.7-.7-2.1-.8-2.9-.1Z"/><path d="M12 15 9 12c0-3 2-5 4-7 2 0 4 1 5 2 1 1 2 3 2 5-2 2-4 4-7 4Z"/><path d="M9 12H4s.5-3 2-4 5-1 5-1"/><path d="M12 15v5s3-.5 4-2 1-5 1-5"/></svg>,
  'shield':         (s) => <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>,
  'zap':            (s) => <svg {...s}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>,
  'github':         (s) => <svg width={s.width} height={s.height} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.6 18.4.5 12 .5Z"/></svg>,
  'linkedin':       (s) => <svg width={s.width} height={s.height} viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5v-9h3v9Zm-1.5-10.3a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-4.7c0-1.1-.4-1.9-1.4-1.9a1.5 1.5 0 0 0-1.4 1 2 2 0 0 0-.1.7V19h-3v-9h3v1.3a3 3 0 0 1 2.7-1.5c2 0 3.4 1.3 3.4 4.1V19Z"/></svg>,
};

export default function Icon({ name, size = 18, stroke = 1.7, className }) {
  const fn = PATHS[name];
  if (!fn) return null;
  return fn({
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
  });
}
