import os

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    app_content = f.read()

# 1. Extract CSS and put it in index.css
css_start = app_content.find('const css = `') + len('const css = `\n')
css_end = app_content.find('`;', css_start)
css_content = app_content[css_start:css_end]

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

# Remove the CSS variable from App.jsx and the <style>{css}</style>
app_content = app_content[:app_content.find('/* ─── GLOBAL STYLES')] + app_content[css_end+2:]
app_content = app_content.replace('<style>{css}</style>', '')

# Create components directory if not exists
os.makedirs('src/components', exist_ok=True)

# Helper to extract sections
def extract_section(content, start_marker, end_marker):
    start = content.find(start_marker)
    if start == -1: return ""
    
    # We need to find the matching closing tag.
    # It's easier to just use string splitting based on the comments.
    end = content.find(end_marker, start)
    if end == -1: return ""
    
    return content[start:end]

# 2. Extract Data (skills, projects, contacts) -> We can put this in a shared data file or keep it in the components.
# Let's put data in src/data.js
data_start = app_content.find('/* ─── DATA')
data_end = app_content.find('/* ─── AVATAR')
data_content = app_content[data_start:data_end]
data_content = data_content.replace('const skills =', 'export const skills =').replace('const projects =', 'export const projects =').replace('const contacts =', 'export const contacts =')

with open('src/data.js', 'w', encoding='utf-8') as f:
    f.write(data_content)

app_content = app_content[:data_start] + app_content[data_end:]

# 3. Navbar
nav_content = extract_section(app_content, '{/* ── NAV ── */}', '{/* ── HERO ── */}')
nav_jsx = f'''import React from "react";

export default function Navbar({{ scrolled, hovering, setHovering }}) {{
    const ho = {{ onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) }};
    return (
        {nav_content.strip()}
    );
}}
'''
with open('src/components/Navbar.jsx', 'w', encoding='utf-8') as f:
    f.write(nav_jsx)

# 4. Hero
hero_content = extract_section(app_content, '{/* ── HERO ── */}', '{/* ── MARQUEE ── */}')
avatar_svg = extract_section(app_content, '/* ─── AVATAR SVG ──', '/* ─── MARQUEE ITEMS ──')
# clean up avatar definition from App.jsx
app_content = app_content.replace(avatar_svg, '')

hero_jsx = f'''import React from "react";

{avatar_svg.strip()}

export default function Hero({{ hovering, setHovering }}) {{
    const ho = {{ onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) }};
    return (
        {hero_content.strip()}
    );
}}
'''
with open('src/components/Hero.jsx', 'w', encoding='utf-8') as f:
    f.write(hero_jsx)

# 5. Marquee
marquee_content = extract_section(app_content, '{/* ── MARQUEE ── */}', '{/* ── SKILLS ── */}')
marquee_items_def = extract_section(app_content, '/* ─── MARQUEE ITEMS', '/* ─── COMPONENT')
app_content = app_content.replace(marquee_items_def, '')

devicon_mapping = {
    "JavaScript": "javascript/javascript-original.svg",
    "TypeScript": "typescript/typescript-original.svg",
    "Java": "java/java-original.svg",
    "C": "c/c-original.svg",
    "C++": "cplusplus/cplusplus-original.svg",
    "Python": "python/python-original.svg",
    "HTML": "html5/html5-original.svg",
    "CSS": "css3/css3-original.svg",
    "Node.js": "nodejs/nodejs-original.svg",
    "React": "react/react-original.svg",
    "TailwindCSS": "tailwindcss/tailwindcss-original.svg",
    "Git": "git/git-original.svg",
    "Vercel": "vercel/vercel-original.svg",
    "Docker": "docker/docker-original.svg",
    "Next.js": "nextjs/nextjs-original.svg",
    "PHP": "php/php-original.svg"
}

marquee_jsx = f'''import React from "react";

const coreStacks = ["JavaScript", "TypeScript", "Java", "C", "C++", "Python", "HTML", "CSS", "Node.js", "React", "TailwindCSS", "Git", "Vercel", "Docker", "Next.js", "PHP"];

const devicons = {str(devicon_mapping)};

const marqueeItems = coreStacks.map((stack, i) => (
    <span key={{i}} className={{`marquee-item ${{i % 2 === 0 ? "filled" : ""}}`}} style={{{{ padding: "0 20px", display: "flex", alignItems: "center", gap: "12px" }}}}>
        <img src={{`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${{devicons[stack]}}`}} alt={{stack}} style={{{{ width: "40px", height: "40px", filter: "grayscale(100%) brightness(200%)" }}}} />
        {{stack}}
    </span>
));

export default function Marquee() {{
    return (
        {marquee_content.strip().replace('{marqueeItems}{marqueeItems}', '{marqueeItems}{marqueeItems}')}
    );
}}
'''
with open('src/components/Marquee.jsx', 'w', encoding='utf-8') as f:
    f.write(marquee_jsx)

# 6. Skills
skills_content = extract_section(app_content, '{/* ── SKILLS ── */}', '{/* ── PROJECTS ── */}')
skills_jsx = f'''import React from "react";
import {{ skills }} from "../data";

export default function Skills({{ hovering, setHovering }}) {{
    const ho = {{ onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) }};
    return (
        {skills_content.strip()}
    );
}}
'''
with open('src/components/Skills.jsx', 'w', encoding='utf-8') as f:
    f.write(skills_jsx)

# 7. Projects
projects_content = extract_section(app_content, '{/* ── PROJECTS ── */}', '{/* ── CONTACT ── */}')
projects_jsx = f'''import React from "react";
import {{ projects }} from "../data";

export default function Projects({{ hovering, setHovering }}) {{
    const ho = {{ onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) }};
    return (
        {projects_content.strip()}
    );
}}
'''
with open('src/components/Projects.jsx', 'w', encoding='utf-8') as f:
    f.write(projects_jsx)

# 8. Contact (and Footer)
contact_content = extract_section(app_content, '{/* ── CONTACT ── */}', '</>')
contact_jsx = f'''import React from "react";
import {{ contacts }} from "../data";

export default function Contact({{ hovering, setHovering }}) {{
    const ho = {{ onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) }};
    return (
        <>
            {contact_content.strip()}
        </>
    );
}}
'''
with open('src/components/Contact.jsx', 'w', encoding='utf-8') as f:
    f.write(contact_jsx)

# 9. CustomCursor
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

# 10. Re-write App.jsx
app_jsx = f'''import React, {{ useState, useEffect }} from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";

import './index.css';

export default function App() {{
    const [scrolled, setScrolled] = useState(false);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {{
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }}, []);

    useEffect(() => {{
        const els = document.querySelectorAll(".reveal");
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("up")),
            {{ threshold: 0.1 }}
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }}, []);

    return (
        <>
            <CustomCursor hovering={{hovering}} />
            <Navbar scrolled={{scrolled}} hovering={{hovering}} setHovering={{setHovering}} />
            <Hero hovering={{hovering}} setHovering={{setHovering}} />
            <Marquee />
            <Skills hovering={{hovering}} setHovering={{setHovering}} />
            <Projects hovering={{hovering}} setHovering={{setHovering}} />
            <Contact hovering={{hovering}} setHovering={{setHovering}} />
        </>
    );
}}
'''
with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(app_jsx)

