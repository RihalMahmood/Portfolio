import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update colors
content = re.sub(r'--muted:\s*#dfbec6;', '--muted:    #94a3b8;', content)
content = re.sub(r'--accent:\s*#EA4C89;', '--accent:   #00f2ff;', content)
content = content.replace('rgba(127,255,107,', 'rgba(0,242,255,')

# 2. Add container CSS and update nav/section padding
css_addition = '''
/* ── CONTAINER ── */
.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
'''
content = content.replace('/* ── NAV ── */', css_addition + '\n/* ── NAV ── */')

# Make nav use container internally
content = content.replace('nav {\n  position: fixed; top:0; left:0; right:0; z-index:100;\n  display: flex; align-items:center; justify-content:space-between;\n  padding: 24px 40px;', 
                          'nav {\n  position: fixed; top:0; left:0; right:0; z-index:100;\n  padding: 24px 0;')
content = content.replace('<nav className={scrolled ? "scrolled" : ""}>', 
                          '<nav className={scrolled ? "scrolled" : ""}>\n                <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>')
content = content.replace('</button>\n            </nav>', 
                          '</button>\n                </div>\n            </nav>')

# Update sections to use container wrapper internally
# Hero:
content = content.replace('<section className="hero">', '<section className="hero"><div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gridTemplateRows: "1fr auto", gap: "0 60px" }}>')
content = content.replace('</section>\n\n            {/* ── MARQUEE ── */}', '</div></section>\n\n            {/* ── MARQUEE ── */}')

# Adjust hero CSS since it had grid properties
content = content.replace('.hero {\n  min-height:100vh; display:grid;\n  grid-template-columns:1fr 300px;\n  grid-template-rows:1fr auto;\n  padding:0 40px 48px;\n  padding-top:110px;\n  gap:0 60px;\n  position:relative;\n}', 
                          '.hero {\n  min-height:100vh; padding:0 40px 48px;\n  padding-top:110px;\n  position:relative; display: flex; align-items: stretch;\n}')

# Update media queries for Hero
content = content.replace('.hero { grid-template-columns:1fr; padding-top:100px; }', 
                          '.hero > .container { grid-template-columns:1fr; } .hero { padding-top:100px; }')

# Skills section
content = content.replace('<section className="skills-section" id="skills">', '<section className="skills-section" id="skills"><div className="container">')
content = content.replace('</section>\n\n            {/* ── PROJECTS ── */}', '</div></section>\n\n            {/* ── PROJECTS ── */}')

# Projects section
content = content.replace('<section className="projects-section" id="work">', '<section className="projects-section" id="work"><div className="container">')
content = content.replace('</section>\n\n            {/* ── CONTACT ── */}', '</div></section>\n\n            {/* ── CONTACT ── */}')

# Contact section
content = content.replace('<section className="contact-section" id="contact">', '<section className="contact-section" id="contact"><div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>')
content = content.replace('</section>\n\n            {/* ── FOOTER ── */}', '</div></section>\n\n            {/* ── FOOTER ── */}')

content = content.replace('.contact-section { background:var(--bg); display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }', 
                          '.contact-section { background:var(--bg); }')

content = content.replace('.contact-section { grid-template-columns:1fr; }', '.contact-section > .container { grid-template-columns:1fr !important; }')

# Footer
content = content.replace('<footer>', '<footer><div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>')
content = content.replace('</footer>\n        </>', '</div></footer>\n        </>')
content = content.replace('footer {\n  border-top:1px solid var(--border); padding:28px 40px;\n  display:flex; justify-content:space-between; align-items:center;', 
                          'footer {\n  border-top:1px solid var(--border); padding:28px 40px;')

# 3. Marquee changes
marquee_old = '''const marqueeItems = Array(10).fill(null).map((_, i) => (
    <span key={i} className={`marquee-item ${i % 2 === 0 ? "filled" : ""}`}>
        QUAZI RIHAL MAHMOOD
    </span>
));'''

marquee_new = '''const coreStacks = ["JavaScript", "TypeScript", "Java", "C", "C++", "Python", "HTML", "CSS", "Node.js", "React", "TailwindCSS", "Git", "Vercel", "Docker", "Next.js", "PHP"];
const marqueeItems = coreStacks.map((stack, i) => (
    <span key={i} className={`marquee-item ${i % 2 === 0 ? "filled" : ""}`} style={{ padding: "0 20px" }}>
        {stack}
    </span>
));'''

content = content.replace(marquee_old, marquee_new)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

