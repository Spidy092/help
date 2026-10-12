import { lazy, Suspense } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { projects } from '../data'
import { Action } from './Action'
import { PreviewImage } from './PreviewImage'
const ProjectStudy = lazy(() => import('../scenes/ProjectStudy'))
export function ProjectChapter({ index, onDetails }: { index: number; onDetails: (index: number) => void }) {
  const project = projects[index]
  const next = index < 2 ? `#project-${index + 1}` : '#about'
  return <article className={`project-chapter project-${index} ${index === 1 ? 'paper-chapter' : ''}`} id={`project-${index}`} aria-labelledby={`project-title-${index}`}>
    <div className="chapter-inner"><div className="project-heading"><div><span className="project-number">0{index + 1}</span><div><h3 id={`project-title-${index}`}>{project.title}</h3><p className="mono">{project.category}</p></div></div><span className="mono project-medium">{['CALENDAR / CONTENT / ANALYTICS', 'TICKET / FILTERS / SEATS', 'SEARCH / PROFILES / APPLICATIONS'][index]}</span></div>
      <div className="project-layout"><div className="project-visual"><div className="project-art"><div className="mockup-top mono"><span>ORIGINAL PROJECT MOCKUP</span><span>0{index + 1} / 03</span></div><PreviewImage project={project} priority={index === 0} /><p className="mockup-caption">Interface illustration from the original portfolio.</p></div><Suspense fallback={<div className="study-placeholder" role="status">Loading interaction study. Project features are available alongside.</div>}><ProjectStudy index={index} /></Suspense></div><div className="project-summary" data-reveal><div className="summary-block"><span className="mono">THE INTERFACE</span><p className="project-description">{project.description}</p></div><div className="summary-block"><h4>What’s inside</h4><ul className="feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div><div className="summary-block"><h4>Built with</h4><div className="tech-tokens">{project.stack.map(tool => <span key={tool}>{tool}</span>)}</div></div><Action primary={index !== 1} onClick={() => onDetails(index)}>View project details</Action><a className="next-project mono" href={next}>{index < 2 ? `NEXT / ${projects[index + 1].title}` : 'NEXT / THE HUMAN BEHIND THE INTERFACE'}<ArrowDownRight size={17} /></a></div></div>
    </div>
  </article>
}
