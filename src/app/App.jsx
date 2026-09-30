import { useMemo, useState } from "react";

const base = import.meta.env.BASE_URL;
const resumeUrl = `${base}Vivek-Kushwaha-Resume.pdf`;

const skillGroups = [
  { category: "Backend", skills: ["Node.js", "PHP", "Laravel", "Express", "TypeScript"] },
  { category: "Frontend", skills: ["React", "JavaScript", "HTML / CSS"] },
  { category: "Database", skills: ["MySQL", "SQL", "MongoDB", "Redis"] },
  { category: "DevOps", skills: ["AWS", "Docker", "NGINX", "CI / CD"] },
  { category: "Tools", skills: ["Git / GitHub", "Postman", "Swagger", "PHPUnit"] },
];

const skillMarks = {
  "Node.js": "JS", PHP: "php", Laravel: "L", Express: "EX", TypeScript: "TS",
  React: "⚛", JavaScript: "JS", "HTML / CSS": "<>", MySQL: "SQL", SQL: "DB",
  MongoDB: "◉", Redis: "R", AWS: "aws", Docker: "▦", NGINX: "N", "CI / CD": "↻",
  "Git / GitHub": "⌘", Postman: "P", Swagger: "↗", PHPUnit: "✓",
};

const projects = [
  {
    id: "debt",
    title: "Debt operations platform",
    type: "SaaS · Payments · Compliance",
    description: "Connected agent workflows, payment events, compliance checks, and AI-assisted calling for a debt operations product.",
    tags: ["Laravel", "Node.js", "MySQL", "Webhooks"],
    result: "30% less processing time",
    kind: "operations",
    breakdown: "Built product workflows across APIs and UI, integrating payments and VoIP through webhooks. The focus was on clear state transitions, traceable outcomes, and reducing manual processing for teams using the platform.",
    contribution: "Backend APIs, integration workflows, product UI collaboration",
  },
  {
    id: "realtime",
    title: "Real-time chat & notifications",
    type: "Messaging · Live updates",
    description: "A real-time event path for live messaging and notifications, designed to keep updates responsive as usage grew.",
    tags: ["Node.js", "Socket.io", "Redis", "Queues"],
    result: "45% higher throughput",
    kind: "messaging",
    breakdown: "Separated event handling from client delivery with queues and Redis-backed fan-out. WebSockets carried live updates to clients while background work stayed off the request path.",
    contribution: "Event flow design, WebSocket delivery, performance tuning",
  },
  {
    id: "crm",
    title: "CRM workflow automation",
    type: "CRM · Access control · Automation",
    description: "Configurable business workflows, automation rules, and notifications that reduced repeated setup work.",
    tags: ["Laravel", "MySQL", "Redis", "REST API"],
    result: "40% less setup time",
    kind: "workflow",
    breakdown: "Structured reusable workflow rules with access control and notification triggers so teams could adapt common processes without rebuilding each flow from scratch.",
    contribution: "Workflow modules, API contracts, data model, team delivery",
  },
];

const notes = [
  {
    number: "01",
    title: "Making large reports feel fast",
    topic: "DATABASES · PERFORMANCE",
    summary: "Start with the query path users wait on, then measure the change where it matters.",
    detail: "For reporting over 10M+ records, query rewrites and indexing cut response times on high-traffic endpoints by about 20%. The practical lesson: inspect the actual filters and joins first, use query plans to find the expensive work, and measure the same endpoint before and after.",
  },
  {
    number: "02",
    title: "Keep real-time work off the request path",
    topic: "EVENTS · RELIABILITY",
    summary: "Queues and clear event boundaries help live features scale without slowing core actions.",
    detail: "A user action should finish its critical work predictably. Queueing follow-up tasks and publishing events separately gives each part room to retry, scale, and fail without holding the original request open.",
  },
  {
    number: "03",
    title: "Treat integrations as product flows",
    topic: "APIS · WEBHOOKS",
    summary: "Payments and third-party services need explicit states, retries, and useful visibility.",
    detail: "Document the lifecycle from request to callback, make repeated events safe to process, and keep enough context to resolve failures. That turns a fragile point-to-point connection into a workflow a support team can understand.",
  },
];

const approaches = [
  { icon: "✳", title: "Problem solver", text: "Break complex product needs into clear, scalable steps." },
  { icon: "▤", title: "Production experience", text: "Build with traffic, data growth, and operations in mind." },
  { icon: "</>", title: "Clean & scalable code", text: "Use explicit boundaries and maintainable patterns." },
  { icon: "◎", title: "Team collaboration", text: "Work closely with product, design, QA, and engineering." },
];

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

function ProjectPreview({ kind }) {
  if (kind === "operations") {
    return <div className="preview-ui ops-preview" aria-hidden="true"><div className="preview-sidebar"><b>V</b><i /><i /><i /><i /></div><div className="preview-main"><div className="preview-topline"><span>Accounts overview</span><b>•••</b></div><div className="preview-stats"><i /><i /><i /></div><div className="preview-table"><b>Recent accounts</b>{[0, 1, 2].map((row) => <i key={row}><em /><span /><small /></i>)}</div></div></div>;
  }
  if (kind === "messaging") {
    return <div className="preview-ui chat-preview" aria-hidden="true"><div className="chat-rail"><b>W</b><i /><i /><i /><i /></div><div className="chat-list"><b>Workspace</b>{[0, 1, 2, 3].map((row) => <i key={row}><em /><span /><small /></i>)}</div><div className="chat-room"><b># product-team</b>{[0, 1, 2].map((row) => <i key={row}><em /><span /><small /></i>)}<div className="chat-compose" /></div></div>;
  }
  return <div className="preview-ui analytics-preview" aria-hidden="true"><div className="analytics-head"><span>Performance dashboard</span><b>Last 30 days⌄</b></div><div className="analytics-kpis"><i /><i /><i /></div><div className="analytics-bottom"><div className="bar-chart">{[22, 36, 30, 56, 43, 70, 48, 86, 63, 100, 78, 90].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="donut-chart" /></div></div>;
}

function App() {
  const [skillFilter, setSkillFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [lightMode, setLightMode] = useState(false);
  const allSkills = useMemo(() => skillGroups.flatMap((group) => group.skills.map((skill) => ({ skill, category: group.category }))), []);
  const visibleSkills = skillFilter === "All" ? allSkills : allSkills.filter((item) => item.category === skillFilter);

  return (
    <div className={`portfolio ${lightMode ? "light-mode" : ""}`} id="top">
      <header className="topbar wrap">
        <a href="#top" className="brand" aria-label="Vivek Kushwaha home"><span className="brand-symbol">V</span><span>Vivek Kushwaha</span></a>
        <nav className="topnav" aria-label="Main navigation"><a className="current" href="#top">Home</a><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#notes">Blog</a><a href="#contact">Contact</a></nav>
        <div className="header-actions"><button className="theme-toggle" type="button" onClick={() => setLightMode((value) => !value)} aria-label={`Switch to ${lightMode ? "dark" : "light"} theme`}>{lightMode ? "☀" : "☾"}</button><a className="button button-gradient resume-top" href={resumeUrl} target="_blank" rel="noreferrer">Download Resume <span aria-hidden="true">⬇</span></a></div>
      </header>

      <main>
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-art"><img src={`${base}workstation-hero.png`} alt="Engineer working at a multi-monitor desk in a dark blue-lit workspace" /><div className="hero-art-fade" /></div>
          <div className="hero-copy">
            <div className="availability"><i /> Open to Opportunities</div>
            <h1 id="hero-title">Senior Backend /<br /><span className="gradient-text">Full-Stack Engineer</span></h1>
            <p>I build scalable backend systems, APIs, and production-ready applications that solve real business problems.</p>
            <div className="quick-stack"><span><b className="stack-green">◉</b> Node.js</span><span><b className="stack-pink">◆</b> PHP / Laravel</span><span><b className="stack-blue">▣</b> MySQL</span><span><b className="stack-cyan">◈</b> WebSockets</span><span><b className="stack-green">●</b> Redis</span><span><b className="stack-orange">◉</b> AWS</span><span><b className="stack-blue">▦</b> Docker</span><span><b className="stack-cyan">⚛</b> React</span></div>
            <div className="hero-buttons"><a className="button button-gradient" href="#projects">View My Work <Arrow /></a><a className="button button-outline" href={resumeUrl} target="_blank" rel="noreferrer">Download Resume <span aria-hidden="true">⬇</span></a></div>
          </div>
          <div className="hero-float skill-float"><span className="float-orb cyan-orb">✦</span><span>Design</span><span>Develop</span><span>Deploy</span><span>Scale</span></div>
          <div className="hero-float years-float"><span className="float-orb gold-orb">▣</span><span><b>5+ Years</b><small>Professional Experience</small></span></div>
          <div className="hero-caption">BUILDING SYSTEMS THAT SERVE REAL PEOPLE <span>·</span> JHANSI, INDIA</div>
        </section>

        <section className="metrics wrap" aria-label="Career highlights">
          <div><span className="metric-icon amber">✿</span><strong>5+</strong><small>Years Experience</small></div><div><span className="metric-icon violet">◉</span><strong>100+</strong><small>APIs Built</small></div><div><span className="metric-icon green">▧</span><strong>10M+</strong><small>Records Handled</small></div><div><span className="metric-icon cyan">♧</span><strong>500+</strong><small>Users Supported</small></div><div><span className="metric-icon blue">◴</span><strong>~20%</strong><small>Faster Key Endpoints</small></div>
        </section>

        <section className="about-section wrap section-block" id="about">
          <div className="about-copy"><p className="section-kicker"><span>✣</span> ABOUT ME</p><h2>Engineering solutions for a better digital world.</h2><p>I’m a Backend / Full-Stack Engineer with 5+ years of experience building SaaS and CRM products. I enjoy solving complex problems, optimizing performance, and working with teams to ship software that makes a real impact.</p><a href="#experience" className="button button-gradient">More About Me <Arrow /></a></div>
          <div className="approach-grid">{approaches.map((item) => <article className="approach-card" key={item.title}><span className="approach-icon">{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </section>

        <section className="skills-section wrap section-block" id="skills">
          <div className="section-heading"><div><p className="section-kicker">MY SKILLS</p><h2>Technologies I work with</h2></div><div className="skill-filters" role="group" aria-label="Filter skills by category">{["All", ...skillGroups.map((group) => group.category)].map((category) => <button type="button" key={category} className={skillFilter === category ? "selected" : ""} onClick={() => setSkillFilter(category)}>{category}</button>)}</div></div>
          <div className="skill-grid" aria-live="polite">{visibleSkills.map(({ skill, category }) => <div className="skill-tile" key={skill}><span className={`skill-mark mark-${skill.replace(/[^a-z]/gi, "").toLowerCase()}`}>{skillMarks[skill]}</span><small>{skill}</small><span className="skill-category">{category}</span></div>)}</div>
        </section>

        <section className="projects-section wrap section-block" id="projects">
          <div className="section-heading"><div><p className="section-kicker"><span>✣</span> FEATURED PROJECTS</p><h2>Selected systems I’ve helped ship</h2></div><span className="section-side-note">WORK DETAILS GENERALIZED<br />FOR CONFIDENTIALITY</span></div>
          <div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.id}><div className="project-preview"><ProjectPreview kind={project.kind} /><span className="preview-index">0{index + 1}</span>{index === 0 && <span className="featured-tag">Featured</span>}</div><div className="project-body"><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="project-result"><span>OUTCOME</span><b>{project.result}</b></div><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-actions"><button type="button" onClick={() => setActiveProject(project)}>Build notes <Arrow /></button><a href="#architecture">Architecture <span>⌘</span></a></div></div></article>)}</div>
        </section>

        <section className="architecture-section wrap section-block" id="architecture">
          <div className="section-heading"><div><p className="section-kicker"><span>✣</span> ARCHITECTURE</p><h2>System design & architecture</h2></div><p className="section-side-note">A practical view of how<br />the pieces work together.</p></div>
          <div className="architecture-layout">
            <div className="architecture-flow">
              <div className="flow-node client-node"><span className="node-symbol">▣</span><b>Client</b><small>Web / Mobile</small></div><span className="flow-arrow">⟶</span><div className="flow-node"><span className="node-symbol nginx">N</span><b>Load Balancer</b><small>NGINX</small></div><span className="flow-arrow">⟶</span><div className="flow-node app-node"><span className="node-symbol node-stack"><i>JS</i><i>PHP</i></span><b>App Services</b><small>Node.js / Laravel</small></div>
              <div className="flow-branches"><div><span className="branch-line" /><span className="node-symbol redis-mark">R</span><b>Redis</b><small>Cache & queues</small></div><div><span className="branch-line" /><span className="node-symbol database-mark">▤</span><b>Database</b><small>MySQL / SQL</small></div><div><span className="branch-line" /><span className="node-symbol cloud-mark">☁</span><b>Integrations</b><small>Payments / VoIP / CMS</small></div></div>
            </div>
            <aside className="architecture-highlights"><h3>Key highlights</h3>{["Scalable service boundaries", "Redis caching and queues", "Indexed SQL for reporting", "Webhook driven integrations", "Docker and CI/CD", "Monitoring and logging"].map((item) => <p key={item}><span>✓</span>{item}</p>)}</aside>
          </div>
        </section>

        <section className="experience-section wrap section-block" id="experience">
          <div className="section-heading"><div><p className="section-kicker"><span>✣</span> EXPERIENCE</p><h2>My professional journey</h2></div><p className="section-side-note">LEARNING BY BUILDING<br />AND SHIPPING.</p></div>
          <div className="experience-grid">
            <article className="experience-card"><span className="timeline-dot" /><p className="experience-date">JAN 2023 — JUL 2026</p><h3>Software Developer</h3><p className="experience-company">TotalAI Systems</p><ul><li>Shipped 100+ production REST APIs across SaaS, CRM, and debt products.</li><li>Improved high-traffic endpoint response times by about 20%.</li><li>Led a three-developer reporting effort over 10M+ records.</li></ul><div className="experience-tags"><span>Laravel</span><span>Node.js</span><span>AWS</span><span>Redis</span></div></article>
            <article className="experience-card"><span className="timeline-dot secondary-dot" /><p className="experience-date">AUG 2020 — DEC 2022</p><h3>PHP Developer</h3><p className="experience-company">Binplus Technology Pvt. Ltd.</p><ul><li>Led three developers building 20+ Laravel and CodeIgniter modules.</li><li>Reduced report export time by 10%.</li><li>Defined API contracts with frontend teams, speeding feature delivery by 25%.</li></ul><div className="experience-tags"><span>PHP</span><span>Laravel</span><span>CodeIgniter</span><span>MySQL</span></div></article>
            <aside className="education-card"><p className="section-kicker">EDUCATION</p><h3>B.E. Computer Science & Engineering</h3><p>Shri Rawat Pura Sarkar Institute of Science & Technology</p><span>2016—2020 <i>·</i> 8.3 / 10</span></aside>
          </div>
        </section>

        <section className="notes-section wrap section-block" id="notes">
          <div className="section-heading"><div><p className="section-kicker"><span>✣</span> ENGINEERING NOTES</p><h2>Small lessons from production work</h2></div><span className="section-side-note">PRACTICAL PLAYBOOKS<br />BUILT FROM EXPERIENCE</span></div>
          <div className="notes-grid">{notes.map((note) => <details className="note-card" key={note.number}><summary><span className="note-number">{note.number}</span><span className="note-content"><small>{note.topic}</small><strong>{note.title}</strong><span>{note.summary}</span></span><span className="note-plus">+</span></summary><p className="note-detail">{note.detail}</p></details>)}</div>
        </section>

        <section className="contact-section wrap" id="contact"><div className="contact-copy"><p className="section-kicker">LET’S WORK TOGETHER</p><h2>Have a project in mind?</h2><p>I’m open to remote opportunities and collaborations on backend, full stack, and product engineering.</p><a className="button button-gradient contact-talk" href="mailto:kushwahavivek05@gmail.com">Let’s Talk <Arrow /></a></div><div className="contact-details" aria-label="Contact details"><a href="mailto:kushwahavivek05@gmail.com"><span>Email</span><strong>kushwahavivek05@gmail.com</strong><Arrow diagonal /></a><a href="tel:+919506232341"><span>Phone</span><strong>+91 95062 32341</strong><Arrow diagonal /></a><div><span>Location</span><strong>Jhansi, India · Open to remote</strong></div><div className="contact-profiles"><span>Profiles</span><strong><a href="https://linkedin.com/in/vivek-kushwaha-147032147" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a><a href="https://github.com/kushvivek05" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a></strong></div></div></section>
      </main>

      <footer className="footer wrap"><a href="#top" className="brand"><span className="brand-symbol">V</span><span><b>Vivek Kushwaha</b><small>Senior Backend / Full-Stack Engineer</small></span></a><nav aria-label="Footer navigation"><a href="#about">About</a><a href="#projects">Projects</a><a href="#notes">Blog</a><a href="#contact">Contact</a></nav><div className="social-links"><a href="https://github.com/kushvivek05" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a><a href="https://linkedin.com/in/vivek-kushwaha-147032147" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="mailto:kushwahavivek05@gmail.com" aria-label="Email">✉</a></div><p>© 2026 Vivek Kushwaha</p></footer>

      {activeProject && <div className="modal-backdrop" role="presentation" onClick={() => setActiveProject(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" aria-label="Close build notes" onClick={() => setActiveProject(null)}>×</button><p className="section-kicker">PROJECT BREAKDOWN <span> / {activeProject.type}</span></p><h2 id="modal-title">{activeProject.title}</h2><p>{activeProject.breakdown}</p><div className="modal-contribution"><span>MY CONTRIBUTION</span><strong>{activeProject.contribution}</strong></div><div className="project-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section></div>}
    </div>
  );
}

export default App;
