import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotion } from '../motion/context'
gsap.registerPlugin(ScrollTrigger)
type Shape = 'browser' | 'calendar' | 'ticket' | 'wall'
type Pose = { x: number; y: number; sx: number; sy: number }
const shapes: Shape[] = ['browser', 'calendar', 'ticket', 'wall']
function pose(shape: Shape, index: number): Pose {
  if (shape === 'browser') return { x: 22 + index % 3 * 127, y: 16 + Math.floor(index / 3) * 57, sx: 3.6, sy: .66 }
  if (shape === 'calendar') return { x: 22 + index % 3 * 127, y: 12 + Math.floor(index / 3) * 60, sx: 3.6, sy: 1.55 }
  if (shape === 'ticket') return { x: index % 4 * 108.5, y: Math.floor(index / 4) * (250 / 150 * 53), sx: 3.15, sy: 250 / 150 * 44 / 30 }
  if (index < 3) return { x: 9, y: 8 + index * 79, sx: 13.4, sy: 2.25 }
  return { x: 352, y: 19 + Math.floor((index - 3) / 3) * 79 + (index % 3) * 15, sx: 1.3, sy: .2 }
}
const transform = ({ x, y, sx, sy }: Pose) => `translate(${x} ${y}) scale(${sx} ${sy})`
function Tiles({ shape, group }: { shape: Shape; group?: string }) {
  return <g className={group} data-shape={shape}>{Array.from({ length: 12 }, (_, index) => <rect className={`shared-tile tile-${index}`} key={index} width="30" height="30" transform={transform(pose(shape, index))} />)}</g>
}
export function GeometrySlot({ shape, children, standalone = false }: { shape: Shape; children?: ReactNode; standalone?: boolean }) {
  return <div className={`geometry-slot geometry-${shape} ${standalone ? 'standalone-geometry' : ''}`} data-geometry-slot={standalone ? undefined : shape}><svg className="static-geometry" viewBox="0 0 420 250" preserveAspectRatio="none" aria-hidden="true"><Tiles shape={shape} /></svg>{children}</div>
}
export function SharedGeometry() {
  const ref = useRef<SVGSVGElement>(null)
  const { enabled } = useMotion()
  useEffect(() => {
    const svg = ref.current
    if (!enabled || !svg) return
    let raf = 0
    let disposed = false
    const position = { scroll: scrollY }
    const mobile = matchMedia('(max-width: 767px)')
    const source = svg.querySelector<SVGGElement>('.shared-source')!
    const target = svg.querySelector<SVGGElement>('.shared-target')!
    const sourceTiles = source.querySelectorAll<SVGRectElement>('.shared-tile')
    const targetTiles = target.querySelectorAll<SVGRectElement>('.shared-tile')
    const mix = (a: number, b: number, progress: number) => gsap.utils.interpolate(a, b, progress)
    const render = () => {
      raf = 0
      if (disposed || document.hidden) return
      const slots = shapes.map(shape => document.querySelector<HTMLElement>(`[data-geometry-slot="${shape}"]`))
      if (!slots[0]) return
      const boxes = slots.map(slot => slot?.getBoundingClientRect())
      const rail = innerHeight * .42
      let segment = 0
      let progress = 0
      for (let index = 0; index < 3; index++) {
        if (!boxes[index] || !boxes[index + 1]) break
        const start = Math.max(0, boxes[index]!.top + scrollY - rail)
        const end = Math.max(start + 1, boxes[index + 1]!.top + scrollY - rail)
        segment = index
        progress = gsap.utils.clamp(0, 1, (position.scroll - start) / (end - start))
        if (progress < .005) progress = 0
        if (progress > .995) progress = 1
        if (progress < 1) break
      }
      const from = boxes[segment] || boxes[0]!
      const to = boxes[segment + 1] || from
      const wallSlot = slots[3]
      const wallBox = boxes[3]
      const rows = wallSlot ? Array.from(wallSlot.querySelectorAll('.information-row')) : []
      const actualPose = (shape: Shape, index: number): Pose => {
        if (shape !== 'wall' || !wallBox || !rows.length) return pose(shape, index)
        const rowIndex = index < 3 ? index : Math.floor((index - 3) / 3)
        const row = rows[rowIndex]?.getBoundingClientRect()
        if (!row) return { x: 0, y: 0, sx: 0, sy: 0 }
        const x = (row.left - wallBox.left) / wallBox.width * 420
        const y = (row.top - wallBox.top) / wallBox.height * 250
        const width = row.width / wallBox.width * 420
        const height = row.height / wallBox.height * 250
        return index < 3 ? { x, y, sx: width / 30, sy: height / 30 } : { x: x + width - 45, y: y + 10 + index % 3 * 12, sx: 1, sy: .15 }
      }
      const current = progress < .5 ? shapes[segment] : shapes[segment + 1]
      const x = mix(from.left + from.width / 2, to.left + to.width / 2, progress)
      const y = mix(from.top + from.height / 2, to.top + to.height / 2, progress)
      const width = mix(from.width, to.width, progress)
      const height = mix(from.height, to.height, progress)
      const angle = segment === 0 ? -5 * (1 - progress) : 0
      svg.style.transform = `translate3d(${x}px,${y}px,0) rotate(${angle}deg) scale(${width / 420},${height / 250}) translate(-50%,-50%)`
      svg.dataset.phase = `${shapes[segment]}-${shapes[segment + 1]}`
      svg.dataset.progress = progress.toFixed(3)
      source.dataset.shape = shapes[segment]
      target.dataset.shape = mobile.matches ? shapes[segment + 1] : current
      source.style.opacity = mobile.matches ? String(1 - progress) : '0'
      target.style.opacity = mobile.matches ? String(progress) : '1'
      sourceTiles.forEach((tile, index) => tile.setAttribute('transform', transform(actualPose(shapes[segment], index))))
      targetTiles.forEach((tile, index) => {
        const a = actualPose(shapes[segment], index)
        const b = actualPose(shapes[segment + 1], index)
        tile.setAttribute('transform', transform(mobile.matches ? b : { x: mix(a.x, b.x, progress), y: mix(a.y, b.y, progress), sx: mix(a.sx, b.sx, progress), sy: mix(a.sy, b.sy, progress) }))
      })
      if (current === 'ticket') {
        const selected = document.querySelector('.seat-grid button[aria-pressed="true"]')
        const seat = selected ? Array.from(selected.parentElement!.children).indexOf(selected) : -1
        targetTiles.forEach((tile, index) => tile.classList.toggle('selected-tile', index === seat))
      } else targetTiles.forEach(tile => tile.classList.remove('selected-tile'))
    }
    const queue = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(render) }
    const follow = gsap.quickTo(position, 'scroll', { duration: .4, ease: 'power2.out', onUpdate: queue })
    const onScroll = () => { follow(scrollY); queue() }
    const trigger = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: onScroll, onRefresh: onScroll })
    const observer = new MutationObserver(queue)
    const observe = () => document.querySelectorAll('[data-geometry-slot]').forEach(slot => observer.observe(slot, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-pressed', 'style'] }))
    observe()
    const lazyObserver = new MutationObserver(() => { observe(); queue() })
    lazyObserver.observe(document.querySelector('main')!, { childList: true, subtree: true })
    const pointer = (event: PointerEvent) => { if (event.target instanceof Element && event.target.closest('.hero-sculpture')) queue() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', queue)
    window.addEventListener('pointermove', pointer, { passive: true })
    document.addEventListener('geometry-update', queue)
    document.addEventListener('visibilitychange', queue)
    const intro = gsap.to({}, { duration: 1, onUpdate: queue })
    document.fonts.ready.then(queue)
    queue()
    return () => { disposed = true; cancelAnimationFrame(raf); trigger.kill(); intro.kill(); follow.tween.kill(); observer.disconnect(); lazyObserver.disconnect(); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', queue); window.removeEventListener('pointermove', pointer); document.removeEventListener('geometry-update', queue); document.removeEventListener('visibilitychange', queue) }
  }, [enabled])
  return <svg ref={ref} className="shared-geometry" viewBox="0 0 420 250" preserveAspectRatio="none" aria-hidden="true"><Tiles shape="browser" group="shared-source" /><Tiles shape="browser" group="shared-target" /></svg>
}
