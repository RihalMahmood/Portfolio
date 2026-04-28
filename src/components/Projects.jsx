import { projects } from "../data";

export default function Projects({ setHovering }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  return (
    <section className="projects-section" id="work"><div className="container" style={{ padding: "0 40px" }}>
      <div className="projects-header reveal">
        <div>
          <div className="section-label">Explore Work</div>
          <h2>A Showcase of My<br />Latest Projects</h2>
        </div>
        <a href="#" className="view-all" {...ho}>View all projects ↗</a>
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`project-card reveal d${(i % 3) + 1} ${p.wide ? "wide" : ""}`}
            {...ho}
          >
            <div className="project-img">
              {p.image ? (
                <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div className="project-img-inner" style={{ background: p.bg }}>
                  <span style={{ fontSize: 56 }}>{p.emoji}</span>
                </div>
              )}
            </div>
            <div className="project-body">
              <span className="project-num">// {p.id}</span>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-techs">
                {p.techs.map(t => <span key={t} className="project-tech">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div></section>
  );
}
