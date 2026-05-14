import { useState, useEffect, useRef } from "react";

const portfolioData = {
  name: "김윤섭",
  nameEn: "Yunseob Kim",
  role: "Computer Science Researcher",
  bio: "컴퓨터공학을 연구하며, 기술로 세상에 가치를 만들어가고 있습니다.\n데이터와 알고리즘이 만나는 곳에서 새로운 가능성을 탐구합니다.",
  email: "yunseob@example.com",
  github: "https://github.com/YunSeob",
  skills: ["Python", "React", "Machine Learning", "Data Analysis", "C++", "Node.js"],
  projects: [
    {
      title: "프로젝트 이름 1",
      desc: "프로젝트에 대한 간략한 설명을 여기에 작성하세요. 어떤 기술을 사용했고 어떤 문제를 해결했는지 서술합니다.",
      tags: ["React", "Python", "AI"],
      link: "#",
      year: "2024",
    },
    {
      title: "프로젝트 이름 2",
      desc: "프로젝트에 대한 간략한 설명을 여기에 작성하세요. 어떤 기술을 사용했고 어떤 문제를 해결했는지 서술합니다.",
      tags: ["Node.js", "MongoDB"],
      link: "#",
      year: "2024",
    },
    {
      title: "프로젝트 이름 3",
      desc: "프로젝트에 대한 간략한 설명을 여기에 작성하세요. 어떤 기술을 사용했고 어떤 문제를 해결했는지 서술합니다.",
      tags: ["C++", "Algorithm"],
      link: "#",
      year: "2023",
    },
  ],
  papers: [
    {
      title: "논문 제목을 여기에 작성하세요",
      journal: "학술지 / 학회 이름",
      year: "2024",
      authors: "김윤섭, 공동저자",
      link: "#",
    },
    {
      title: "논문 제목을 여기에 작성하세요",
      journal: "학술지 / 학회 이름",
      year: "2023",
      authors: "김윤섭, 공동저자",
      link: "#",
    },
    {
      title: "논문 제목을 여기에 작성하세요",
      journal: "학술지 / 학회 이름",
      year: "2023",
      authors: "김윤섭, 공동저자",
      link: "#",
    },
  ],
};

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["about", "projects", "papers"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) { setActive(id); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0f;
          --bg2: #111118;
          --bg3: #18181f;
          --border: rgba(255,255,255,0.07);
          --border-hover: rgba(255,255,255,0.15);
          --text: #e8e8f0;
          --text2: #9090a8;
          --text3: #5a5a72;
          --accent: #c9a96e;
          --accent2: #e8c98a;
          --accent-dim: rgba(201,169,110,0.12);
          --serif: 'Cormorant Garamond', Georgia, serif;
          --sans: 'DM Sans', sans-serif;
          --mono: 'DM Mono', monospace;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--sans);
          font-weight: 300;
          line-height: 1.7;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        ::selection { background: rgba(201,169,110,0.3); }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem;
          height: 64px;
          transition: background 0.4s, border-color 0.4s;
          border-bottom: 1px solid transparent;
        }
        nav.scrolled { background: rgba(10,10,15,0.92); backdrop-filter: blur(12px); border-color: var(--border); }

        .nav-logo {
          font-family: var(--serif);
          font-size: 1.35rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: var(--text);
          text-decoration: none;
          cursor: pointer;
        }
        .nav-logo span { color: var(--accent); }

        .nav-links { display: flex; gap: 2.5rem; align-items: center; }
        .nav-link {
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text2);
          cursor: pointer;
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute; bottom: -2px; left: 0; right: 100%;
          height: 1px; background: var(--accent);
          transition: right 0.3s ease;
        }
        .nav-link:hover, .nav-link.active { color: var(--text); }
        .nav-link:hover::after, .nav-link.active::after { right: 0; }

        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 4px; color: var(--text); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex; align-items: center;
          padding: 8rem 2.5rem 4rem;
          max-width: 1100px; margin: 0 auto;
          position: relative;
        }

        .hero-content { max-width: 680px; }

        .hero-eyebrow {
          font-family: var(--mono);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.2s forwards;
        }

        .hero-name {
          font-family: var(--serif);
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 0.3rem;
          opacity: 0;
          animation: fadeUp 0.9s ease 0.35s forwards;
        }
        .hero-name em { font-style: italic; color: var(--accent); }

        .hero-name-en {
          font-family: var(--mono);
          font-size: 0.85rem;
          color: var(--text3);
          letter-spacing: 0.1em;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: fadeUp 0.9s ease 0.5s forwards;
        }

        .hero-bio {
          font-size: 1rem;
          color: var(--text2);
          line-height: 1.9;
          white-space: pre-line;
          max-width: 520px;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeUp 0.9s ease 0.65s forwards;
        }

        .hero-actions {
          display: flex; gap: 1rem; flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.9s ease 0.8s forwards;
        }

        .btn-primary {
          padding: 0.75rem 2rem;
          background: var(--accent);
          color: #0a0a0f;
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none; cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s, transform 0.2s;
        }
        .btn-primary:hover { background: var(--accent2); transform: translateY(-2px); }

        .btn-ghost {
          padding: 0.75rem 2rem;
          background: transparent;
          color: var(--text2);
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
        }
        .btn-ghost:hover { border-color: var(--border-hover); color: var(--text); transform: translateY(-2px); }

        .hero-deco {
          position: absolute; right: 0; top: 50%;
          transform: translateY(-50%);
          width: 320px; height: 320px;
          border: 1px solid var(--border);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          animation: fadeIn 1.5s ease 1s forwards;
        }
        .hero-deco::after {
          content: '';
          position: absolute; inset: 24px;
          border: 1px solid var(--border);
          border-radius: 50%;
        }

        /* SECTIONS */
        section { padding: 7rem 2.5rem; max-width: 1100px; margin: 0 auto; }
        .section-divider { width: 100%; height: 1px; background: var(--border); max-width: 1100px; margin: 0 auto; }

        .section-label {
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: var(--serif);
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 300;
          line-height: 1.15;
          margin-bottom: 3.5rem;
          color: var(--text);
        }
        .section-title em { font-style: italic; }

        /* ABOUT */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
        .about-text { font-size: 1rem; color: var(--text2); line-height: 1.9; }
        .about-text p + p { margin-top: 1.2rem; }

        .skills-label {
          font-family: var(--mono);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text3);
          margin-bottom: 1.2rem;
          margin-top: 2.5rem;
        }
        .skills-list { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .skill-tag {
          font-family: var(--mono);
          font-size: 0.72rem;
          padding: 0.35rem 0.9rem;
          border: 1px solid var(--border);
          color: var(--text2);
          letter-spacing: 0.06em;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          cursor: default;
        }
        .skill-tag:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }

        .about-stats { display: flex; flex-direction: column; gap: 1.5rem; }
        .stat-card {
          padding: 1.8rem;
          border: 1px solid var(--border);
          background: var(--bg2);
          transition: border-color 0.3s;
        }
        .stat-card:hover { border-color: var(--border-hover); }
        .stat-number {
          font-family: var(--serif);
          font-size: 3rem;
          font-weight: 300;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 0.4rem;
        }
        .stat-desc { font-size: 0.82rem; color: var(--text3); letter-spacing: 0.05em; }

        /* PROJECTS */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5px; background: var(--border); }
        .project-card {
          background: var(--bg);
          padding: 2.5rem;
          cursor: pointer;
          transition: background 0.3s;
          position: relative;
          text-decoration: none;
          display: block;
          color: inherit;
        }
        .project-card:hover { background: var(--bg3); }
        .project-card:hover .project-arrow { transform: translate(4px, -4px); opacity: 1; }

        .project-year {
          font-family: var(--mono);
          font-size: 0.68rem;
          color: var(--text3);
          letter-spacing: 0.15em;
          margin-bottom: 1.5rem;
        }
        .project-title {
          font-family: var(--serif);
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 1rem;
          line-height: 1.3;
          color: var(--text);
        }
        .project-desc { font-size: 0.875rem; color: var(--text2); line-height: 1.8; margin-bottom: 2rem; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .project-tag {
          font-family: var(--mono);
          font-size: 0.65rem;
          padding: 0.25rem 0.7rem;
          background: var(--accent-dim);
          color: var(--accent);
          letter-spacing: 0.06em;
        }
        .project-arrow {
          position: absolute; top: 2.5rem; right: 2.5rem;
          font-size: 1.1rem; color: var(--accent);
          opacity: 0;
          transition: transform 0.25s, opacity 0.25s;
        }

        /* PAPERS */
        .papers-list { display: flex; flex-direction: column; gap: 0; }
        .paper-item {
          display: flex; align-items: baseline; gap: 2.5rem;
          padding: 2rem 0;
          border-bottom: 1px solid var(--border);
          text-decoration: none;
          color: inherit;
          transition: padding-left 0.25s;
          position: relative;
        }
        .paper-item::before {
          content: '';
          position: absolute; left: -2.5rem; top: 0; bottom: 0;
          width: 2px; background: var(--accent);
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.3s ease;
        }
        .paper-item:hover { padding-left: 1rem; }
        .paper-item:hover::before { transform: scaleY(1); }
        .paper-year {
          font-family: var(--mono);
          font-size: 0.7rem;
          color: var(--text3);
          letter-spacing: 0.12em;
          min-width: 48px;
          flex-shrink: 0;
        }
        .paper-content { flex: 1; }
        .paper-title {
          font-family: var(--serif);
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--text);
          margin-bottom: 0.4rem;
          line-height: 1.4;
          transition: color 0.2s;
        }
        .paper-item:hover .paper-title { color: var(--accent); }
        .paper-meta { font-size: 0.8rem; color: var(--text3); }
        .paper-journal { color: var(--text2); }
        .paper-arrow { font-size: 0.9rem; color: var(--text3); flex-shrink: 0; transition: color 0.2s, transform 0.2s; }
        .paper-item:hover .paper-arrow { color: var(--accent); transform: translate(4px, -4px); }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border);
          padding: 3rem 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1100px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-name {
          font-family: var(--serif);
          font-size: 1.1rem;
          color: var(--text2);
        }
        .footer-name span { color: var(--accent); }
        .footer-copy { font-size: 0.75rem; color: var(--text3); font-family: var(--mono); }
        .footer-link { color: var(--text2); text-decoration: none; font-size: 0.8rem; transition: color 0.2s; }
        .footer-link:hover { color: var(--accent); }

        /* ANIMATIONS */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          nav { padding: 0 1.5rem; }
          .nav-links { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(10,10,15,0.98); backdrop-filter: blur(12px); flex-direction: column; padding: 2rem; border-bottom: 1px solid var(--border); gap: 1.8rem; }
          .nav-links.open { display: flex; }
          .hamburger { display: block; }
          .hero { padding: 7rem 1.5rem 3rem; }
          .hero-deco { display: none; }
          section { padding: 5rem 1.5rem; }
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
          .about-stats { flex-direction: row; flex-wrap: wrap; }
          .stat-card { flex: 1; min-width: 130px; }
          .paper-item { flex-wrap: wrap; gap: 0.5rem; }
          footer { padding: 2rem 1.5rem; flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <span className="nav-logo" onClick={() => scrollTo("about")}>
          YS<span>.</span>
        </span>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["about", "projects", "papers"].map((id) => (
            <span
              key={id}
              className={`nav-link ${active === id ? "active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {id === "about" ? "소개" : id === "projects" ? "프로젝트" : "논문"}
            </span>
          ))}
          <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.5rem 1.2rem", fontSize: "0.72rem" }}>
            GitHub ↗
          </a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* HERO */}
      <section id="about" style={{ padding: "0 2.5rem" }}>
        <div className="hero" style={{ padding: "8rem 0 4rem" }}>
          <div className="hero-content">
            <div className="hero-eyebrow">Computer Science · Research · Development</div>
            <h1 className="hero-name">
              {portfolioData.name.split("").map((c, i) =>
                i === 0 ? <em key={i}>{c}</em> : c
              )}
            </h1>
            <div className="hero-name-en">{portfolioData.nameEn} — {portfolioData.role}</div>
            <p className="hero-bio">{portfolioData.bio}</p>
            <div className="hero-actions">
              <span className="btn-primary" onClick={() => scrollTo("projects")}>프로젝트 보기</span>
              <a href={`mailto:${portfolioData.email}`} className="btn-ghost">연락하기</a>
            </div>
          </div>
          <div className="hero-deco" />
        </div>

        {/* ABOUT CONTENT */}
        <FadeIn>
          <div style={{ padding: "2rem 0 5rem" }}>
            <div className="section-label">About</div>
            <h2 className="section-title">저를 <em>소개</em>합니다</h2>
            <div className="about-grid">
              <div>
                <div className="about-text">
                  <p>컴퓨터공학을 전공하며 다양한 프로젝트와 연구를 통해 성장해왔습니다. 머신러닝, 데이터 분석, 웹 개발 등 폭넓은 분야에 걸쳐 경험을 쌓고 있습니다.</p>
                  <p>새로운 기술을 빠르게 습득하고, 팀과 함께 문제를 해결하는 것을 즐깁니다. 연구와 개발 양쪽 모두에서 실질적인 가치를 만들어내는 것을 목표로 합니다.</p>
                </div>
                <div className="skills-label">Tech Stack</div>
                <div className="skills-list">
                  {portfolioData.skills.map((s) => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>
              </div>
              <div className="about-stats">
                {[
                  { n: portfolioData.projects.length + "+", d: "완료 프로젝트" },
                  { n: portfolioData.papers.length + "+", d: "게재 논문" },
                  { n: "3+", d: "년 개발 경험" },
                ].map((s) => (
                  <div key={s.d} className="stat-card">
                    <div className="stat-number">{s.n}</div>
                    <div className="stat-desc">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="section-divider" />

      {/* PROJECTS */}
      <section id="projects">
        <FadeIn>
          <div className="section-label">Projects</div>
          <h2 className="section-title">진행한 <em>프로젝트</em></h2>
        </FadeIn>
        <div className="projects-grid">
          {portfolioData.projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <a href={p.link} className="project-card" target="_blank" rel="noopener noreferrer">
                <div className="project-year">{p.year}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tags">
                  {p.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                </div>
                <span className="project-arrow">↗</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* PAPERS */}
      <section id="papers">
        <FadeIn>
          <div className="section-label">Publications</div>
          <h2 className="section-title">작성한 <em>논문</em></h2>
        </FadeIn>
        <div className="papers-list">
          {portfolioData.papers.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.08}>
              <a href={p.link} className="paper-item" target="_blank" rel="noopener noreferrer">
                <span className="paper-year">{p.year}</span>
                <div className="paper-content">
                  <div className="paper-title">{p.title}</div>
                  <div className="paper-meta">
                    <span className="paper-journal">{p.journal}</span>
                    {" · "}
                    <span>{p.authors}</span>
                  </div>
                </div>
                <span className="paper-arrow">↗</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-name">Yunseob<span>.</span></div>
        <a href={`mailto:${portfolioData.email}`} className="footer-link">{portfolioData.email}</a>
        <div className="footer-copy">© 2025 김윤섭. All rights reserved.</div>
      </footer>
    </>
  );
}
