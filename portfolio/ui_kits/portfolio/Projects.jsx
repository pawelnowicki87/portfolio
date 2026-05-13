// Portfolio Projects — recreation of src/components/Projects.js (carousel)
const projectImages = {
  hematobieg:   "../../assets/projects/hematobieg.png",
  phonecatalog: "../../assets/projects/phone-catalog.png",
  welcome:      "../../assets/projects/welcome-to-the-met.png",
  todo:         "../../assets/projects/todo-app.png",
  listofposts:  "../../assets/projects/list-of-posts.jpg",
  game:         "../../assets/projects/game-2048.png",
};

const PortfolioProjects = ({ t }) => {
  const [idx, setIdx] = React.useState(0);
  const list = t.projectsList;
  const p = list[idx];
  const prev = () => setIdx((idx - 1 + list.length) % list.length);
  const next = () => setIdx((idx + 1) % list.length);
  return (
    <section id="projects" className="pf-section pf-section-alt">
      <div className="pf-section-inner">
        <p className="pf-eyebrow" style={{textAlign:'center'}}>{t.projects}</p>
        <h2 className="pf-h2" style={{textAlign:'center', marginBottom: 32}}>{t.projects}</h2>
        <div className="pf-carousel">
          <button className="pf-car-arrow left" onClick={prev} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="pf-car-card">
            <img src={projectImages[p.image]} alt={p.title} />
            <div className="pf-car-body">
              <h3 className="pf-h3">{p.title}</h3>
              <p className="pf-p">{p.description}</p>
              <div className="pf-cta-row">
                <a className="ds-btn ds-btn-primary" href={p.demo} target="_blank" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M15 3h6v6M10 14 21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>
                  Live demo
                </a>
                <a className="ds-btn ds-btn-secondary" href={p.github} target="_blank" rel="noreferrer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>
                  Code
                </a>
              </div>
            </div>
          </div>
          <button className="pf-car-arrow right" onClick={next} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div className="pf-dots">
          {list.map((_, i) => <button key={i} className={'pf-dot ' + (i === idx ? 'on' : '')} onClick={() => setIdx(i)} aria-label={'Slide ' + (i+1)} />)}
        </div>
      </div>
    </section>
  );
};
window.PortfolioProjects = PortfolioProjects;
