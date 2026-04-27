
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

export default function Hero({ setHovering }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  return (
    <section className="hero"><div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gridTemplateRows: "1fr auto", gap: "0 60px" }}>

      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
        <path d="M -100 200 Q 300 500 500 -100" stroke="rgba(255,255,255,0.05)" fill="transparent" strokeWidth="1" />
        <circle r="2" fill="var(--accent)">
          <animateMotion dur="12s" repeatCount="indefinite" path="M -100 200 Q 300 500 500 -100" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
        </circle>
      </svg>

      <div className="hero-left">
        <div className="hero-greeting">
          Hey, <span className="wave">👋</span> I'm a Full Stack Developer
        </div>
        <h1 className="hero-name">
          Quazi Rihal<br /><span>Mahmood</span>
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
          <a href="mailto:quazi.rihal@gmail.com" className="contact-row" {...ho}>
            <span className="label">E</span> quazi.rihal@gmail.com
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
    </div></section>
  );
}
