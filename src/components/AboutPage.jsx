import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";

/* ── Journey timeline data ── */
const journey = [
  {
    period: "Jan 2022 – Present",
    role: "Private Tutor",
    org: "Self-employed",
    type: "Work",
    desc: "Teaching Computer Science, Mathematics (Calculus I, II, III), Statistics, and Mechanics to O & A Level students.",
  },
  {
    period: "2022 – 2026",
    role: "BSc in Computer Science & Engineering",
    org: "University",
    type: "Education",
    desc: "Graduating in 2026 with a focus on software engineering, algorithms, and full-stack web development. Worked on multiple real-world projects spanning MERN stack, AI tooling, and game development.",
  },
  {
    period: "2025",
    role: "Freelance Full-Stack Developer",
    org: "Various Clients",
    type: "Work",
    desc: "Delivered production-ready web applications using React, Node.js, and MongoDB. Built tools for e-commerce, data management, and AI-assisted workflows.",
  },
  {
    period: "2024",
    role: "Open Source & Personal Projects",
    org: "GitHub",
    type: "Project",
    desc: "Developed and shipped Colossus (Google Drive aggregator), DraftSense (AI LoL draft advisor), and a full chess engine in Java with JavaFX.",
  },
  {
    period: "2019 – 2022",
    role: "High School (A Levels & O Levels)",
    org: "Secondary Education",
    type: "Education",
    desc: "Completed A Levels with distinction. Discovered a passion for programming through self-taught Python and competitive problem-solving during this period.",
  },
];

const typeColors = {
  Work: "var(--accent)",
  Education: "#6bbaff",
  Project: "#a78bfa",
};

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "dark"
  );
  const [hovering, setHovering] = useState(false);

  /* Keep theme in sync with the html attribute set by App */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.getAttribute("data-theme") || "dark"
      );
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Reveal animation observer */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("up")),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const ho = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
    }),
  };

  return (
    <>
      <CustomCursor hovering={hovering} />
      <Navbar
        scrolled={scrolled}
        setHovering={setHovering}
        activeSection="about"
        theme={theme}
        toggleTheme={toggleTheme}
        isLoading={false}
      />

      <main className="about-page">
        {/* ── Hero / Intro ── */}
        <section className="about-intro-section">
          <div className="container about-intro-grid">
            {/* Left – text block */}
            <div className="about-intro-text">
              <motion.p
                className="section-label"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={0}
              >
                About Me
              </motion.p>

              <motion.h1
                className="about-headline"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
              >
                I build things for the&nbsp;
                <em className="about-headline-accent">web.</em>
              </motion.h1>

              <motion.p
                className="about-bio"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
              >
                Hey! I'm{" "}
                <strong>Quazi Rihal Mahmood</strong> — a Computer Science & Engineering
                graduate (2026) passionate about turning complex problems into
                elegant, performant software. I thrive at the intersection of
                thoughtful design and clean engineering.
              </motion.p>

              <motion.p
                className="about-bio"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
              >
                I specialize in full-stack web development with the MERN stack,
                and I'm increasingly drawn to AI-augmented applications. When
                I'm not shipping code, I'm mentoring students, playing games, or
                overthinking UI details.
              </motion.p>

              <motion.div
                className="about-actions"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
              >
                <a
                  href="/files/CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-resume-btn"
                  {...ho}
                >
                  <span className="about-resume-icon">↓</span>
                  View Resume
                </a>
                <a href="mailto:rihalmahmood@gmail.com" className="about-contact-link" {...ho}>
                  Get in touch →
                </a>
              </motion.div>
            </div>

            {/* Right – photo + stat cards */}
            <motion.div
              className="about-intro-visual"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
            >
              <div className="about-photo-wrap">
                <img
                  src="/images/Riju.png"
                  alt="Quazi Rihal Mahmood"
                  className="about-photo"
                />
                <div className="about-photo-glow" />
              </div>

              <div className="about-stat-cards">
                {[
                  { num: "4+", lbl: "Projects Shipped" },
                  { num: "3+", lbl: "Years Coding" },
                  { num: "∞", lbl: "Cups of Coffee" },
                ].map((s, i) => (
                  <motion.div
                    key={s.lbl}
                    className="about-stat-card"
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    custom={3 + i}
                  >
                    <span className="about-stat-num">{s.num}</span>
                    <span className="about-stat-lbl">{s.lbl}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Journey / Timeline ── */}
        <section className="journey-section">
          <div className="container">
            <div className="reveal">
              <p className="section-label">Journey</p>
              <h2 className="journey-heading">
                The road&nbsp;<em style={{ fontWeight: 300, fontStyle: "italic", color: "var(--accent)" }}>so far</em>
              </h2>
              <p className="journey-sub">
                A curated timeline of the experiences that shaped me as a developer and human.
              </p>
            </div>

            <div className="timeline">
              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  className="timeline-item reveal"
                  style={{ "--delay": `${i * 0.12}s` }}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                >
                  {/* Connector line + dot */}
                  <div className="timeline-connector">
                    <div
                      className="timeline-dot"
                      style={{ background: typeColors[item.type] ?? "var(--accent)" }}
                    />
                    {i < journey.length - 1 && <div className="timeline-line" />}
                  </div>

                  {/* Card */}
                  <div className="timeline-card">
                    <div className="timeline-meta">
                      <span
                        className="timeline-type"
                        style={{ color: typeColors[item.type] ?? "var(--accent)" }}
                      >
                        {item.type}
                      </span>
                      <span className="timeline-period">{item.period}</span>
                    </div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <p className="timeline-org">{item.org}</p>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer>
          <div className="container" style={{ display: "flex", justifyContent: "space-between", padding: "0 40px" }}>
            <span>© 2026 Quazi Rihal Mahmood</span>
            <span style={{ display: "flex", gap: "24px" }}>
              <a href="https://github.com/RihalMahmood" target="_blank" rel="noopener noreferrer" {...ho}>GitHub</a>
              <a href="https://www.linkedin.com/in/quazi-rihal-mahmood-05a59b362/" target="_blank" rel="noopener noreferrer" {...ho}>LinkedIn</a>
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
