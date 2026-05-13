const TopBar = ({ screen, darkMode, setDarkMode }) => {
  const Icon = ({ d, sz=16 }) => <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
  const label = { overview:'Overview', board:'Projects · Hematobieg', settings:'Settings · Profile' }[screen];
  return (
    <header className="ds-topbar">
      <div className="ds-crumbs">
        <span className="ds-crumb-faded">Nowicki Engineering</span>
        <Icon d="m9 18 6-6-6-6"/>
        <span className="ds-crumb">{label}</span>
      </div>
      <div className="ds-search">
        <Icon d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm9 16-3.5-3.5"/>
        <span>Search or jump to…</span>
        <kbd>⌘K</kbd>
      </div>
      <div className="ds-top-actions">
        <button className="ds-icon-btn"><Icon d="M21 11.5a8.4 8.4 0 1 1-9.5-8.3l-1 3.3 3.5 1L13 11l3 2 4-1z"/></button>
        <button className="ds-icon-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode
            ? <Icon d="M12 3v1m0 16v1m9-9h-1M4 12H3M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
            : <Icon d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>}
        </button>
        <button className="ds-icon-btn" style={{position:'relative'}}>
          <Icon d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M9 21a3 3 0 0 0 6 0"/>
          <span className="ds-badge-dot"></span>
        </button>
        <div className="ds-avatar"><img src="../../assets/founder-portrait.png" alt=""/></div>
      </div>
    </header>
  );
};
window.TopBar = TopBar;
