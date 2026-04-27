import { useState, useEffect, useRef } from "react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

:root {
  --bg:       #0c0c0e;
  --surface:  #141417;
  --border:   rgba(255,255,255,0.07);
  --text:     #f0ede8;
  --muted:    #6b6b72;
  --accent:   #7fff6b;
  --accent2:  #6bbaff;
  --font:     'DM Sans', sans-serif;
  --mono:     'DM Mono', monospace;
}

html { scroll-behavior: smooth; }
body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  cursor: none;
}

/* cursor */
.cur { position:fixed; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); transition:width .25s,height .25s,background .25s; border-radius:50%; }
.cur-dot  { width:8px; height:8px; background:var(--accent); }
.cur-ring { width:36px; height:36px; border:1.5px solid rgba(127,255,107,.4); background:transparent; }
.cur-ring.grow { width:56px; height:56px; }

/* ── NAV ── */
nav {
  position: fixed; top:0; left:0; right:0; z-index:100;
  display: flex; align-items:center; justify-content:space-between;
  padding: 24px 40px;
  border-bottom: 1px solid transparent;
  transition: border-color .4s, background .4s;
}
nav.scrolled { background: rgba(12,12,14,.85); backdrop-filter:blur(16px); border-color: var(--border); }
.nav-logo {
  font-family: var(--mono); font-size:14px; font-weight:500;
  letter-spacing:.5px; color:var(--text); text-decoration:none;
  display:flex; align-items:center; gap:8px;
}
.logo-dot { width:8px; height:8px; background:var(--accent); border-radius:50%; display:inline-block; }
.nav-links { display:flex; align-items:center; gap:32px; }
.nav-links a {
  font-size:13px; font-weight:400; letter-spacing:.4px;
  color:var(--muted); text-decoration:none; transition:color .2s;
}
.nav-links a:hover { color:var(--text); }
.nav-cta {
  font-family:var(--mono); font-size:12px; font-weight:500;
  border:1px solid var(--border); padding:9px 20px;
  border-radius:6px; background:transparent; color:var(--text);
  cursor:none; letter-spacing:.5px;
  transition:border-color .2s, background .2s;
}
.nav-cta:hover { border-color:var(--accent); background:rgba(127,255,107,.06); }

/* ── HERO ── */
.hero {
  min-height:100vh; display:grid;
  grid-template-columns:1fr 300px;
  grid-template-rows:1fr auto;
  padding:0 40px 48px;
  padding-top:110px;
  gap:0 60px;
  position:relative;
}
.hero-left { display:flex; flex-direction:column; justify-content:flex-end; gap:0; }
.hero-greeting {
  font-size:15px; font-weight:400; color:var(--muted);
  margin-bottom:20px; display:flex; align-items:center; gap:8px;
  opacity:0; animation:fadeUp .7s .2s forwards;
}
.wave { display:inline-block; animation:wave 1.8s .8s ease-in-out 2; }
@keyframes wave { 0%,100%{transform:rotate(0)} 25%{transform:rotate(20deg)} 75%{transform:rotate(-10deg)} }
.hero-name {
  font-size:clamp(72px,10vw,140px); font-weight:600; letter-spacing:-3px;
  line-height:.9; color:var(--text);
  opacity:0; animation:fadeUp .8s .35s forwards;
}
.hero-name span { color:var(--accent); }
.hero-role {
  font-family:var(--mono); font-size:13px; color:var(--muted);
  margin-top:28px; letter-spacing:.5px;
  opacity:0; animation:fadeUp .7s .5s forwards;
}
.hero-scroll {
  font-family:var(--mono); font-size:11px; letter-spacing:2px;
  text-transform:uppercase; color:var(--muted);
  display:flex; align-items:center; gap:12px; margin-top:60px;
  opacity:0; animation:fadeUp .7s .8s forwards;
}
.scroll-bar { flex:1; max-width:60px; height:1px; background:var(--border); position:relative; overflow:hidden; }
.scroll-bar::after {
  content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
  background:var(--accent); animation:slide 2s 1.5s ease-in-out infinite;
}
@keyframes slide { 0%{left:-100%} 100%{left:200%} }

.hero-right {
  display:flex; flex-direction:column; justify-content:flex-end;
  gap:32px; padding-bottom:4px;
  opacity:0; animation:fadeRight .8s .6s forwards;
}
.hero-img-wrap {
  position:relative; border-radius:16px; overflow:hidden;
  flex:1; min-height:320px; max-height:440px;
  border:1px solid var(--border);
}
.hero-img-wrap img, .hero-img-fallback {
  width:100%; height:100%; object-fit:cover;
}
.hero-img-fallback {
  background:linear-gradient(160deg,#1a2030,#0e1420);
  display:flex; align-items:center; justify-content:center;
}
.avatar-svg { width:160px; opacity:.9; }
.hero-contact { display:flex; flex-direction:column; gap:10px; }
.contact-row {
  display:flex; align-items:center; gap:12px;
  font-size:13px; color:var(--muted);
  text-decoration:none; transition:color .2s; cursor:none;
}
.contact-row:hover { color:var(--text); }
.contact-row .label { font-family:var(--mono); font-size:11px; color:var(--accent); min-width:14px; }
.social-row { display:flex; gap:16px; margin-top:4px; }
.social-link {
  font-size:12px; color:var(--muted); text-decoration:none;
  letter-spacing:.3px; transition:color .2s; cursor:none;
  display:flex; align-items:center; gap:4px;
}
.social-link .slash { color:var(--accent); font-family:var(--mono); }
.social-link:hover { color:var(--text); }

/* ── MARQUEE ── */
.marquee-wrap {
  border-top:1px solid var(--border); border-bottom:1px solid var(--border);
  overflow:hidden; padding:20px 0; background:var(--surface);
}
.marquee-track {
  display:flex; gap:48px; width:max-content;
  animation:marquee 18s linear infinite;
}
.marquee-track:hover { animation-play-state:paused; }
.marquee-item {
  font-size:clamp(32px,4vw,52px); font-weight:600; letter-spacing:-1.5px;
  color:transparent; -webkit-text-stroke:1px rgba(255,255,255,.18);
  white-space:nowrap; user-select:none;
}
.marquee-item.filled { -webkit-text-stroke:0; color:rgba(255,255,255,.12); }
@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* ── SECTION BASE ── */
section { padding:100px 40px; }
.section-label {
  font-family:var(--mono); font-size:12px; letter-spacing:1px;
  color:var(--accent); margin-bottom:48px; display:flex; align-items:center; gap:8px;
}
.section-label::before { content:'//'; }

/* ── SKILLS ── */
.skills-section { background:var(--bg); }
.skills-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:40px; }
.skill-col h3 {
  font-family:var(--mono); font-size:12px; letter-spacing:1px;
  color:var(--muted); text-transform:uppercase; margin-bottom:20px;
}
.skill-tags { display:flex; flex-wrap:wrap; gap:8px; }
.skill-tag {
  font-size:13px; padding:6px 14px; border-radius:6px;
  border:1px solid var(--border); color:var(--muted); cursor:none;
  transition:border-color .2s, color .2s, background .2s;
}
.skill-tag:hover { border-color:var(--accent); color:var(--text); background:rgba(127,255,107,.05); }

.about-blurb {
  max-width:640px; font-size:16px; line-height:1.8; color:rgba(240,237,232,.65);
  font-weight:300; margin-top:64px;
}
.about-blurb strong { color:var(--text); font-weight:500; }
.resume-link {
  display:inline-flex; align-items:center; gap:8px;
  margin-top:28px; font-size:13px; font-weight:500;
  color:var(--text); text-decoration:none; letter-spacing:.3px;
  border-bottom:1px solid var(--border); padding-bottom:4px;
  transition:border-color .2s, color .2s;
}
.resume-link:hover { border-color:var(--accent); color:var(--accent); }
.stats-row { display:flex; gap:0; margin-top:64px; }
.stat {
  flex:1; border-left:1px solid var(--border); padding-left:32px; padding-right:32px;
}
.stat:first-child { border-left:none; padding-left:0; }
.stat .num {
  font-size:48px; font-weight:600; letter-spacing:-2px;
  color:var(--text); line-height:1;
}
.stat .num span { color:var(--accent); }
.stat .lbl { font-size:12px; color:var(--muted); margin-top:6px; letter-spacing:.3px; }

/* ── PROJECTS ── */
.projects-section { background:var(--surface); }
.projects-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:48px; }
.projects-header h2 { font-size:clamp(32px,5vw,52px); font-weight:600; letter-spacing:-1.5px; }
.view-all {
  font-size:13px; color:var(--muted); text-decoration:none;
  display:flex; align-items:center; gap:6px;
  transition:color .2s; cursor:none;
}
.view-all:hover { color:var(--text); }

.projects-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
.project-card {
  background:var(--bg); border:1px solid var(--border); border-radius:16px;
  overflow:hidden; cursor:none; transition:border-color .3s, transform .3s;
  display:flex; flex-direction:column;
}
.project-card:hover { border-color:rgba(127,255,107,.25); transform:translateY(-4px); }
.project-card.wide { grid-column:1/-1; flex-direction:row; align-items:stretch; }
.project-img {
  aspect-ratio:16/9; overflow:hidden; flex-shrink:0;
}
.project-card.wide .project-img { width:45%; aspect-ratio:auto; }
.project-img-inner {
  width:100%; height:100%; display:flex; align-items:center; justify-content:center;
  font-size:48px; transition:transform .5s;
}
.project-card:hover .project-img-inner { transform:scale(1.06); }
.project-body { padding:24px 28px; flex:1; display:flex; flex-direction:column; gap:12px; }
.project-num { font-family:var(--mono); font-size:11px; color:var(--muted); }
.project-title { font-size:20px; font-weight:600; letter-spacing:-.4px; }
.project-desc { font-size:14px; line-height:1.7; color:var(--muted); flex:1; }
.project-techs { display:flex; flex-wrap:wrap; gap:6px; margin-top:4px; }
.project-tech {
  font-family:var(--mono); font-size:11px; letter-spacing:.3px;
  padding:4px 10px; border-radius:4px;
  border:1px solid var(--border); color:var(--muted);
}

/* ── CONTACT ── */
.contact-section { background:var(--bg); display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
.contact-left h2 { font-size:clamp(40px,6vw,72px); font-weight:600; letter-spacing:-2px; line-height:.95; }
.contact-left h2 em { font-style:italic; font-weight:300; color:var(--muted); }
.contact-left p { font-size:16px; line-height:1.8; color:var(--muted); margin-top:28px; font-weight:300; }
.contact-cta {
  display:inline-flex; align-items:center; gap:10px; margin-top:36px;
  background:var(--accent); color:#0c0c0e; padding:14px 32px;
  border-radius:8px; font-size:14px; font-weight:600; letter-spacing:.3px;
  text-decoration:none; cursor:none; border:none;
  transition:opacity .2s, transform .2s;
}
.contact-cta:hover { opacity:.85; transform:translateY(-2px); }
.contact-right { display:flex; flex-direction:column; gap:20px; }
.contact-item {
  display:flex; align-items:center; gap:16px;
  padding:20px 24px; border-radius:12px; border:1px solid var(--border);
  text-decoration:none; color:var(--text); cursor:none;
  transition:border-color .2s, background .2s;
}
.contact-item:hover { border-color:rgba(127,255,107,.3); background:rgba(127,255,107,.03); }
.contact-item-icon {
  width:40px; height:40px; border-radius:8px;
  background:rgba(255,255,255,.04); display:flex; align-items:center; justify-content:center;
  font-family:var(--mono); font-size:14px; color:var(--accent); flex-shrink:0;
}
.contact-item-label { font-size:11px; color:var(--muted); margin-bottom:3px; letter-spacing:.5px; }
.contact-item-val { font-size:14px; font-weight:500; }

/* ── FOOTER ── */
footer {
  border-top:1px solid var(--border); padding:28px 40px;
  display:flex; justify-content:space-between; align-items:center;
  font-size:12px; color:var(--muted); font-family:var(--mono);
}
footer a { color:var(--muted); text-decoration:none; transition:color .2s; }
footer a:hover { color:var(--text); }

/* ── REVEAL ── */
.reveal { opacity:0; transform:translateY(32px); transition:opacity .8s ease, transform .8s ease; }
.reveal.up { opacity:1; transform:translateY(0); }
.d1 { transition-delay:.1s; } .d2 { transition-delay:.2s; } .d3 { transition-delay:.3s; }

@keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeRight{ from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }

@media(max-width:900px){
  .hero { grid-template-columns:1fr; padding-top:100px; }
  .hero-right { display:none; }
  .skills-grid { grid-template-columns:1fr 1fr; }
  .projects-grid { grid-template-columns:1fr; }
  .project-card.wide { flex-direction:column; }
  .project-card.wide .project-img { width:100%; aspect-ratio:16/9; }
  .contact-section { grid-template-columns:1fr; }
  nav { padding:20px 24px; }
  section { padding:80px 24px; }
  .stats-row { flex-wrap:wrap; gap:32px; }
  .stat { border-left:none; padding-left:0; border-top:1px solid var(--border); padding-top:24px; width:calc(50% - 16px); }
  .stat:first-child { border-top:none; padding-top:0; }
}
`;

/* ─── DATA ──────────────────────────────────────────────────── */
const skills = [
    { cat: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS", "Framer Motion"] },
    { cat: "Backend & DB", items: ["Node.js", "Express.js", "Python", "Django", "PostgreSQL", "MongoDB"] },
    { cat: "Tools & Cloud", items: ["Git & GitHub", "Docker", "AWS", "Linux", "Figma", "Postman"] },
];
const projects = [
    {
        id: "01", wide: true, emoji: "🔗", bg: "#0e1520",
        title: "DevConnect", tag: "Full Stack · Featured",
        desc: "A GitHub-style developer social network — follow devs, showcase repos, post updates, and collaborate. Built with a real-time notification system using WebSockets.",
        techs: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
    },
    {
        id: "02", emoji: "🧠", bg: "#0e1a12",
        title: "AlgoViz",
        desc: "Interactive step-by-step visualizer for classic algorithms — sorting, pathfinding, tree traversal. Used by 400+ students.",
        techs: ["React", "Canvas API", "TypeScript"],
    },
    {
        id: "03", emoji: "🛒", bg: "#1a0e14",
        title: "ShopSense",
        desc: "ML-powered e-commerce engine with product recommendations, sentiment analysis on reviews, and real-time inventory forecasting.",
        techs: ["Python", "FastAPI", "scikit-learn", "Redis"],
    },
    {
        id: "04", emoji: "💬", bg: "#12100e",
        title: "ChatDocs",
        desc: "RAG-based chat interface for querying PDFs, docs and knowledge bases. Supports multi-document sessions with source attribution.",
        techs: ["LangChain", "OpenAI API", "Next.js", "Pinecone"],
    },
];
const contacts = [
    { icon: "E", label: "Email", val: "alex.rahman.dev@gmail.com", href: "mailto:alex.rahman.dev@gmail.com" },
    { icon: "GH", label: "GitHub", val: "github.com/alexrahman", href: "#" },
    { icon: "LI", label: "LinkedIn", val: "linkedin.com/in/alexrahman", href: "#" },
];

/* ─── AVATAR SVG ─────────────────────────────────────────────── */
const Avatar = () => (
    <svg className="avatar-svg" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="95" rx="52" ry="58" fill="#1c2233" />
        <path d="M48 320 C48 230 70 210 100 202 C130 210 152 230 152 320Z" fill="#1a2233" />
        <path d="M62 320 C62 240 78 218 100 210 C122 218 138 240 138 320Z" fill="#243040" />
        <ellipse cx="100" cy="95" rx="52" ry="58" fill="#c8a07a" />
        <path d="M48 80 Q52 30 100 36 Q148 30 152 80 Q142 50 100 54 Q58 50 48 80Z" fill="#1a1008" />
        <rect x="88" y="140" width="24" height="36" rx="10" fill="#b8906a" />
        <ellipse cx="79" cy="96" rx="7" ry="8" fill="#fff" />
        <ellipse cx="121" cy="96" rx="7" ry="8" fill="#fff" />
        <ellipse cx="80" cy="97" rx="4" ry="4.5" fill="#1a0e05" />
        <ellipse cx="122" cy="97" rx="4" ry="4.5" fill="#1a0e05" />
        <path d="M93 115 Q100 122 107 115" stroke="#a07858" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <rect x="66" y="90" width="26" height="18" rx="8" fill="none" stroke="#2a1e10" strokeWidth="2" />
        <rect x="108" y="90" width="26" height="18" rx="8" fill="none" stroke="#2a1e10" strokeWidth="2" />
        <line x1="92" y1="99" x2="108" y2="99" stroke="#2a1e10" strokeWidth="2" />
        <line x1="48" y1="97" x2="66" y2="97" stroke="#2a1e10" strokeWidth="2" />
        <line x1="134" y1="97" x2="152" y2="97" stroke="#2a1e10" strokeWidth="2" />
    </svg>
);

/* ─── MARQUEE ITEMS ──────────────────────────────────────────── */
const marqueeItems = Array(10).fill(null).map((_, i) => (
    <span key={i} className={`marquee-item ${i % 2 === 0 ? "filled" : ""}`}>
        ALEX RAHMAN
    </span>
));

/* ─── COMPONENT ──────────────────────────────────────────────── */
export default function Portfolio() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        let rx = 0, ry = 0;
        const move = (e) => {
            if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
            const lerp = (a, b, t) => a + (b - a) * t;
            const animate = () => {
                rx = lerp(rx, e.clientX, 0.12);
                ry = lerp(ry, e.clientY, 0.12);
                if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
            };
            requestAnimationFrame(animate);
        };
        window.addEventListener("mousemove", move);
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => { window.removeEventListener("mousemove", move); window.removeEventListener("scroll", onScroll); };
    }, []);

    useEffect(() => {
        const els = document.querySelectorAll(".reveal");
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("up")),
            { threshold: 0.1 }
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };

    return (
        <>
            <style>{css}</style>

            {/* Custom cursors */}
            <div ref={dotRef} className="cur cur-dot" />
            <div ref={ringRef} className={`cur cur-ring ${hovering ? "grow" : ""}`} />

            {/* ── NAV ── */}
            <nav className={scrolled ? "scrolled" : ""}>
                <a href="#" className="nav-logo"><span className="logo-dot" /> alex.rahman</a>
                <div className="nav-links">
                    <a href="#skills">Skills</a>
                    <a href="#work">Work</a>
                    <a href="#contact">Contact</a>
                </div>
                <button className="nav-cta" {...ho}>Hire Me</button>
            </nav>

            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-left">
                    <div className="hero-greeting">
                        Hey, <span className="wave">👋</span> I'm a Full Stack Developer
                    </div>
                    <h1 className="hero-name">
                        Alex<br /><span>Rahman</span>
                    </h1>
                    <p className="hero-role">BSc in Computer Science & Engineering · 2024 Graduate</p>
                    <div className="hero-scroll">
                        <div className="scroll-bar" />
                        SCROLL
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-img-wrap">
                        <div className="hero-img-fallback"><Avatar /></div>
                    </div>
                    <div className="hero-contact">
                        <a href="mailto:alex.rahman.dev@gmail.com" className="contact-row" {...ho}>
                            <span className="label">E</span> alex.rahman.dev@gmail.com
                        </a>
                        <a href="tel:+8801700000000" className="contact-row" {...ho}>
                            <span className="label">T</span> +880 1700 000 000
                        </a>
                        <div className="social-row">
                            {["GitHub", "LinkedIn", "Twitter", "CodePen"].map(s => (
                                <a key={s} href="#" className="social-link" {...ho}>
                                    <span className="slash">/</span>{s}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MARQUEE ── */}
            <div className="marquee-wrap">
                <div className="marquee-track">
                    {marqueeItems}{marqueeItems}
                </div>
            </div>

            {/* ── SKILLS ── */}
            <section className="skills-section" id="skills">
                <div className="section-label reveal">Skills</div>
                <div className="skills-grid reveal d1">
                    {skills.map(s => (
                        <div className="skill-col" key={s.cat}>
                            <h3>{s.cat}</h3>
                            <div className="skill-tags">
                                {s.items.map(tag => (
                                    <span key={tag} className="skill-tag" {...ho}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="about-blurb reveal d2">
                    I thrive on solving real-world problems, turning ideas into <strong>clean, maintainable code</strong>,
                    and learning through experimentation. You'll find me building side projects, diving into new tech stacks,
                    or exploring what's next in the world of web development. I bring both{" "}
                    <strong>engineering rigour and design sensibility</strong> to every project.
                </p>
                <a href="#" className="resume-link reveal d3" {...ho}>
                    View My Resume ↗
                </a>
                <div className="stats-row">
                    {[
                        { num: "12", suf: "+", lbl: "Projects Built" },
                        { num: "5", suf: "", lbl: "Hackathons Entered" },
                        { num: "3", suf: ".8", lbl: "CGPA" },
                        { num: "2", suf: "+", lbl: "Years of Coding" },
                    ].map((s, i) => (
                        <div key={s.lbl} className={`stat reveal d${i + 1}`}>
                            <div className="num">{s.num}<span>{s.suf}</span></div>
                            <div className="lbl">{s.lbl}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PROJECTS ── */}
            <section className="projects-section" id="work">
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
                                <div className="project-img-inner" style={{ background: p.bg }}>
                                    <span style={{ fontSize: 56 }}>{p.emoji}</span>
                                </div>
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
            </section>

            {/* ── CONTACT ── */}
            <section className="contact-section" id="contact">
                <div className="contact-left reveal">
                    <div className="section-label">Get In Touch</div>
                    <h2>Let's build<br /><em>something</em><br />great together</h2>
                    <p>
                        I'm actively looking for my first full-time role or freelance projects.
                        Whether you have an opportunity or just want to chat about tech — my inbox is always open.
                    </p>
                    <a href="mailto:alex.rahman.dev@gmail.com" className="contact-cta" {...ho}>
                        Send a Message ↗
                    </a>
                </div>
                <div className="contact-right reveal d2">
                    {contacts.map(c => (
                        <a key={c.label} href={c.href} className="contact-item" {...ho}>
                            <div className="contact-item-icon">{c.icon}</div>
                            <div>
                                <div className="contact-item-label">{c.label}</div>
                                <div className="contact-item-val">{c.val}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer>
                <span>© 2024 Alex Rahman. All rights reserved.</span>
                <span>Built with React · Inspired by DevSync</span>
            </footer>
        </>
    );
}
