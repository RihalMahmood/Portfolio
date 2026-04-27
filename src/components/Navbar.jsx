export default function Navbar({ scrolled, setHovering }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
        <span />
        <div className="nav-links">
          <a href="#top">Home</a>
          <a href="#work">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-cta" {...ho}>Hire Me</button>
      </div>
    </nav>
  );
}
