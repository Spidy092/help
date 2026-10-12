import { useRef } from 'react'
import { ArrowUpRight, Code2, MoveUpRight } from 'lucide-react'
import { GeometrySlot } from './MorphBridge'
import { usePointerMotion } from '../motion/usePointerMotion'
export function InterfaceSculpture({ finale = false }: { finale?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  usePointerMotion(ref)
  return <div ref={ref} className={`interface-sculpture ${finale ? 'finale-sculpture' : 'hero-sculpture'}`} aria-hidden="true">
    <div className="sculpture-boundary"><span className="spec-label">{finale ? 'ASSEMBLED / ONE INTERFACE' : 'THE INTERFACE EXPERIMENT'}</span><span className="corner-cross cross-one" /><span className="corner-cross cross-two" /></div>
    <div className="parallax-layer"><div className="sculpture-pose">
      <div className="sculpture-plane silver-plane"><span>STRUCTURE</span><div className="silver-grid" /></div>
      <div className="sculpture-plane citron-fold"><span>DESIGN<br />INTO<br />CODE.</span><ArrowUpRight size={54} /></div>
      <div className="sculpture-plane browser-plane"><div className="browser-bar"><span className="browser-dots"><i /><i /><i /></span><span>interface.tsx</span><Code2 size={16} /></div><div className="browser-body"><span className="mono">A LITTLE STRUCTURE.</span><strong>A lot of<br /><em>possibility.</em></strong><div className="mini-calendar-labels mono"><span>COMPOSE</span><span>SCHEDULE</span><span>PUBLISH</span></div>{finale ? <GeometrySlot shape="browser" standalone /> : <GeometrySlot shape="browser" />}<div className="browser-bottom"><span>REACT / TYPESCRIPT</span><ArrowUpRight size={20} /></div></div></div>
      <div className="sculpture-plane violet-plane"><span className="mono">IDEA → INTERFACE</span><strong>{finale ? 'Made to connect.' : 'Made to feel alive.'}</strong><span className="violet-rule" /></div>
      <div className="sculpture-cursor"><MoveUpRight size={32} /><span>SANJANA</span></div>
    </div></div><div className="sculpture-caption mono">{finale ? 'THE SAME OBJECTS. A NEW POSSIBILITY.' : 'MOVE. EXPLORE. MAKE SOMETHING HAPPEN.'}</div>
  </div>
}
