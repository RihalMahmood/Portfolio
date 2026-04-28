import { socials } from "../data";
import { motion } from "framer-motion";

export default function Hero({ setHovering, isLoading }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };

  /* Repeat the name enough times so the track is always wider than the viewport */
  const nameRepeat = Array(8).fill("Quazi Rihal Mahmood");

  return (
    <section className="hero">
      {/* Decorative SVG path */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
        <path d="M -100 200 Q 300 500 500 -100" stroke="rgba(255,255,255,0.05)" fill="transparent" strokeWidth="1" />
        <circle r="2" fill="var(--accent)">
          <animateMotion dur="12s" repeatCount="indefinite" path="M -100 200 Q 300 500 500 -100" keyPoints="1;0;1" keyTimes="0;0.5;1" calcMode="linear" />
        </circle>
      </svg>

      <div className="hero-top-content">
        {/* ── Greeting line ── */}
        <div className="hero-greeting">
          Hey, <span className="wave">👋</span> I'm a Full Stack Developer
        </div>

        {/* ── Marquee band with photo in the middle ── */}
        <div className="hero-marquee-band">
          {/* The scrolling name track */}
          <div className="hero-name-track">
            {nameRepeat.map((name, i) => (
              <span key={i} className="hero-name-item">
                {name}
                <span className="hero-name-dot">·</span>
              </span>
            ))}
          </div>

          {/* Profile picture pinned to the centre of the band */}
          <motion.img 
            className="hero-band-img" 
            src="/images/Riju.png" 
            alt="Quazi Rihal Mahmood" 
            initial={{ y: "calc(-50% + 60px)", x: "-50%", opacity: 0 }}
            animate={{ 
              y: isLoading ? "calc(-50% + 60px)" : "-50%", 
              x: "-50%", 
              opacity: isLoading ? 0 : 1 
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: isLoading ? 0 : 0.4 }}
          />
        </div>
      </div>

      {/* ── Bottom two-column info row ── */}
      <div className="container hero-bottom-row">
        <div className="hero-left">
          <p className="hero-role">BSc in Computer Science &amp; Engineering</p>

          <p className="hero-role">2026 Graduate</p>
          <div className="hero-scroll">
            <div className="scroll-bar" />
            SCROLL
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-contact">
            <a href="mailto:rihalmahmood@gmail.com" className="contact-row" {...ho}>
              <span className="label">E</span> rihalmahmood@gmail.com
            </a>
            <a href="tel:+8801740350047" className="contact-row" {...ho}>
              <span className="label">T</span> +880 1740350047
            </a>
            <div className="social-row">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link" {...ho}>
                  <span className="slash">/</span>{s.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
