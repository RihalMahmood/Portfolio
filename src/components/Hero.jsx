
export default function Hero({ setHovering }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  return (
    <section className="hero"><div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gridTemplateRows: "1fr auto", gap: "0 60px", padding: "0 40px" }}>

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
          <img src="/images/Riju.jpg" alt="Profile Picture" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div className="hero-contact">
          <a href="mailto:rihalmahmood@gmail.com" className="contact-row" {...ho}>
            <span className="label">E</span> rihalmahmood@gmail.com
          </a>
          <a href="tel:+8801740350047" className="contact-row" {...ho}>
            <span className="label">T</span> +880 1740350047
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
