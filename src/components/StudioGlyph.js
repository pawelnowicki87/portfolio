import React from 'react';

// Original geometric marks drawn for this portfolio.
export default function StudioGlyph({ type = 'asterisk', className = '' }) {
  return <svg className={'studio-glyph ' + className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
    {type === 'asterisk' && <g stroke="currentColor" strokeWidth="10">{[0, 45, 90, 135].map(a => <path key={a} d="M40 7v66" transform={'rotate(' + a + ' 40 40)'} />)}</g>}
    {type === 'interface' && <g stroke="currentColor" strokeWidth="2"><rect x="9" y="12" width="62" height="53" rx="8"/><path d="M9 26h62M28 26v39"/><circle cx="17" cy="19" r="1"/><circle cx="23" cy="19" r="1"/><path d="m43 37 15 9-8 2-4 8z" fill="currentColor"/></g>}
    {type === 'architecture' && <g stroke="currentColor" strokeWidth="2"><path d="m40 7 28 15-28 15L12 22 40 7Zm-28 30 28 15 28-15M12 52l28 15 28-15M12 22v15m56-15v15M12 52v10l28 15 28-15V52"/><path d="M40 37v15m0 15v10"/></g>}
    {type === 'launch' && <g stroke="currentColor" strokeWidth="2"><circle cx="40" cy="40" r="25"/><circle cx="40" cy="40" r="15"/><path d="M40 3v13m0 48v13M3 40h13m48 0h13m-32 3 21-21m-14 0h14v14"/><circle cx="40" cy="40" r="3" fill="currentColor"/></g>}
  </svg>;
}
