import re

with open('Dummy.jsx', 'r', encoding='utf-8') as f:
    app_content = f.read()

# Apply colors
app_content = re.sub(r'--bg:\s*#0c0c0e;', '--bg:       #000000;', app_content)
app_content = re.sub(r'--surface:\s*#141417;', '--surface:  #111111;', app_content)
app_content = re.sub(r'--text:\s*#f0ede8;', '--text:     #e3dffe;', app_content)
app_content = re.sub(r'--muted:\s*#6b6b72;', '--muted:    #94a3b8;', app_content)
app_content = re.sub(r'--accent:\s*#7fff6b;', '--accent:   #00f2ff;', app_content)
app_content = app_content.replace('rgba(127,255,107,', 'rgba(0,242,255,')

# Container CSS
css_addition = '''
/* ── CONTAINER ── */
.container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
'''
app_content = app_content.replace('/* ── NAV ── */', css_addition + '\n/* ── NAV ── */')

# Extract CSS
css_start = app_content.find('const css = `') + len('const css = `\n')
css_end = app_content.find('`;', css_start)
css_content = app_content[css_start:css_end]
with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

# Extract Projects
projects_start = app_content.find('{/* ── PROJECTS ── */}')
projects_end = app_content.find('{/* ── CONTACT ── */}')
projects_raw = app_content[projects_start:projects_end]
projects_raw = projects_raw.replace('<section className="projects-section" id="work">', '<section className="projects-section" id="work"><div className="container">')
projects_raw = projects_raw.replace('</section>', '</div></section>')

projects_jsx = f'''import React from "react";
import {{ projects }} from "../data";

export default function Projects({{ hovering, setHovering }}) {{
    const ho = {{ onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) }};
    return (
        {projects_raw.strip()}
    );
}}
'''
with open('src/components/Projects.jsx', 'w', encoding='utf-8') as f:
    f.write(projects_jsx)

# Extract Custom Cursor
cursor_jsx = f'''import React, {{ useEffect, useRef }} from "react";

export default function CustomCursor({{ hovering }}) {{
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {{
        let rx = 0, ry = 0;
        const move = (e) => {{
            if (dotRef.current) {{ dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }}
            const lerp = (a, b, t) => a + (b - a) * t;
            const animate = () => {{
                rx = lerp(rx, e.clientX, 0.12);
                ry = lerp(ry, e.clientY, 0.12);
                if (ringRef.current) {{ ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }}
            }};
            requestAnimationFrame(animate);
        }};
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }}, []);

    return (
        <>
            <div ref={{dotRef}} className="cur cur-dot" />
            <div ref={{ringRef}} className={{`cur cur-ring ${{hovering ? "grow" : ""}}`}} />
        </>
    );
}}
'''
with open('src/components/CustomCursor.jsx', 'w', encoding='utf-8') as f:
    f.write(cursor_jsx)
