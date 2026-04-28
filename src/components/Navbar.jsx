export default function Navbar({ scrolled, setHovering, activeSection }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
        <span />
        <div className="nav-links">
          <a href="#top" className={activeSection === "top" ? "active" : ""} {...ho}>Home</a>
          <a href="#skills" className={activeSection === "skills" ? "active" : ""} {...ho}>Skills</a>
          <a href="#work" className={activeSection === "work" ? "active" : ""} {...ho}>Projects</a>
          <a href="#contact" className={activeSection === "contact" ? "active" : ""} {...ho}>Contact</a>
        </div>
        <button className="nav-cta" {...ho}>Hire Me</button>
      </div>
    </nav>
  );
}
