import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { X } from 'lucide-react'
import { useMotion } from '../motion/context'
import { timing } from '../motion/useExhibitionMotion'
export function Overlay({ children, onClose, kind = 'details', titleId, returnTarget }: { children: ReactNode; onClose: () => void; kind?: 'menu' | 'details'; titleId: string; returnTarget: HTMLElement | null }) {
  const ref = useRef<HTMLDialogElement>(null)
  const closing = useRef(false)
  const animation = useRef<gsap.core.Tween | null>(null)
  const { enabled } = useMotion()
  const closeRef = useRef(onClose)
  useEffect(() => { closeRef.current = onClose }, [onClose])
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { animation.current?.kill(); dialog.close(); document.body.style.overflow = previousOverflow; requestAnimationFrame(() => returnTarget?.focus({ preventScroll: true })) }
  }, [returnTarget])
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    animation.current?.kill()
    if (closing.current) { closeRef.current(); return }
    if (enabled) animation.current = gsap.fromTo(dialog, { y: kind === 'menu' ? '5%' : 24, opacity: .75 }, { y: 0, opacity: 1, duration: timing.overlay, ease: timing.ease, clearProps: 'transform,opacity' })
    else gsap.set(dialog, { clearProps: 'transform,opacity' })
    return () => { animation.current?.kill() }
  }, [enabled, kind])
  const dismiss = () => {
    if (closing.current) return
    closing.current = true
    animation.current?.kill()
    if (enabled && ref.current) animation.current = gsap.to(ref.current, { y: kind === 'menu' ? '3%' : 18, opacity: 0, duration: timing.exit, ease: 'power2.in', onComplete: () => closeRef.current() })
    else closeRef.current()
  }
  return <dialog ref={ref} className={`overlay overlay-${kind}`} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); dismiss() }} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dismiss() } }}><div className="overlay-top"><span>SANJANA / FRONT-END DEVELOPER</span><button className="close-button" onClick={dismiss} aria-label={`Close ${kind === 'menu' ? 'navigation' : 'details'}`} autoFocus><span>CLOSE</span><X size={20} /></button></div>{children}</dialog>
}
