const Sidebar = ({ screen, setScreen }) => {
  const Icon = ({ d }) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
  const items = [
    { key:'overview', label:'Overview',  d:'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z'},
    { key:'board',    label:'Projects',  d:'M3 4h6v16H3zM10 4h11v6H10zM10 11h11v9H10z'},
    { key:'settings', label:'Settings',  d:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9-3-2-1V9l2-1-1-2-2 1-2-1V4l-1-1h-2l-1 1v1l-2 1-2-1-1 2 2 1v2l-2 1 1 2 2-1 2 1v1l1 1h2l1-1v-1l2-1z'},
  ];
  const others = ['Analytics','Customers','Billing','Team','Integrations','Audit log'];
  return (
    <aside className="ds-sidebar">
      <div className="ds-ws">
        <div className="ds-ws-mark"><span style={{color:'var(--blue-400)'}}>P</span>N</div>
        <div className="ds-ws-meta">
          <div className="ds-ws-name">Nowicki Engineering</div>
          <div className="ds-ws-plan">Pro · 12 members</div>
        </div>
        <Icon d="m6 9 6 6 6-6"/>
      </div>
      <div className="ds-nav-section">
        {items.map(it => (
          <a key={it.key} className={'ds-nav-item ' + (screen === it.key ? 'on' : '')} onClick={() => setScreen(it.key)}>
            <Icon d={it.d}/><span>{it.label}</span>
            {it.key==='board' && <span className="ds-nav-count">4</span>}
          </a>
        ))}
      </div>
      <div className="ds-nav-section">
        <div className="ds-nav-head">Workspace</div>
        {others.map(o => <a key={o} className="ds-nav-item"><span className="ds-nav-dot"></span><span>{o}</span></a>)}
      </div>
      <div className="ds-sidebar-foot">
        <img src="../../assets/founder-portrait.png" alt=""/>
        <div><div className="ds-foot-name">Paweł Nowicki</div><div className="ds-foot-mail">webstardevelop@gmail.com</div></div>
        <Icon d="M12 5v.01M12 12v.01M12 19v.01"/>
      </div>
    </aside>
  );
};
window.Sidebar = Sidebar;
