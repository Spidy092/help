import { useEffect, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { MotionContext } from './context'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const query = '(prefers-reduced-motion: reduce)'
const subscribe = (notify: () => void) => {
  const media = matchMedia(query)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, () => matchMedia(query).matches, () => true)
  const [paused, setPaused] = useState(() => { try { return localStorage.getItem('sanjana-motion') === 'paused' } catch { return false } })
  const enabled = !reduced && !paused
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'on' : 'off'
    const visibility = () => {
      document.documentElement.dataset.visibility = document.hidden ? 'hidden' : 'visible'
      if (document.hidden) { gsap.globalTimeline.pause(); ScrollTrigger.disable(false); gsap.ticker.sleep() }
      else { gsap.globalTimeline.resume(); ScrollTrigger.enable(); gsap.ticker.wake() }
    }
    visibility()
    document.addEventListener('visibilitychange', visibility)
    return () => { document.removeEventListener('visibilitychange', visibility); gsap.globalTimeline.resume(); ScrollTrigger.enable(); gsap.ticker.wake() }
  }, [enabled])
  const toggle = () => {
    const next = !paused
    setPaused(next)
    try { localStorage.setItem('sanjana-motion', next ? 'paused' : 'on') } catch { /* Motion remains available without storage. */ }
  }
  return <MotionContext.Provider value={{ enabled, reduced, paused, toggle }}>{children}</MotionContext.Provider>
}
