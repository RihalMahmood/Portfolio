/* ─── DATA ──────────────────────────────────────────────────── */
export const skills = [
    { cat: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "HTML & CSS", "Framer Motion"] },
    { cat: "Backend & DB", items: ["Node.js", "Express.js", "Python", "Django", "PostgreSQL", "MongoDB"] },
    { cat: "Tools & Cloud", items: ["Git & GitHub", "Docker", "AWS", "Linux", "Figma", "Postman"] },
];
export const projects = [
    {
        id: "01", wide: true, emoji: "🔗", bg: "#0e1520",
        title: "DevConnect", tag: "Full Stack · Featured",
        desc: "A GitHub-style developer social network — follow devs, showcase repos, post updates, and collaborate. Built with a real-time notification system using WebSockets.",
        techs: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
    },
    {
        id: "02", emoji: "🧠", bg: "#0e1a12",
        title: "AlgoViz",
        desc: "Interactive step-by-step visualizer for classic algorithms — sorting, pathfinding, tree traversal. Used by 400+ students.",
        techs: ["React", "Canvas API", "TypeScript"],
    },
    {
        id: "03", emoji: "🛒", bg: "#1a0e14",
        title: "ShopSense",
        desc: "ML-powered e-commerce engine with product recommendations, sentiment analysis on reviews, and real-time inventory forecasting.",
        techs: ["Python", "FastAPI", "scikit-learn", "Redis"],
    },
    {
        id: "04", emoji: "💬", bg: "#12100e",
        title: "ChatDocs",
        desc: "RAG-based chat interface for querying PDFs, docs and knowledge bases. Supports multi-document sessions with source attribution.",
        techs: ["LangChain", "OpenAI API", "Next.js", "Pinecone"],
    },
];
export const contacts = [
    { icon: "E", label: "Email", val: "quazi.rihal@gmail.com", href: "mailto:quazi.rihal@gmail.com" },
    { icon: "GH", label: "GitHub", val: "github.com/quazirihal", href: "#" },
    { icon: "LI", label: "LinkedIn", val: "linkedin.com/in/quazirihal", href: "#" },
];

