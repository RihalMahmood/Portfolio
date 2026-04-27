
export default function Navbar({ scrolled, setHovering }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
        <a href="#" className="nav-logo"><span className="logo-dot" /> QRM.</a>
        <div className="nav-links">
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-cta" {...ho}>Hire Me</button>
      </div>
    </nav>
  );
}
