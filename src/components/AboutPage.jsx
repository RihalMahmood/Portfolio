import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CustomCursor from "./CustomCursor";

/*Journey timeline data*/
const journey = [
  {
    period: "Jan 2022 – Present",
    role: "Private Tutor",
    org: "Self-employed",
    type: "Work",
    desc: "Teaching Computer Science, Mathematics, Physics and Chemistry to O & A Level students and University Undergrads",
  },
  {
    period: "2022 – 2026",
    role: "BSc in Computer Science & Engineering",
    org: "North South University",
    type: "Education",
    desc: "Graduating in 2026 with a focus on software engineering, algorithms, and full-stack web development. Worked on multiple real-world projects spanning MERN stack, AI tooling, and game development.",
  },
  {
    period: "2022",
    role: "Course Project",
    org: "North South University",
    type: "Project",
    desc: "Made a Chess game and engine using Java and JavaFX as Graphical User Interface (GUI) for the course Programming Language-II (Java).",
  },
  {
    period: "2022",
    role: "Course Project",
    org: "North South University",
    type: "Project",
    desc: "Made a Restaurant Management System using Java and JavaFX for one of my friend's course project.",
  },
  {
    period: "2023",
    role: "Course Project",
    org: "North South University",
    type: "Project",
    desc: "Made a Bus Management System using HTML, CSS, PHP and MySQL for the course Introduction to Database Systems.",
  },
  {
    period: "July 2024 - January 2026",
    role: "Teaching Assistant (TA)",
    org: "North South University",
    type: "Work",
    desc: "Worked as a TA for the courses Programming Language, Data Structure and Algorithms, Database, Digital Logic and Computer Architecture.",
  },
  {
    period: "2025",
    role: "Course Projects",
    org: "North South University",
    type: "Project",
    desc: "Developed Colossus (Google Drive aggregator) for the course Software Engineering and later for my personal use",
  },
  {
    period: "2025",
    role: "Capstone Project",
    org: "North South University",
    type: "Project",
    desc: "Developed eKYC system for banks using Blockchain technology and React with my group.",
  },
  {
    period: "2026",
    role: "Commercial Project",
    org: "Gazi Fan Company Limited",
    type: "Work",
    desc: "Developed a commerical website for Gazi Fan Group.",
  },
  {
    period: "2026",
    role: "Personal Project",
    org: "GitHub",
    type: "Project",
    desc: "Developed DraftSense, a real time AI powered draft adviser for League of Legends.",
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

  /*Keep theme in sync with the html attribute set by App*/
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

  /*Reveal animation observer*/
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
        {/*Hero / Intro*/}
        <section className="about-intro-section">
          <div className="container about-intro-grid">
            {/*Left - text block*/}
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
                I architect systems and engineer digital&nbsp;
                <em className="about-headline-accent">solutions.</em>
              </motion.h1>

              <motion.p
                className="about-bio"
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
              >
                Hey! I'm{" "}
                <strong>Quazi Rihal Mahmood</strong> - a Computer Science & Engineering
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
                I specialize in architecting scalable systems and full-stack applications, with a deep interest in distributed computing and AI-augmented software. When I'm not engineering solutions, I'm mentoring students, exploring new tech stacks, playing games, or overthinking UI details.
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
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=rihalmahmood@gmail.com" target="_blank" rel="noopener noreferrer" className="about-contact-link" {...ho}>
                  Get in touch →
                </a>
              </motion.div>
            </div>

            {/*Right – photo + stat cards*/}
            <motion.div
              className="about-intro-visual"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
            >
              <div className="about-photo-wrap">
                <img
                  src="/images/Rih.jpeg"
                  alt="Quazi Rihal Mahmood"
                  className="about-photo"
                />
                <div className="about-photo-glow" />
              </div>

              <div className="about-stat-cards">
                {[
                  { num: "4+", lbl: "Years Coding" },
                  { num: "3.75", lbl: "CGPA" },
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

        {/*Journey / Timeline*/}
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

            <div className="timeline-alt">
              {/*Central vertical line*/}
              <div className="timeline-alt-spine" />

              {journey.map((item, i) => {
                const isLeft = i % 2 === 0;
                const color = typeColors[item.type] ?? "var(--accent)";
                return (
                  <motion.div
                    key={i}
                    className={`timeline-alt-row ${isLeft ? "tl-left" : "tl-right"}`}
                    initial={{ opacity: 0, x: isLeft ? -48 : 48 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  >
                    {/*Card*/}
                    <motion.div
                      className="timeline-alt-card"
                      style={{ '--card-color': color }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 22 }}
                      {...ho}
                    >
                      <div className="timeline-meta">
                        <span className="timeline-type" style={{ color }}>
                          {item.type}
                        </span>
                        <span className="timeline-period">{item.period}</span>
                      </div>
                      <h3 className="timeline-role">{item.role}</h3>
                      <p className="timeline-org">{item.org}</p>
                      <p className="timeline-desc">{item.desc}</p>
                      {/*Accent bar on the edge nearest the spine*/}
                      <div className="timeline-alt-bar" style={{ background: color }} />
                    </motion.div>

                    {/*Dot on the spine*/}
                    <div className="timeline-alt-dot-wrap">
                      <motion.div
                        className="timeline-alt-dot"
                        style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      />
                    </div>

                    {/*Empty spacer for the opposite side*/}
                    <div className="timeline-alt-spacer" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/*Footer*/}
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
