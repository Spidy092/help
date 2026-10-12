import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Download, Grid2X2, MoveUpRight, Pause, Play, Plus, X } from 'lucide-react'
import { chapters, chapterFromHash } from './chapters'
import { profile, projects, resume } from './data'
import profilePhoto from './assets/profile.jpg'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/chakra-petch/latin-700.css'
import './App.css'

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`
const reduceQuery = '(prefers-reduced-motion: reduce)'
type Panel = 'project' | 'about' | 'experience' | 'resume' | 'contact' | null
function Label({ text }: { text: string }) {
  return <span className="decode"><span className="decode-width" aria-hidden="true">{text}</span><span className="decode-face" data-label={text} aria-hidden="true">{text}</span><span className="sr-only">{text}</span></span>
}

function App() {
  const [active, setActive] = useState(chapterFromHash)
  const [display, setDisplay] = useState(chapterFromHash)
  const [systemReduced, setSystemReduced] = useState(() => matchMedia(reduceQuery).matches)
  const [motion, setMotion] = useState(() => !matchMedia(reduceQuery).matches)
  const [entering, setEntering] = useState(true)
  const [menu, setMenu] = useState(false)
  const [panel, setPanel] = useState<Panel>(null)
  const [imageFailed, setImageFailed] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const backdrop = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDialogElement>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enabled = motion && !systemReduced
  const current = chapters[display]
  const selected = chapters[active]
  const projectIndex = Math.max(0, selected.project)
  const project = projects[projectIndex]
  const resumeHref = `data:text/plain;charset=utf-8,${encodeURIComponent(resume)}`

  const openPanel = (kind: Panel) => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setMenu(false)
    setPanel(kind)
  }
  const closePanel = () => {
    setPanel(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }
  const choose = (index: number) => {
    setMenu(false)
    setActive(index)
    window.history.replaceState(null, '', `#${chapters[index].id}`)
  }
  const step = (direction: number) => choose((active + direction + chapters.length) % chapters.length)

  useEffect(() => {
    const timer = setTimeout(() => setEntering(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const query = matchMedia(reduceQuery)
    const change = () => setSystemReduced(query.matches)
    query.addEventListener('change', change)
    return () => query.removeEventListener('change', change)
  }, [])

  useEffect(() => {
    if (transitionRef.current) clearTimeout(transitionRef.current)
    transitionRef.current = setTimeout(() => setDisplay(active), enabled ? 380 : 0)
    return () => { if (transitionRef.current) clearTimeout(transitionRef.current) }
  }, [active, enabled])

  useEffect(() => {
    const change = () => setActive(chapterFromHash())
    window.addEventListener('hashchange', change)
    return () => window.removeEventListener('hashchange', change)
  }, [])

  useEffect(() => {
    const dialog = panelRef.current
    if (panel && dialog && !dialog.open) dialog.showModal()
    if (!panel && dialog?.open) dialog.close()
  }, [panel])

  useEffect(() => {
    if (!menu) return
    const first = root.current?.querySelector<HTMLElement>('.navset a')
    first?.focus()
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); menuRef.current?.focus() }
    }
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Element && !event.target.closest('.masthead')) setMenu(false)
    }
    const resize = () => { if (innerWidth > 830) setMenu(false) }
    window.addEventListener('keydown', key)
    window.addEventListener('pointerdown', outside)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('keydown', key)
      window.removeEventListener('pointerdown', outside)
      window.removeEventListener('resize', resize)
    }
  }, [menu])

  useEffect(() => {
    const container = root.current
    if (!container || !enabled) return
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const cleanup: (() => void)[] = []
    container.querySelectorAll<HTMLElement>('a,button').forEach(control => {
      const face = control.querySelector<HTMLElement>('.decode-face')
      if (!face) return
      let raf = 0
      let timeout: ReturnType<typeof setTimeout> | undefined
      const settle = () => {
        cancelAnimationFrame(raf)
        clearTimeout(timeout)
        face.textContent = face.dataset.label || ''
      }
      const decode = () => {
        settle()
        const text = face.dataset.label || ''
        const start = performance.now()
        let last = 0
        let random = [...text].map(() => alphabet[Math.floor(Math.random() * 26)])
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 400)
          if (now - last > 45) { random = [...text].map(() => alphabet[Math.floor(Math.random() * 26)]); last = now }
          const front = progress * text.length
          face.textContent = [...text].map((char, index) => index < front ? char : index < front + 3.6 ? char === ' ' ? ' ' : random[index] : '').join('')
          if (progress < 1) raf = requestAnimationFrame(tick)
          else settle()
        }
        raf = requestAnimationFrame(tick)
        timeout = setTimeout(settle, 900)
      }
      control.addEventListener('pointerenter', decode)
      control.addEventListener('focus', decode)
      cleanup.push(() => { settle(); control.removeEventListener('pointerenter', decode); control.removeEventListener('focus', decode) })
    })
    return () => cleanup.forEach(fn => fn())
  }, [enabled, display, menu, panel])

  useEffect(() => {
    const bg = backdrop.current
    if (!bg) return
    if (!enabled) { bg.style.transform = ''; return }
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, running = false
    const tick = () => {
      x += (tx - x) * .045
      y += (ty - y) * .045
      const dx = -x * innerWidth * .0156, dy = -y * innerHeight * .015
      const scale = 1 + 2 * Math.max(Math.abs(dx) / innerWidth, Math.abs(dy) / innerHeight) + .014 * Math.max(0, y)
      bg.style.transform = `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0) scale(${scale.toFixed(4)})`
      if (Math.abs(tx - x) < .0004 && Math.abs(ty - y) < .0004) { running = false; return }
      raf = requestAnimationFrame(tick)
    }
    const wake = () => { if (!running) { running = true; raf = requestAnimationFrame(tick) } }
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || panelRef.current?.open) return
      tx = event.clientX / innerWidth * 2 - 1
      ty = event.clientY / innerHeight * 2 - 1
      wake()
    }
    const reset = () => { tx = 0; ty = 0; wake() }
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(raf); running = false } }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', reset)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      cancelAnimationFrame(raf)
      bg.style.transform = ''
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', reset)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [enabled])

  const action = () => {
    if (display === 0) choose(1)
    else if (current.project >= 0) openPanel('project')
    else openPanel(current.id === 'about' ? 'about' : 'experience')
  }

  return (
    <div ref={root} className={`cinema ${enabled ? 'motion-enabled' : 'motion-disabled'} ${menu ? 'nav-open' : ''} ${entering ? 'entering' : ''}`}>
      <a className="skip-link" href="#hero">Skip to portfolio content</a>
      <div className="scene-world" ref={backdrop} aria-hidden="true">
        <div className="developer-backdrop" />
        <div className={`project-scene intro-scene ${selected.project < 0 ? 'scene-on' : ''}`}>
          <div className="project-plane"><span className="laptop-camera" />
            <div className="studio-screen">
              <div className="studio-toolbar"><span className="window-dots">● ● ●</span><span>studio / interface.tsx</span><span>LIVE PREVIEW ↗</span></div>
              <div className="studio-workspace">
                <div className="studio-code"><span className="code-caption">EXPLORER / SRC</span><span className="code-file">◇ interface.tsx</span><div className="code-lines"><span><i>01</i><b>export default</b> function</span><span><i>02</i>Portfolio() {'{'}</span><span><i>03</i>  <b>return</b> (</span><span><i>04</i>    &lt;<em>main</em>&gt;</span><span><i>05</i>      &lt;<em>Interface</em></span><span><i>06</i>        craft=<strong>"with care"</strong></span><span><i>07</i>      /&gt;</span><span><i>08</i>    &lt;/<em>main</em>&gt;</span><span><i>09</i>  )</span><span><i>10</i>{'}'}<span className="code-caret">▍</span></span></div><span className="code-status">◉ React + TypeScript</span></div>
                <div className="studio-preview"><div className="preview-top"><span>S /</span><span>DESIGN → BUILD</span></div><div className="preview-content"><span className="preview-eyebrow">MADE IN THE BROWSER</span><div className="preview-title">Ideas.<br /><span>Made real.</span></div><div className="preview-composition"><div className="composition-strip" /><div className="composition-block"><span>01 / INTERFACE</span><div className="composition-bars"><i /><i /><i /><i /><i /></div></div><div className="composition-caption">A little structure.<br />A lot of possibility.</div></div><span className="preview-link">EXPLORE THE POSSIBILITIES ↗</span></div><div className="studio-pointer"><MoveUpRight size={15} /><span>Sanjana</span></div><span className="preview-selection" /></div>
              </div>
            </div>
          </div><div className="laptop-base"><span /></div>
        </div>
        {projects.map((item, index) => <div className={`project-scene ${selected.project === index ? 'scene-on' : ''}`} key={item.title}><div className="project-plane"><span className="laptop-camera" /><img src={asset(item.image)} alt="" loading={index === 0 ? 'eager' : 'lazy'} /></div><div className="laptop-base"><span /></div><div className="plane-reflection"><img src={asset(item.image)} alt="" /></div></div>)}
        <div className="scene-shade" />
      </div>

      <div className="perimeter">
        <span className="edge edge-top" /><span className="edge edge-right" /><span className="edge edge-bottom" /><span className="edge edge-left" />
        <span className="corner corner-tl" /><span className="corner corner-tr" /><span className="corner corner-bl" /><span className="corner corner-br" />

        <a className="brand" href="#home" onClick={event => { event.preventDefault(); choose(0) }} aria-label="Sanjana home"><span>SANJANA</span><span className="brand-mark" aria-hidden="true">/</span></a>
        <nav className="masthead" aria-label="Main navigation">
          <div className="navset" id="navigation-panel">
            <div className="navlinks">
              <a href="#projects" onClick={event => { event.preventDefault(); choose(1) }}><Label text="WORK" /></a>
              <a href="#about" onClick={event => { event.preventDefault(); choose(4) }}><Label text="ABOUT" /></a>
              <a href="#experience" onClick={event => { event.preventDefault(); choose(5) }}><Label text="EXPERIENCE" /></a>
              <button onClick={() => openPanel('contact')}><Label text="CONNECT" /></button>
            </div>
            <button className="pill resume-pill" onClick={() => openPanel('resume')}><Download size={12} /><Label text="RESUME" /></button>
          </div>
          <button ref={menuRef} className="pill menu-pill" aria-label={menu ? 'Close navigation' : 'Open navigation'} aria-expanded={menu} aria-controls="navigation-panel" onClick={() => setMenu(!menu)}><Grid2X2 size={13} /><Label text={menu ? 'CLOSE' : 'MENU'} /></button>
        </nav>

        <nav className="chapter-rail" aria-label="Portfolio chapters"><ol>{chapters.map((chapter, index) => <li className={active === index ? 'chapter-on' : ''} key={chapter.id}><a href={`#${chapter.id}`} aria-current={active === index ? 'page' : undefined} onClick={event => { event.preventDefault(); choose(index) }}><Label text={chapter.label} /></a></li>)}</ol></nav>

        <main className={`hero ${active !== display ? 'swapping' : ''}`} id="hero" tabIndex={-1}>
          <div className="hero-copy" key={display}>
            <h1 className="headline">{current.lines.map(line => <span className="headline-row" key={line}><span className="headline-rise">{line}</span></span>)}</h1>
            <p className="blurb">{current.description}</p>
            <button className="scene-cta" onClick={action}><span className="cta-glass" /><Plus size={12} /><Label text={current.action} /><ArrowUpRight size={13} /></button>
          </div>
        </main>
        <p className="sr-only" aria-live="polite">{chapters[active].label}. {chapters[active].lines.join(' ')}</p>

        <div className="dock">
          <button className="motion-switch" aria-label={enabled ? 'Pause motion' : 'Enable motion'} aria-pressed={enabled} disabled={systemReduced} onClick={() => setMotion(!motion)}>{enabled ? <Pause size={13} /> : <Play size={13} />}<Label text={enabled ? 'MOTION ON' : 'MOTION OFF'} /></button>
          <div className="chapter-control"><button aria-label="Previous chapter" onClick={() => step(-1)}><ChevronLeft size={15} /></button><span className="chapter-count">{String(active + 1).padStart(2, '0')} <span>/ {String(chapters.length).padStart(2, '0')}</span></span><button aria-label="Next chapter" onClick={() => step(1)}><ChevronRight size={15} /></button></div>
          <button className="dock-connect" onClick={() => openPanel('resume')}><Label text="READ RESUME" /><MoveUpRight size={15} /></button>
        </div>
      </div>

      <dialog ref={panelRef} className="detail-dialog" aria-labelledby="panel-title" onCancel={event => { event.preventDefault(); closePanel() }} onClick={event => { if (event.target === event.currentTarget) closePanel() }}>
        <div className="detail-panel">
          <div className="panel-top"><span className="panel-wordmark">SANJANA /</span><button className="close-panel" onClick={closePanel} aria-label="Close details"><Label text="CLOSE" /><X size={19} /></button></div>
          <div className="panel-body">
            {panel === 'project' && <><h2 id="panel-title">{project.title}</h2><p className="panel-intro">{project.description}</p>{!imageFailed ? <img className="detail-image" src={asset(project.image)} alt={`${project.title} project mockup`} onError={() => setImageFailed(true)} /> : <p>Project preview unavailable. The project information is below.</p>}<p className="image-caption">Project mockup from the original portfolio.</p><h3>What’s inside</h3><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul><h3>Built with</h3><p>{project.stack.join(' · ')}</p><div className="project-destinations">{project.demo ? <a href={project.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={15} /></a> : <span>Live demo not available yet.</span>}{project.repository && <a href={project.repository} target="_blank" rel="noopener noreferrer">View source <ArrowUpRight size={15} /></a>}</div><div className="panel-pager"><button onClick={() => { setImageFailed(false); choose(active === 3 ? 1 : active + 1) }}>Next project <ArrowUpRight size={17} /></button></div></>}
            {panel === 'about' && <><h2 id="panel-title">Sanjana.</h2><p className="panel-intro">Front-end developer. React and TypeScript.</p><img className="portrait" src={profilePhoto} alt="Sanjana" /><p>I develop responsive web applications and enjoy the work between design and implementation: translating Figma layouts, solving stateful problems, and building clean, reusable components.</p><h3>My everyday stack</h3><p>React.js, TypeScript, JavaScript, HTML5, CSS3, Material UI, Tailwind CSS, Redux, Context API, REST APIs, Axios and Git.</p><button className="panel-action" onClick={() => { choose(5); setPanel('experience') }}>Professional experience <ArrowUpRight size={16} /></button></>}
            {panel === 'experience' && <><h2 id="panel-title">Professional experience.</h2><div className="job"><h3>{profile.company}</h3><p>{profile.role}<br />{profile.period}</p></div><ul><li>Translate UI/UX designs into responsive React interfaces.</li><li>Build and document reusable components.</li><li>Integrate REST APIs with loading states and error handling.</li><li>Collaborate with designers on layout, transitions and frontend performance.</li></ul><button className="panel-action" onClick={() => setPanel('resume')}>Read my resume <ArrowUpRight size={16} /></button></>}
            {panel === 'resume' && <><h2 id="panel-title">Resume.</h2><p className="panel-intro">Experience, skills and selected projects.</p><div className="resume-tools"><a className="panel-action" href={resumeHref} download="Sanjana-Resume.txt">Download text <Download size={16} /></a><button className="panel-action" onClick={() => window.print()}>Print / save PDF <ArrowUpRight size={16} /></button></div><pre className="resume-text">{resume}</pre></>}
            {panel === 'contact' && <><h2 id="panel-title">Connect.</h2><p className="panel-intro">Have a front-end role or project in mind?</p>{profile.email ? <a className="panel-action" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={16} /></a> : <p>Contact details will be added soon.</p>}<p>In the meantime, you can read or download my background.</p><button className="panel-action" onClick={() => setPanel('resume')}>Open resume <ArrowUpRight size={16} /></button></>}
          </div>
          <div className="panel-bottom"><span>FRONT-END DEVELOPMENT</span><ArrowDown size={15} /></div>
        </div>
      </dialog>
    </div>
  )
}
export default App
