import { useEffect, useRef } from 'react'
import { useMotion } from '../motion/context'
export function CursorHint() {
  const ref = useRef<HTMLSpanElement>(null)
  const { enabled } = useMotion()
  useEffect(() => {
    const element = ref.current
    if (!enabled || !element || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    let x = 0
    let y = 0
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]') : null
      element.textContent = target?.dataset.cursor || ''
      element.classList.toggle('cursor-visible', !!target)
      x = event.clientX; y = event.clientY
      if (!raf) raf = requestAnimationFrame(() => { element.style.transform = `translate3d(${x + 16}px, ${y + 18}px, 0)`; raf = 0 })
    }
    const hide = () => element.classList.remove('cursor-visible')
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', hide)
    window.addEventListener('scroll', hide, { passive: true })
    return () => { cancelAnimationFrame(raf); document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide); window.removeEventListener('scroll', hide); hide() }
  }, [enabled])
  return <span ref={ref} className="cursor-hint mono" aria-hidden="true" />
}
