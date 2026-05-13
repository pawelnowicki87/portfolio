const Overview = () => {
  const Icon = ({ d, sz=14 }) => <svg width={sz} height={sz} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
  const Stat = ({ title, value, delta, down }) => (
    <div className="ds-card ds-stat">
      <div className="ds-stat-head">{title}</div>
      <div className="ds-stat-val">{value}</div>
      <div className={'ds-stat-delta ' + (down ? 'down' : '')}>
        <Icon d={down ? 'M12 19V5m-7 7 7 7 7-7' : 'M12 5v14M5 12l7-7 7 7'}/>{delta}
      </div>
    </div>
  );
  const activity = [
    { who:'Paweł Nowicki', what:'deployed', tgt:'phone-catalog', when:'2 min ago', kind:'deploy' },
    { who:'Anna K.',       what:'merged PR #482 into', tgt:'hematobieg', when:'18 min ago', kind:'pr' },
    { who:'Mateusz S.',    what:'opened issue on', tgt:'list-of-posts', when:'1 hour ago', kind:'issue' },
    { who:'Paweł Nowicki', what:'created project', tgt:'event-platform-v2', when:'Yesterday', kind:'create' },
  ];
  return (
    <div className="ds-content">
      <div className="ds-page-head">
        <div>
          <h1 className="ds-h1">Good morning, Paweł</h1>
          <p className="ds-page-sub">Here's what's happening across your workspace today.</p>
        </div>
        <button className="ds-btn ds-btn-primary"><Icon d="M12 5v14M5 12h14"/>New project</button>
      </div>
      <div className="ds-stat-grid">
        <Stat title="Active projects" value="12" delta="+2 this week"/>
        <Stat title="Open PRs" value="34" delta="+8.2%"/>
        <Stat title="Deployments · 24h" value="58"  delta="+12%"/>
        <Stat title="Error rate" value="0.04%" delta="−0.4%" down/>
      </div>
      <div className="ds-two-col">
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-h3">Recent activity</h3><a href="#" className="ds-link">View all</a></div>
          <div className="ds-activity">
            {activity.map((a,i)=>(
              <div className="ds-act-row" key={i}>
                <div className={'ds-act-icon k-'+a.kind}>
                  {a.kind==='deploy' && <Icon d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>}
                  {a.kind==='pr'     && <Icon d="M6 3v12a3 3 0 0 0 3 3h6m0 0-3-3m3 3-3 3M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>}
                  {a.kind==='issue'  && <Icon d="M12 9v4m0 4v.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>}
                  {a.kind==='create' && <Icon d="M12 5v14M5 12h14"/>}
                </div>
                <div className="ds-act-body">
                  <span className="ds-act-who">{a.who}</span> <span className="ds-act-verb">{a.what}</span> <span className="ds-act-tgt">{a.tgt}</span>
                </div>
                <div className="ds-act-when">{a.when}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ds-card">
          <div className="ds-card-head"><h3 className="ds-h3">Deployments</h3><a href="#" className="ds-link">eu-central-1</a></div>
          <div className="ds-deploys">
            {[
              {name:'phone-catalog',  ver:'v2.4.1', state:'success', t:'2m'},
              {name:'hematobieg',     ver:'v8.0.0', state:'success', t:'1h'},
              {name:'list-of-posts',  ver:'v0.9.3', state:'building', t:'now'},
              {name:'todo-app',       ver:'v1.2.0', state:'failed', t:'3h'},
              {name:'welcome-to-met', ver:'v1.0.4', state:'success', t:'2d'},
            ].map((d,i)=>(
              <div className="ds-deploy" key={i}>
                <div className={'ds-deploy-dot s-'+d.state}></div>
                <div className="ds-deploy-name">{d.name}</div>
                <div className="ds-deploy-ver">{d.ver}</div>
                <div className="ds-deploy-time">{d.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
window.Overview = Overview;
