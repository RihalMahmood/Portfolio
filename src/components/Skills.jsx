import { skills } from "../data";

export default function Skills({ setHovering }) {
    const ho = { onMouseEnter: () => setHovering(true), onMouseLeave: () => setHovering(false) };
    return (
        <section className="skills-section" id="skills"><div className="container" style={{ padding: "0 40px" }}>
            <div className="section-label reveal">Skills</div>
            <div className="skills-grid reveal d1">
                {skills.map(s => (
                    <div className="skill-col" key={s.cat}>
                        <h3>{s.cat}</h3>
                        <div className="skill-tags">
                            {s.items.map(tag => (
                                <span key={tag} className="skill-tag" {...ho}>{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <p className="about-blurb reveal d2">
                I thrive on solving real-world problems, turning ideas into <strong>clean, maintainable code</strong>,
                and learning through experimentation. You'll find me building side projects, diving into new tech stacks,
                or exploring what's next in the world of web development. I bring both{" "}
                <strong>engineering rigour and design sensibility</strong> to every project.
            </p>
            <a href="#" className="resume-link reveal d3" {...ho}>
                View My Resume ↗
            </a>
            <div className="stats-row">
                {[
                    { num: "10", suf: "+", lbl: "Projects Built" },
                    { num: "3", suf: ".75", lbl: "CGPA" },
                    { num: "4", suf: "+", lbl: "Years of Coding" },
                ].map((s, i) => (
                    <div key={s.lbl} className={`stat reveal d${i + 1}`}>
                        <div className="num">{s.num}<span>{s.suf}</span></div>
                        <div className="lbl">{s.lbl}</div>
                    </div>
                ))}
            </div>
        </div></section>
    );
}
