import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ scrolled, setHovering, activeSection, theme, toggleTheme, isLoading }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  const location = useLocation();
  const isAbout = location.pathname === "/about";

  return (
    <motion.nav
      className={scrolled ? "scrolled" : ""}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: isLoading ? -60 : 0, opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: isLoading ? 0 : 1.2 }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
        <span />
        <div className="nav-links">
          {isAbout ? (
            /* On the About page, Home/Skills/Projects/Contact scroll-anchor links go back to / */
            <>
              <Link to="/#top" className={activeSection === "top" ? "active" : ""} {...ho}>Home</Link>
              <Link to="/#skills" className={activeSection === "skills" ? "active" : ""} {...ho}>Skills</Link>
              <Link to="/#work" className={activeSection === "work" ? "active" : ""} {...ho}>Projects</Link>
              <Link to="/#contact" className={activeSection === "contact" ? "active" : ""} {...ho}>Contact</Link>
              <Link to="/about" className="active" {...ho}>About</Link>
            </>
          ) : (
            /* On the Home page, normal hash links + About goes to /about */
            <>
              <a href="#top" className={activeSection === "top" ? "active" : ""} {...ho}>Home</a>
              <a href="#skills" className={activeSection === "skills" ? "active" : ""} {...ho}>Skills</a>
              <a href="#work" className={activeSection === "work" ? "active" : ""} {...ho}>Projects</a>
              <a href="#contact" className={activeSection === "contact" ? "active" : ""} {...ho}>Contact</a>
              <Link to="/about" className={activeSection === "about" ? "active" : ""} {...ho}>About</Link>
            </>
          )}
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
