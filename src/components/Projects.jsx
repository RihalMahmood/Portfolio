import { Link } from "react-router-dom";
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
        <a href="https://github.com/RihalMahmood?tab=repositories" target="_blank" rel="noopener noreferrer" className="view-all" {...ho}>View all projects ↗</a>
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <Link
            key={p.id}
            to={`/projects/${p.slug}`}
            className={`project-card reveal d${(i % 3) + 1} ${p.wide ? "wide" : ""}`}
            style={{ textDecoration: "none", color: "inherit" }}
            {...ho}
          >
            <div className="project-img">
              {p.image ? (
                <img className="project-custom-img" src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
              {/* "View details" hint */}
              <div className="project-view-hint">
                View details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div></section>
  );
}
