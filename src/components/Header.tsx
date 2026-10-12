import { useEffect, useState } from 'react'
import { Menu, Pause, Play } from 'lucide-react'
import { navigation } from '../data'
import { useMotion } from '../motion/context'
export function Header({ onMenu, onResume }: { onMenu: () => void; onResume: () => void }) {
  const [active, setActive] = useState('home')
  const { enabled, reduced, toggle } = useMotion()
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('main > section[id]')
    const onHash = () => { const id = location.hash.slice(1); if (navigation.some(item => item.id === id)) setActive(id) }
    window.addEventListener('hashchange', onHash)
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 })
    sections.forEach(section => observer.observe(section))
    return () => { observer.disconnect(); window.removeEventListener('hashchange', onHash) }
  }, [])
  return <header className="site-header"><a href="#home" className="wordmark" aria-label="Sanjana home"><i aria-hidden="true" />SANJANA <span>/ FRONT-END DEVELOPER</span></a><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>{item.label}</a>)}</nav><div className="header-actions"><button className="header-resume" onClick={onResume}>RESUME</button><button className="motion-toggle" onClick={toggle} disabled={reduced} aria-label={reduced ? 'Reduced motion enabled by system' : enabled ? 'Pause motion' : 'Enable motion'} aria-pressed={enabled} title={reduced ? 'System reduced-motion preference is respected' : enabled ? 'Pause motion' : 'Enable motion'}>{enabled ? <Pause size={16} /> : <Play size={16} />}</button><button className="menu-toggle" onClick={onMenu} aria-label="Open navigation"><Menu size={18} /><span>MENU</span></button></div></header>
}
