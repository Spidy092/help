import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { projects, skillConnections, skillGroups } from '../data'
export function Skills() {
  const [selected, setSelected] = useState('React')
  const connection = skillConnections[selected]
  return <section className="chapter toolbox" id="skills" aria-labelledby="skills-title"><div className="chapter-inner"><div className="section-heading" data-reveal><span className="chapter-label mono">CHAPTER 03 / THE CREATIVE TOOLBOX</span><h2 id="skills-title">TOOLS ARE ORDINARY.<br />WHAT YOU BUILD WITH THEM ISN’T.</h2></div><div className="tool-groups">{skillGroups.map((group, index) => <div className="tool-group" key={group.name} data-reveal><h3><span className="mono">0{index + 1} /</span>{group.name}</h3><div className="tool-list">{group.tools.map(tool => <button key={tool} aria-pressed={selected === tool} onClick={() => setSelected(tool)}><span>{tool}</span>{selected === tool ? <Check size={16} /> : <ArrowUpRight size={15} />}</button>)}</div></div>)}</div><div className="skill-connection" aria-live="polite"><div><span className="mono">SELECTED / {selected}</span><h3>{selected}</h3><p>{connection.text}</p></div><div className="connection-links">{connection.projects.length ? connection.projects.map(index => <a key={index} href={`#project-${index}`}>{projects[index].title}<ArrowUpRight size={17} /></a>) : <a href="#experience">See my professional experience<ArrowUpRight size={17} /></a>}</div></div></div></section>
}
