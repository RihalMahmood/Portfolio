import { contacts } from "../data";

export default function Contact({ setHovering }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  return (
    <>
      {/*CONTACT*/}
      <section className="contact-section" id="contact">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "flex-start", padding: "0 40px" }}>
          <div className="contact-left reveal">
            <div className="section-label">Get In Touch</div>
            <h2>Let's build<br /><em>something</em><br />great together</h2>
            <p>
              Open to collaborations in AI, software development and product-focused web builds. Share a brief and I’ll reply fast.
            </p>
          </div>
          <div className="contact-right reveal d2">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Name" className="form-input" />
              <input type="email" placeholder="Email" className="form-input" />
              <textarea placeholder="Tell me about the problem or opportunity." className="form-input form-textarea" rows="5"></textarea>
              <button type="submit" className="form-submit" {...ho}>
                Send message ↗
              </button>
            </form>
          </div>
        </div>
        <div className="container contact-bottom reveal d3" style={{ padding: "80px 40px 0" }}>
          <div className="contact-horizontal-list">
            {contacts.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="contact-item horizontal" {...ho}>
                <div className="contact-item-icon">{c.icon}</div>
                <div>
                  <div className="contact-item-label">{c.label}</div>
                  <div className="contact-item-val">{c.val}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/*FOOTER*/}
      <footer><div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px" }}>
        <span>© 2026 Quazi Rihal Mahmood. All rights reserved.</span>
        <span>Built with ❤️ and inspired by many great developers</span>
      </div></footer>
    </>
  );
}
