import { useState } from "react";
import { contacts } from "../data";

export default function Contact({ setHovering }) {
  const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=rihalmahmood@gmail.com&su=${subject}&body=${body}`,
      "_blank"
    );
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };
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
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-input"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Tell me about the problem or opportunity."
                className="form-input form-textarea"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit" className="form-submit" {...ho}>
                {sent ? "Opening Gmail… ✓" : "Send message ↗"}
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
    </>
  );
}
