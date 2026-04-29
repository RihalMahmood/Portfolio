import { motion } from "framer-motion";

export default function Navbar({ scrolled, setHovering, activeSection, theme, toggleTheme, isLoading }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  return (
    <motion.nav
      className={scrolled ? "scrolled" : ""}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: isLoading ? -60 : 0, opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
        <span />
        <div className="nav-links">
          <a href="#top" className={activeSection === "top" ? "active" : ""} {...ho}>Home</a>
          <a href="#skills" className={activeSection === "skills" ? "active" : ""} {...ho}>Skills</a>
          <a href="#work" className={activeSection === "work" ? "active" : ""} {...ho}>Projects</a>
          <a href="#contact" className={activeSection === "contact" ? "active" : ""} {...ho}>Contact</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            {...ho}
            style={{ 
              background: "transparent", 
              border: "none", 
              color: "var(--text)", 
              fontSize: "18px", 
              cursor: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {theme === "dark" ? "☼" : "☾"}
          </button>
          <button className="nav-cta" {...ho}>Hire Me</button>
        </div>
      </div>
    </motion.nav>
  );
}
