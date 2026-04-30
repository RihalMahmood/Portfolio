import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../data";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";

/*Animation variants*/
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  const [scrolled, setScrolled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "dark"
  );

  /*Keep theme in sync*/
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") || "dark");
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    sessionStorage.setItem("portfolio_theme", next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /*Parallax on the hero image*/
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const ho = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };

  /*404 guard*/
  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
        <p style={{ fontSize: 20, color: "var(--muted)" }}>Project not found.</p>
        <Link to="/#work" style={{ color: "var(--accent)" }}>← Back to projects</Link>
      </div>
    );
  }

  const accent = "var(--accent)";

  return (
    <>
      <CustomCursor hovering={hovering} />
      <Navbar
        scrolled={scrolled}
        setHovering={setHovering}
        activeSection="work"
        theme={theme}
        toggleTheme={toggleTheme}
        isLoading={false}
      />

      <main className="pp-page">
        {/*Hero*/}
        <section className="pp-hero" ref={heroRef} style={{ "--pp-accent": accent }}>
          {/*Parallax image*/}
          <motion.div className="pp-hero-img-wrap" style={{ y: imgY }}>
            {project.image ? (
              <img src={project.image} alt={project.title} className="pp-hero-img" />
            ) : (
              <div className="pp-hero-img pp-hero-emoji-bg" style={{ background: project.bg }}>
                <span>{project.emoji}</span>
              </div>
            )}
          </motion.div>

          {/*Gradient overlay — must not intercept pointer events so the navbar stays clickable*/}
          <div className="pp-hero-overlay" style={{ pointerEvents: "none" }} />

          {/*Hero text*/}
          <div className="pp-hero-content container">
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0}
              className="pp-hero-meta"
            >
              <Link to="/" onClick={(e) => {
                e.preventDefault();
                navigate("/", { state: { scrollTo: "work" } });
              }} className="pp-back-link" {...ho}>
                ← All Projects
              </Link>
              <span className="pp-hero-tag">
                {project.tag}
              </span>
            </motion.div>

            <motion.h1
              className="pp-hero-title"
              variants={fadeUp} initial="hidden" animate="show" custom={1}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="pp-hero-subtitle"
              variants={fadeUp} initial="hidden" animate="show" custom={2}
            >
              {project.desc}
            </motion.p>

            <motion.div
              className="pp-hero-actions"
              variants={fadeUp} initial="hidden" animate="show" custom={3}
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="pp-github-btn"
                {...ho}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
              <div className="pp-hero-info">
                <span className="pp-info-chip">{project.year}</span>
                <span className="pp-info-chip">{project.type}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/*BODY*/}
        <div className="pp-body container">

          {/*Overview*/}
          <motion.section
            className="pp-section"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}
          >
            <p className="pp-section-label">// Overview</p>
            <p className="pp-overview-text">{project.longDesc}</p>
          </motion.section>

          {/*Features + Tech Stack (two-col)*/}
          <div className="pp-two-col">
            {/*Features*/}
            <motion.section
              className="pp-section"
              variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} custom={0}
            >
              <p className="pp-section-label">// Key Features</p>
              <ul className="pp-features-list">
                {project.features.map((feat, i) => (
                  <motion.li
                    key={i}
                    className="pp-feature-item"
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                    {...ho}
                  >
                    <span className="pp-feature-dot" />
                    {feat}
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/*Tech stack*/}
            <motion.section
              className="pp-section"
              variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} custom={1}
            >
              <p className="pp-section-label">// Tech Stack</p>
              <div className="pp-tech-grid">
                {project.techs.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="pp-tech-badge"
                    variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i * 0.5}
                    whileHover={{ y: -3, borderColor: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    {...ho}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>
          </div>

          {/*Challenges*/}
          <motion.section
            className="pp-section pp-challenges"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} custom={0}
          >
            <p className="pp-section-label">// Challenges & Learnings</p>
            <blockquote className="pp-challenge-text">
              {project.challenges}
            </blockquote>
          </motion.section>

          {/*GitHub CTA banner*/}
          <motion.section
            className="pp-cta-banner"
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} custom={0}
          >
            <div className="pp-cta-glow" />
            <p className="pp-cta-heading">Curious about the code?</p>
            <p className="pp-cta-sub">The full source is on GitHub - browse the implementation, issues, and commit history.</p>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-github-btn pp-cta-btn"
              {...ho}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.165c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Open Repository ↗
            </a>
          </motion.section>

        </div>

        {/*Footer*/}
        <footer>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", padding: "0 40px" }}>
            <span>© 2026 Quazi Rihal Mahmood</span>
            <Link to="/#work" style={{ color: "var(--muted)", textDecoration: "none" }} {...ho}>← Back to all projects</Link>
          </div>
        </footer>
      </main>
    </>
  );
}
