const Settings = () => {
  const sections = ['Profile','Account','Workspace','Members','Billing','API keys','Integrations','Audit log'];
  return (
    <div className="ds-content ds-content-narrow">
      <div className="ds-page-head"><h1 className="ds-h1">Settings</h1></div>
      <div className="ds-settings">
        <nav className="ds-set-nav">
          {sections.map((s,i)=>(<a key={s} className={'ds-set-link ' + (i===0?'on':'')}>{s}</a>))}
        </nav>
        <div className="ds-card ds-set-panel">
          <h3 className="ds-h3">Profile</h3>
          <p className="ds-page-sub">This is how others in the workspace see you.</p>
          <div className="ds-set-row">
            <div className="ds-set-avatar"><img src="../../assets/founder-portrait.png" alt=""/></div>
            <div>
              <button className="ds-btn ds-btn-secondary">Upload photo</button>
              <p className="ds-help">PNG, JPG. Max 2MB.</p>
            </div>
          </div>
          <div className="ds-set-grid">
            <div className="ds-field"><label>Full name</label><input className="ds-input" defaultValue="Paweł Nowicki"/></div>
            <div className="ds-field"><label>Display name</label><input className="ds-input" defaultValue="Paweł"/></div>
            <div className="ds-field"><label>Email</label><input className="ds-input" defaultValue="webstardevelop@gmail.com"/></div>
            <div className="ds-field"><label>Role</label><input className="ds-input" defaultValue="Senior Full-Stack Engineer"/></div>
          </div>
          <div className="ds-field"><label>Bio</label>
            <textarea className="ds-input ds-textarea" rows={3} defaultValue="Building scalable enterprise web apps with React, NestJS, and AWS."/>
          </div>
          <div className="ds-toggle-row">
            <div><div className="ds-toggle-name">Email digest</div><div className="ds-toggle-desc">Weekly summary every Monday at 9am.</div></div>
            <span className="ds-switch on"><span></span></span>
          </div>
          <div className="ds-toggle-row">
            <div><div className="ds-toggle-name">Two-factor authentication</div><div className="ds-toggle-desc">Required for workspace admins.</div></div>
            <span className="ds-switch on"><span></span></span>
          </div>
          <div className="ds-set-foot">
            <button className="ds-btn ds-btn-secondary">Cancel</button>
            <button className="ds-btn ds-btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};
window.Settings = Settings;
