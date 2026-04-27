import re

with open('Dummy.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace colors
content = re.sub(r'--bg:\s*#0c0c0e;', '--bg:       #000000;', content)
content = re.sub(r'--surface:\s*#141417;', '--surface:  #111111;', content)
content = re.sub(r'--text:\s*#f0ede8;', '--text:     #e3dffe;', content)
content = re.sub(r'--muted:\s*#6b6b72;', '--muted:    #dfbec6;', content)
content = re.sub(r'--accent:\s*#7fff6b;', '--accent:   #EA4C89;', content)

# Replace name
content = content.replace('Alex Rahman', 'Quazi Rihal Mahmood')
content = content.replace('Alex<br /><span>Rahman</span>', 'Quazi Rihal<br /><span>Mahmood</span>')
content = content.replace('alex.rahman.dev@gmail.com', 'quazi.rihal@gmail.com')
content = content.replace('alex.rahman', 'QRM.')
content = content.replace('alexrahman', 'quazirihal')
content = content.replace('ALEX RAHMAN', 'QUAZI RIHAL MAHMOOD')

# Insert SVG into Hero
svg_code = """
                <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
                    <path d="M -100 200 Q 300 500 500 -100" stroke="rgba(255,255,255,0.05)" fill="transparent" strokeWidth="1" />
                    <circle r="2" fill="var(--accent)">
                        <animateMotion dur="12s" repeatCount="indefinite" path="M -100 200 Q 300 500 500 -100" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
                    </circle>
                </svg>
"""

content = content.replace('<section className="hero">', f'<section className="hero">\n{svg_code}')

# Rename Portfolio to App
content = content.replace('export default function Portfolio', 'export default function App')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
