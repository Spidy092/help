import { useEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { useMotion } from './context'
export function usePointerMotion(ref: RefObject<HTMLElement | null>) {
  const { enabled } = useMotion()
  useEffect(() => {
    const element = ref.current
    if (!enabled || !element || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const layer = element.querySelector<HTMLElement>('.parallax-layer')
    if (!layer) return
    const x = gsap.quickTo(layer, 'x', { duration: .7, ease: 'power3.out' })
    const y = gsap.quickTo(layer, 'y', { duration: .7, ease: 'power3.out' })
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || document.hidden) return
      const box = element.getBoundingClientRect()
      x((event.clientX - box.left - box.width / 2) / box.width * 18)
      y((event.clientY - box.top - box.height / 2) / box.height * 14)
    }
    const leave = () => { x(0); y(0) }
    element.addEventListener('pointermove', move)
    element.addEventListener('pointerleave', leave)
    return () => { element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave); x.tween.kill(); y.tween.kill(); gsap.set(layer, { clearProps: 'transform' }) }
  }, [enabled, ref])
}
