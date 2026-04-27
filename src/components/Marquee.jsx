const coreStacks = ["JavaScript", "TypeScript", "Java", "C", "C++", "Python", "HTML", "CSS", "Node.js", "React", "TailwindCSS", "Git", "Vercel", "Docker", "Next.js", "PHP"];

const devicons = { 'JavaScript': 'javascript/javascript-original.svg', 'TypeScript': 'typescript/typescript-original.svg', 'Java': 'java/java-original.svg', 'C': 'c/c-original.svg', 'C++': 'cplusplus/cplusplus-original.svg', 'Python': 'python/python-original.svg', 'HTML': 'html5/html5-original.svg', 'CSS': 'css3/css3-original.svg', 'Node.js': 'nodejs/nodejs-original.svg', 'React': 'react/react-original.svg', 'TailwindCSS': 'tailwindcss/tailwindcss-original.svg', 'Git': 'git/git-original.svg', 'Vercel': 'vercel/vercel-original.svg', 'Docker': 'docker/docker-original.svg', 'Next.js': 'nextjs/nextjs-original.svg', 'PHP': 'php/php-original.svg' };

const marqueeItems = coreStacks.map((stack, i) => (
    <span key={i} className={`marquee-item ${i % 2 === 0 ? "filled" : ""}`} style={{ padding: "0 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${devicons[stack]}`} alt={stack} style={{ width: "32px", height: "32px", filter: "grayscale(100%) brightness(200%)" }} />
        {stack}
    </span>
));

export default function Marquee() {
    return (
        <section className="marquee-section">
            <div className="container">
                <div className="section-label marquee-label">Core Stack</div>
            </div>
            <div className="marquee-wrap">
                <div className="marquee-track">
                    {marqueeItems}{marqueeItems}
                </div>
            </div>
        </section>
    );
}
