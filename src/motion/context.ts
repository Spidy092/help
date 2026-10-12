import { createContext, useContext } from 'react'
export type MotionSettings = { enabled: boolean; reduced: boolean; paused: boolean; toggle: () => void }
export const MotionContext = createContext<MotionSettings>({ enabled: false, reduced: true, paused: false, toggle: () => {} })
export const useMotion = () => useContext(MotionContext)
