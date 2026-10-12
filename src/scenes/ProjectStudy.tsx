import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GeometrySlot } from './MorphBridge'
import { ArrowRight, Check, CalendarDays, Image, ChartNoAxesCombined, SlidersHorizontal } from 'lucide-react'
import { useMotion } from '../motion/context'
const socialNotes = [
  { name: 'Schedule', title: 'Interactive scheduling calendar', description: 'A calendar interface for planning and scheduling social content.', icon: CalendarDays },
  { name: 'Analytics', title: 'Follower growth, clicks and impressions', description: 'Analytics views bring social performance into one workspace.', icon: ChartNoAxesCombined },
  { name: 'Media', title: 'Cropping, compression and tagging', description: 'Media library controls help prepare and organize content.', icon: Image },
]
function CalendarStudy() {
  const [active, setActive] = useState(0)
  return <div className="project-study calendar-study study-object"><div className="study-top mono"><span>INTERACTION STUDY / SOCIALPOSTER</span><CalendarDays size={17} /></div><div className="study-tabs" role="group" aria-label="SocialPoster feature studies">{socialNotes.map((note, index) => { const Icon = note.icon; return <button key={note.name} aria-pressed={active === index} onClick={() => setActive(index)}><Icon size={16} />{note.name}</button> })}</div><div className="study-note" aria-live="polite"><strong>{socialNotes[active].title}</strong><p>{socialNotes[active].description}</p></div><div className="schedule-labels mono" aria-hidden="true"><span>IDEA</span><span>PLAN</span><span>POST</span></div><GeometrySlot shape="calendar" /></div>
}
function SeatStudy() {
  const [selected, setSelected] = useState<number | null>(null)
  return <div className="project-study ticket-study study-object"><div className="study-top mono"><span>SEAT SELECTION / INTERACTION STUDY</span><span>ADMIT ONE</span></div><div className="stage-label mono">STAGE</div><GeometrySlot shape="ticket"><div className="seat-grid" role="group" aria-label="Demonstration seat selection">{Array.from({ length: 12 }, (_, index) => <button key={index} aria-label={`Seat ${index + 1}`} aria-pressed={selected === index} onClick={() => setSelected(selected === index ? null : index)}>{selected === index ? <Check size={16} /> : String(index + 1).padStart(2, '0')}</button>)}</div></GeometrySlot><p className="seat-status" role="status">{selected === null ? 'Choose a seat to explore the selection state.' : `Seat ${selected + 1} selected. Select it again to clear.`}</p><p className="study-disclaimer">Interface demonstration only. No booking is made.</p></div>
}
function InformationStudy() {
  const [arranged, setArranged] = useState(false)
  const [filter, setFilter] = useState('All')
  const ref = useRef<HTMLDivElement>(null)
  const { enabled } = useMotion()
  useEffect(() => {
    const rows = ref.current?.querySelectorAll('.information-row')
    if (!rows) return
    const properties = { x: (index: number) => arranged ? 0 : [8, -6, 12][index], rotation: (index: number) => arranged ? 0 : [-2, 2, -1][index], duration: enabled ? .6 : 0, ease: 'power3.out', overwrite: true, onUpdate: () => document.dispatchEvent(new Event('geometry-update')) }
    const tween = gsap.to(rows, properties)
    return () => { tween.kill() }
  }, [arranged, enabled])
  const rows = [{ name: 'Search', label: 'Multi-criteria search', type: 'Search' }, { name: 'Profile', label: 'Resume upload & applicant profiles', type: 'Profile' }, { name: 'Applications', label: 'Application status tracking', type: 'Applications' }]
  return <div ref={ref} className="project-study information-study study-object"><div className="study-top mono"><span>INFORMATION WALL / INTERACTION STUDY</span><SlidersHorizontal size={16} /></div><div className="information-filters" role="group" aria-label="Information wall filter">{['All', 'Search', 'Profile', 'Applications'].map(name => <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>)}</div><GeometrySlot shape="wall"><div className="information-wall">{rows.filter(row => filter === 'All' || row.type === filter).map(row => <div className="information-row" key={row.name}><span className="mono">{row.name}</span><strong>{row.label}</strong><ArrowUpRightIcon /></div>)}</div></GeometrySlot><button className="arrange-button" aria-pressed={arranged} onClick={() => setArranged(!arranged)}>{arranged ? 'Reset composition' : 'Arrange information'}<ArrowRight size={15} /></button><p className="study-disclaimer">Explore the interface structure. This is not a live job board.</p></div>
}
function ArrowUpRightIcon() { return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg> }
export default function ProjectStudy({ index }: { index: number }) { return index === 0 ? <CalendarStudy /> : index === 1 ? <SeatStudy /> : <InformationStudy /> }
