import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import type { Project } from '../data'
export function PreviewImage({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  return <div className={`preview-image image-${state}`}>
    {state === 'error' ? <div className="image-fallback" role="status"><ImageOff size={30} aria-hidden="true" /><strong>{project.title}</strong><p>The image couldn’t load. Project information is still available below.</p><button onClick={() => { setAttempt(attempt + 1); setState('loading') }}>Retry image</button></div> : <img key={attempt} src={`${import.meta.env.BASE_URL}${project.image}`} alt={`${project.title} original project mockup`} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} width="1024" height="1024" onLoad={() => setState('loaded')} onError={() => setState('error')} />}
    {state === 'loading' && <span className="preview-loader" aria-hidden="true">Loading project preview</span>}
  </div>
}
