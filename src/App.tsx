import { useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, Download } from 'lucide-react'
import { profile, navigation, responsibilities, projects, resumeDownload } from './data'
import { MotionProvider } from './motion/MotionProvider'
import { useExhibitionMotion } from './motion/useExhibitionMotion'
import { Action } from './components/Action'
import { Header } from './components/Header'
import { Overlay } from './components/Overlay'
import { ProjectChapter } from './components/ProjectChapter'
import { ProjectDetail, ResumeActions, ResumeDetail, ResumePaper } from './components/Details'
import { Skills } from './components/Skills'
import { CursorHint } from './components/CursorHint'
import { InterfaceSculpture } from './scenes/InterfaceSculpture'
import { SharedGeometry } from './scenes/MorphBridge'
import portrait from './assets/profile.jpg'
import '@fontsource/barlow-condensed/latin-700.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import './App.css'
type Panel = { kind: 'menu' } | { kind: 'resume' } | { kind: 'project'; index: number } | null
function Exhibition() {
  const root = useRef<HTMLDivElement>(null)
  const [panel, setPanel] = useState<Panel>(null)
  const [menuCurrent, setMenuCurrent] = useState('projects')
  const [returnTarget, setReturnTarget] = useState<HTMLElement | null>(null)
  useExhibitionMotion(root)
  const open = (next: Panel) => { if (next?.kind === 'menu') { const id = document.querySelector('.desktop-nav a[aria-current]')?.getAttribute('href')?.slice(1) || location.hash.slice(1); setMenuCurrent(navigation.some(item => item.id === id) ? id : 'projects') }; setReturnTarget(document.activeElement instanceof HTMLElement ? document.activeElement : null); setPanel(next) }
  const close = () => setPanel(null)
  return <div className="exhibition" ref={root}>
    <a className="skip-link" href="#main-content">Skip to portfolio content</a>
    <Header onMenu={() => open({ kind: 'menu' })} onResume={() => open({ kind: 'resume' })} />
    <main id="main-content" tabIndex={-1}>
      <section className="arrival chapter" id="home" aria-labelledby="hero-title"><div className="arrival-meta mono"><span>PORTFOLIO / THE INTERFACE EXPERIMENT</span><span>REACT + TYPESCRIPT</span></div><div className="hero-layout"><div className="hero-copy"><span className="chapter-label mono">CHAPTER 00 / THE ARRIVAL</span><h1 id="hero-title" className="hero-title"><span className="masked-line"><span>SANJANA.</span></span><span className="masked-line hero-role"><span>FRONT-END DEVELOPER.</span></span></h1><p className="hero-statement">INTERFACES SHOULDN’T JUST WORK.<br />THEY SHOULD FEEL ALIVE.</p><p className="hero-description">I build responsive web experiences with React, TypeScript and a close eye for the details.</p><div className="hero-actions"><Action primary href="#projects">Explore selected work</Action><Action href="#about">About me</Action></div><p className="interaction-invitation mono">Move. Explore. Make something happen.</p></div><InterfaceSculpture /></div></section>
      <section id="projects" className="work-gallery" aria-labelledby="work-title"><div className="chapter-inner work-heading"><div data-reveal><span className="chapter-label mono">CHAPTER 01 / THE WORK GALLERY</span><h2 id="work-title">THREE PROJECTS.<br />THREE DIFFERENT PROBLEMS.</h2></div><p>Publishing, ticketing and recruitment.<br />Three ways to turn information into an interface.</p></div>{projects.map((project, index) => <ProjectChapter key={project.title} index={index} onDetails={index => open({ kind: 'project', index })} />)}</section>
      <section className="chapter about paper-chapter" id="about" aria-labelledby="about-title"><div className="chapter-inner"><span className="chapter-label mono">CHAPTER 02 / THE HUMAN BEHIND THE INTERFACE</span><div className="about-layout"><div className="portrait-wrap"><div className="portrait-brackets" aria-hidden="true" /><img src={portrait} alt="Sanjana, front-end developer" width="768" height="1024" loading="lazy" /><div className="portrait-caption mono"><span>SANJANA / PORTRAIT</span><span>DESIGN INTO CODE</span></div></div><div className="about-copy" data-reveal><h2 id="about-title">THERE’S A HUMAN<br />BEHIND EVERY PIXEL.</h2><blockquote>I’m Sanjana, a front-end developer with around two years of experience turning designs into responsive web applications.</blockquote><p>I enjoy translating thoughtful designs into interfaces that are intuitive, reusable and carefully built.</p><p>My work brings together React, TypeScript and the details between a design file and a usable screen.</p><a className="text-link" href="#skills">Explore my creative toolbox<ArrowUpRight size={18} /></a></div></div></div></section>
      <Skills />
      <section className="chapter experience" id="experience" aria-labelledby="experience-title"><div className="chapter-inner"><div className="section-heading" data-reveal><span className="chapter-label mono">CHAPTER 04 / PROFESSIONAL EXPERIENCE</span><h2 id="experience-title">FROM DESIGN FILES TO EXPERIENCES<br />PEOPLE CAN USE.</h2></div><div className="experience-blueprint"><div className="blueprint-line" aria-hidden="true" /><div className="job-heading"><div><span className="mono">COMPANY</span><h3>{profile.company}</h3></div><div><span className="mono">ROLE</span><p>{profile.role}</p></div><div><span className="mono">PERIOD</span><p>{profile.period}</p></div></div><div className="responsibilities">{responsibilities.map((item, index) => <div key={item.title} data-reveal><span className="responsibility-number mono">0{index + 1}</span><div><h4>{item.title}</h4><p>{item.text}</p></div></div>)}</div><a className="text-link" href="#resume">Read the details<ArrowRight size={16} /></a></div></div></section>
      <section className="chapter resume-section paper-chapter" id="resume" aria-labelledby="resume-title"><div className="chapter-inner"><div className="resume-heading"><div data-reveal><span className="chapter-label mono">CHAPTER 05 / RESUME</span><h2 id="resume-title">THE DETAILS BEHIND THE WORK.</h2></div><ResumeActions onRead={() => open({ kind: 'resume' })} /></div><ResumePaper /><p className="resume-format mono">Download is a text document. Open the preview to print or save as PDF.</p></div></section>
      <section className="chapter contact" id="contact" aria-labelledby="contact-title"><div className="chapter-inner"><span className="chapter-label mono">CHAPTER 06 / THE NEXT INTERFACE</span><div className="finale-layout"><div className="finale-copy" data-reveal><h2 id="contact-title">LET’S MAKE THE<br />NEXT INTERFACE<br />UNFORGETTABLE.</h2><p className="finale-message">Have an interesting front-end challenge?<br />I’d love to hear about it.</p><div className="contact-state"><span className="contact-indicator" aria-hidden="true" /><div><strong>{profile.email ? 'Get in touch' : 'Contact details pending'}</strong><p>{profile.email ? 'Have a project or role in mind?' : 'Contact details are being updated. You can read or download my resume.'}</p>{profile.email && <a href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={17} /></a>}</div></div><ResumeActions onRead={() => open({ kind: 'resume' })} /><a className="text-link return-to-work" href="#projects">Return to the work<ArrowUpRight size={16} /></a></div><InterfaceSculpture finale /></div></div></section>
    </main><footer className="site-footer"><a className="footer-wordmark" href="#home">SANJANA.</a><span className="mono">FRONT-END DEVELOPMENT / {profile.location}</span><nav aria-label="Footer navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav><a href={resumeDownload} download="Sanjana-Resume.txt" aria-label="Download resume text"><Download size={17} /></a></footer>
    {panel && <Overlay key={panel.kind} kind={panel.kind === 'menu' ? 'menu' : 'details'} titleId="overlay-title" onClose={close} returnTarget={returnTarget}>
      {panel.kind === 'menu' ? <div className="menu-content"><h2 id="overlay-title" className="sr-only">Portfolio navigation</h2><nav aria-label="Full-screen navigation">{navigation.map((item, index) => <a key={item.id} href={`#${item.id}`} aria-current={menuCurrent === item.id ? 'location' : undefined} onClick={close}><span className="mono">0{index + 1}</span><strong>{item.label}</strong><ArrowUpRight size={30} /></a>)}</nav><div className="menu-aside"><span className="mono">THE INTERFACE EXPERIMENT</span><h3>A world where<br />interfaces come alive.</h3><p>React. TypeScript. A close eye for the details.</p><Action onClick={() => setPanel({ kind: 'resume' })}>Read resume</Action></div></div> : panel.kind === 'resume' ? <ResumeDetail /> : <ProjectDetail index={panel.index} onNext={() => setPanel({ kind: 'project', index: (panel.index + 1) % projects.length })} />}
    </Overlay>}
    <SharedGeometry />
    <CursorHint />
  </div>
}
export default function App() { return <MotionProvider><Exhibition /></MotionProvider> }
