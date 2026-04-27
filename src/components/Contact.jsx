import { contacts } from "../data";

export default function Contact({ setHovering }) {
    const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
    return (
        <>
            {/* ── CONTACT ── */}
            <section className="contact-section" id="contact"><div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
                <div className="contact-left reveal">
                    <div className="section-label">Get In Touch</div>
                    <h2>Let's build<br /><em>something</em><br />great together</h2>
                    <p>
                        I'm actively looking for my first full-time role or freelance projects.
                        Whether you have an opportunity or just want to chat about tech — my inbox is always open.
                    </p>
                    <a href="mailto:quazi.rihal@gmail.com" className="contact-cta" {...ho}>
                        Send a Message ↗
                    </a>
                </div>
                <div className="contact-right reveal d2">
                    {contacts.map(c => (
                        <a key={c.label} href={c.href} className="contact-item" {...ho}>
                            <div className="contact-item-icon">{c.icon}</div>
                            <div>
                                <div className="contact-item-label">{c.label}</div>
                                <div className="contact-item-val">{c.val}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div></section>

            {/* ── FOOTER ── */}
            <footer><div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>© 2024 Quazi Rihal Mahmood. All rights reserved.</span>
                <span>Built with React · Inspired by DevSync</span>
            </div></footer>
        </>
    );
}
