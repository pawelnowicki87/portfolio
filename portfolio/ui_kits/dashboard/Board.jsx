const Board = () => {
  const cols = [
    { name:'Backlog',     count:6, tasks:[
      {id:'PMP-204', title:'Migrate auth to OAuth 2.0 + MS SSO', tag:'auth', prio:'high', assign:'PN'},
      {id:'PMP-205', title:'Move event consumers to RabbitMQ', tag:'infra', prio:'med', assign:'AK'},
      {id:'PMP-209', title:'Investigate slow N+1 in /projects', tag:'perf', prio:'low', assign:'MS'},
    ]},
    { name:'In progress', count:3, tasks:[
      {id:'PMP-198', title:'Build analytics dashboard skeleton', tag:'frontend', prio:'high', assign:'PN'},
      {id:'PMP-201', title:'Add Redis-backed session cache', tag:'backend', prio:'med', assign:'PN'},
    ]},
    { name:'Review',      count:2, tasks:[
      {id:'PMP-187', title:'PR #482 · Refactor settings layout', tag:'frontend', prio:'med', assign:'AK'},
      {id:'PMP-191', title:'Update Tailwind to v3.4', tag:'chore', prio:'low', assign:'MS'},
    ]},
    { name:'Done',        count:8, tasks:[
      {id:'PMP-175', title:'Dockerize NestJS services', tag:'devops', prio:'high', assign:'PN'},
      {id:'PMP-179', title:'Add e2e tests for checkout', tag:'qa', prio:'med', assign:'AK'},
    ]},
  ];
  const prioClass = { high:'p-high', med:'p-med', low:'p-low' };
  return (
    <div className="ds-content">
      <div className="ds-page-head">
        <div>
          <p className="ds-eyebrow-sm">Hematobieg · sprint 14</p>
          <h1 className="ds-h1">Project board</h1>
        </div>
        <div className="ds-page-actions">
          <button className="ds-btn ds-btn-secondary">Filter</button>
          <button className="ds-btn ds-btn-secondary">Group: status</button>
          <button className="ds-btn ds-btn-primary">+ Task</button>
        </div>
      </div>
      <div className="ds-board">
        {cols.map(col => (
          <div className="ds-col" key={col.name}>
            <div className="ds-col-head">
              <span className="ds-col-name">{col.name}</span>
              <span className="ds-col-count">{col.count}</span>
            </div>
            {col.tasks.map(t => (
              <div className="ds-task" key={t.id}>
                <div className="ds-task-meta">
                  <span className="ds-task-id">{t.id}</span>
                  <span className={'ds-task-prio ' + prioClass[t.prio]}></span>
                </div>
                <div className="ds-task-title">{t.title}</div>
                <div className="ds-task-foot">
                  <span className="ds-task-tag">{t.tag}</span>
                  <span className="ds-task-assign">{t.assign}</span>
                </div>
              </div>
            ))}
            <button className="ds-add-task">+ Add task</button>
          </div>
        ))}
      </div>
    </div>
  );
};
window.Board = Board;
