import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import { useMotion } from '../motion/context'
type Props = { children: ReactNode; href?: string; onClick?: () => void; primary?: boolean; className?: string; download?: string; disabled?: boolean }
export function Action({ children, href, onClick, primary, className = '', download, disabled }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const { enabled } = useMotion()
  useEffect(() => {
    const face = ref.current
    const control = face?.parentElement
    if (!enabled || !face || !control || !matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const x = gsap.quickTo(face, 'x', { duration: .18, ease: 'power2.out' })
    const y = gsap.quickTo(face, 'y', { duration: .18, ease: 'power2.out' })
    const move = (event: PointerEvent) => { const box = control.getBoundingClientRect(); x((event.clientX - box.left - box.width / 2) / box.width * 6); y((event.clientY - box.top - box.height / 2) / box.height * 6) }
    const reset = () => { x(0); y(0) }
    control.addEventListener('pointermove', move)
    control.addEventListener('pointerleave', reset)
    return () => { control.removeEventListener('pointermove', move); control.removeEventListener('pointerleave', reset); x.tween.kill(); y.tween.kill(); gsap.set(face, { clearProps: 'transform' }) }
  }, [enabled])
  const content = <span ref={ref} className="action-face">{children}<ArrowUpRight size={16} aria-hidden="true" /></span>
  const classes = `action ${primary ? 'action-primary' : ''} ${className}`
  return href ? <a className={classes} href={href} download={download} onClick={onClick} data-cursor="EXPLORE">{content}</a> : <button className={classes} onClick={onClick} disabled={disabled} data-cursor="OPEN">{content}</button>
}
