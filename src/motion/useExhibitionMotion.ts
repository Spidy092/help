import { useEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotion } from './context'
gsap.registerPlugin(ScrollTrigger)
export const timing = { assembly: .75, reveal: .45, hover: .18, overlay: .35, exit: .25, ease: 'power3.out' }
export function useExhibitionMotion(ref: RefObject<HTMLElement | null>) {
  const { enabled } = useMotion()
  useEffect(() => {
    if (!enabled || !ref.current) return
    const media = gsap.matchMedia()
    media.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, context => {
      const desktop = !!context.conditions?.desktop
      const scene = gsap.context(() => {
        gsap.from('.hero-sculpture .sculpture-plane', { y: 40, rotation: index => index % 2 ? 9 : -9, opacity: .55, duration: timing.assembly, stagger: .06, ease: timing.ease, clearProps: 'opacity' })
        gsap.from('.hero-title .masked-line > span', { yPercent: 105, duration: .55, stagger: .07, ease: timing.ease })
        if (desktop) {
          gsap.to('.hero-sculpture .sculpture-pose', { y: 90, rotationZ: -4, scale: .9, ease: 'none', onUpdate: () => document.dispatchEvent(new Event('geometry-update')), scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: .65 } })
        }
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.from(element, { y: desktop ? 24 : 12, opacity: .5, duration: timing.reveal, ease: timing.ease, scrollTrigger: { trigger: element, start: 'top 92%', toggleActions: 'play none none reverse' } })
        })
        gsap.utils.toArray<HTMLElement>('.project-chapter').forEach((chapter, index) => {
          const art = chapter.querySelector('.project-art')
          if (art) gsap.from(art, { y: desktop ? 36 : 12, rotation: desktop ? index === 1 ? -3 : 2 : 0, duration: .75, ease: timing.ease, scrollTrigger: { trigger: art, start: 'top 90%', toggleActions: 'play none none reverse' } })
        })
        gsap.from('.portrait-wrap', { clipPath: 'inset(7% 4% 7% 4%)', duration: .55, ease: timing.ease, scrollTrigger: { trigger: '#about', start: 'top 75%', toggleActions: 'play none none reverse' } })
        gsap.from('.blueprint-line', { scaleX: 0, transformOrigin: 'left', duration: .5, ease: timing.ease, scrollTrigger: { trigger: '#experience', start: 'top 75%', toggleActions: 'play none none reverse' } })
        gsap.from('.finale-sculpture .sculpture-plane', { y: 40, rotation: index => index % 2 ? -8 : 8, opacity: .5, duration: .8, stagger: .06, ease: timing.ease, scrollTrigger: { trigger: '#contact', start: 'top 70%', toggleActions: 'play none none reverse' } })
      }, ref)
      return () => scene.revert()
    }, ref)
    // Image dimensions are reserved. Refreshing for every lazy image interrupts native anchor scrolling.
    let disposed = false
    document.fonts.ready.then(() => { if (!disposed && !location.hash) ScrollTrigger.refresh() })
    return () => { disposed = true; media.revert() }
  }, [enabled, ref])
}
