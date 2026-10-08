import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Menu,
  X,
  Download,
  Plus,
  Minus,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePhoto from "./assets/profile.jpg";
import { profile, projects, resume } from "./data";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);
const asset = (name: string) => `${import.meta.env.BASE_URL}${name}`;
const nav = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Resume",
  "Contact",
];

function App() {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [dark, setDark] = useState(
    () => localStorage.getItem("portfolio-theme") === "dark",
  );
  const project = projects[active];

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const match = gsap.matchMedia();
    match.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-word",
          { y: 32, clipPath: "inset(0 0 80% 0)" },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            ease: "expo.out",
          },
        );
        gsap.fromTo(
          ".stage",
          { rotation: 0, y: 24 },
          { rotation: -3, y: 0, duration: 1.3, ease: "expo.out" },
        );
        gsap.utils.toArray<HTMLElement>(".work-image").forEach((image) => {
          gsap.fromTo(
            image,
            { y: 28 },
            {
              y: -16,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
      }, root);
      return () => ctx.revert();
    });
    return () => match.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.025 },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 0.65,
          ease: "expo.out",
        },
      );
    }, root);
    return () => ctx.revert();
  }, [active]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <div ref={root} className="portfolio">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a href="#home" className="wordmark">
          Sanjana<span>.dev</span>
        </a>
        <nav
          aria-label="Main navigation"
          className={menuOpen ? "navigation open" : "navigation"}
        >
          {nav.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="icon-button menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero wrap">
          <div className="hero-copy">
            <h1 className="hero-word">
              SANJANA<span className="name-period">.</span>
            </h1>
            <p className="role">
              Front-end developer.
              <br />
              Interfaces, brought to life.
            </p>
            <p className="hero-description">
              I build responsive web experiences with React, TypeScript and a
              close eye for the details.
            </p>
            <a className="primary-link" href="#projects">
              Explore my work <ArrowUpRight size={22} />
            </a>
          </div>
          <div className="hero-art">
            <div className="stage">
              <div className="stage-top">
                <span>{project.category}</span>
                <span className="frame-count">
                  {String(active + 1).padStart(2, "0")} / 03
                </span>
              </div>
              <div className="stage-image">
                <img
                  ref={frame}
                  key={project.title}
                  src={asset(project.image)}
                  alt={`${project.title} interface mockup`}
                  fetchPriority="high"
                />
              </div>
              <div className="stage-bottom">
                <span>{project.title}</span>
                <a
                  href={`#project-${active}`}
                  aria-label={`Read about ${project.title}`}
                >
                  <ArrowUpRight size={23} />
                </a>
              </div>
            </div>
            <div className="frame-controls">
              <button
                className="icon-button"
                aria-label="Previous project"
                onClick={() => setActive((active + 2) % 3)}
              >
                <ChevronLeft size={21} />
              </button>
              <p aria-live="polite">{project.title}</p>
              <button
                className="icon-button"
                aria-label="Next project"
                onClick={() => setActive((active + 1) % 3)}
              >
                <ChevronRight size={21} />
              </button>
            </div>
          </div>
          <div className="storyboard" aria-label="Choose a featured project">
            {projects.map((item, index) => (
              <button
                key={item.title}
                className={`frame-selector ${active === index ? "selected" : ""}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <span className="thumbnail">
                  <img src={asset(item.image)} alt="" />
                </span>
                <span className="selector-copy">
                  <strong>{item.title}</strong>
                  <span>{item.category}</span>
                </span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
        </section>

        <section id="projects" className="work-section wrap">
          <div className="section-title">
            <h2>
              Built for
              <br />
              <span>the browser.</span>
            </h2>
            <p>
              Three projects. Different problems.
              <br />
              One focus on the experience.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((item, index) => (
              <article
                id={`project-${index}`}
                className={`project project-${index}`}
                key={item.title}
              >
                <button
                  className="project-visual"
                  onClick={() => setExpanded(expanded === index ? null : index)}
                  aria-label={`${expanded === index ? "Hide" : "Show"} ${item.title} details`}
                  aria-expanded={expanded === index}
                  aria-controls={`details-${index}`}
                >
                  <img
                    className="work-image"
                    src={asset(item.image)}
                    alt={`${item.title} project mockup`}
                    loading="lazy"
                  />
                  <span className="visual-action">
                    <ArrowUpRight size={26} />
                  </span>
                </button>
                <div className="project-heading">
                  <h3>{item.title}</h3>
                  <span>{item.category}</span>
                </div>
                <p>{item.description}</p>
                <div className="tech-list">
                  {item.stack.slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <button
                  className="details-toggle"
                  aria-expanded={expanded === index}
                  aria-controls={`details-${index}`}
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  Project details{" "}
                  {expanded === index ? (
                    <Minus size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </button>
                <div
                  id={`details-${index}`}
                  hidden={expanded !== index}
                  className="project-details"
                >
                  <h4>Inside the project</h4>
                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <p className="project-note">
                    Project mockup shown. Live demo and source links will be
                    added when available.
                  </p>
                  {item.demo && (
                    <a href={item.demo}>
                      Open live demo <ArrowUpRight size={16} />
                    </a>
                  )}
                  {item.repository && (
                    <a href={item.repository}>
                      View source <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about-section wrap">
          <div className="portrait">
            <img src={profilePhoto} alt="Sanjana" loading="lazy" />
          </div>
          <div className="about-copy">
            <h2>
              The person
              <br />
              behind the pixels.
            </h2>
            <p>
              I’m Sanjana, a front-end developer with around two years of
              experience turning designs into responsive web applications.
            </p>
            <p>
              I enjoy solving visual and stateful problems in the browser, from
              translating Figma layouts to building reusable components that
              make the next screen easier to create.
            </p>
            <a className="text-link" href="#experience">
              My experience <ArrowRight size={19} />
            </a>
          </div>
        </section>

        <section id="skills" className="skills-section wrap">
          <h2>
            My everyday
            <br />
            building blocks.
          </h2>
          <div className="skill-columns">
            <div>
              <h3>Interface</h3>
              <p>
                React.js
                <br />
                TypeScript
                <br />
                JavaScript
                <br />
                HTML5 & CSS3
              </p>
            </div>
            <div>
              <h3>Systems</h3>
              <p>
                Material UI
                <br />
                Tailwind CSS
                <br />
                Reusable components
                <br />
                Responsive layouts
              </p>
            </div>
            <div>
              <h3>Connections</h3>
              <p>
                REST APIs & Axios
                <br />
                Redux & Context API
                <br />
                Git
                <br />
                Figma to code
              </p>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section wrap">
          <h2>
            Where I’ve
            <br />
            put it to work.
          </h2>
          <div className="experience-body">
            <div className="job-header">
              <div>
                <h3>{profile.company}</h3>
                <p>{profile.role}</p>
              </div>
              <span>{profile.period}</span>
            </div>
            <ul>
              <li>Translate UI/UX designs into responsive React interfaces.</li>
              <li>Build and document reusable components.</li>
              <li>
                Connect REST APIs with consistent loading and error handling.
              </li>
              <li>
                Work with designers on layouts, transitions and frontend
                performance.
              </li>
            </ul>
          </div>
        </section>

        <section id="resume" className="resume-section wrap">
          <div>
            <h2>
              A closer look
              <br />
              at my background.
            </h2>
            <p>
              Experience, technical skills and selected projects in one place.
            </p>
          </div>
          <div className="resume-actions">
            <a
              className="primary-link"
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(resume)}`}
              download="Sanjana-Resume.txt"
            >
              Download resume <Download size={20} />
            </a>
            <button
              className="text-link"
              onClick={() => setResumeOpen(!resumeOpen)}
              aria-expanded={resumeOpen}
              aria-controls="resume-preview"
            >
              {resumeOpen ? "Close" : "Read"} resume{" "}
              {resumeOpen ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            <span className="file-type">Text document</span>
          </div>
          <div
            id="resume-preview"
            className="resume-preview"
            hidden={!resumeOpen}
          >
            <pre>{resume}</pre>
            <button className="text-link" onClick={() => window.print()}>
              Print / save as PDF <ArrowUpRight size={18} />
            </button>
          </div>
        </section>

        <section id="contact" className="contact-section wrap">
          <h2>
            Good interfaces
            <br />
            start with a<br />
            <span>conversation.</span>
          </h2>
          <div className="contact-content">
            <p>
              Have an interesting front-end challenge?
              <br />
              I’d love to hear about it.
            </p>
            {profile.email ? (
              <a className="primary-link" href={`mailto:${profile.email}`}>
                Email Sanjana <ArrowUpRight size={22} />
              </a>
            ) : (
              <p className="contact-pending">Contact details coming soon.</p>
            )}
            <a className="text-link" href="#resume">
              Read my background <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer wrap">
        <a className="wordmark" href="#home">
          Sanjana<span>.dev</span>
        </a>
        <p>© {new Date().getFullYear()} Sanjana</p>
        <a className="text-link" href="#home">
          Back to top <ArrowUpRight size={17} />
        </a>
      </footer>
    </div>
  );
}

export default App;
