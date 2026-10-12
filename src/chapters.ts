import { projects } from './data'
export const chapters = [
  { id: 'home', label: 'INTRODUCTION', lines: ['Sanjana.', 'Front-end developer.'], description: 'React. TypeScript. Responsive interfaces.\nI turn designs into web applications, with reusable components\nand careful attention to how every screen works.', action: 'EXPLORE THE WORK', project: -1 },
  { id: 'projects', label: 'SOCIALPOSTER', lines: ['SocialPoster.', 'Social media dashboard.'], description: projects[0].description, action: 'VIEW PROJECT DETAILS', project: 0 },
  { id: 'events', label: 'EVENT BOOKING', lines: ['Event Booking.', 'Discovery to checkout.'], description: projects[1].description, action: 'VIEW PROJECT DETAILS', project: 1 },
  { id: 'jobs', label: 'JOB PORTAL', lines: ['Online Job Portal.', 'Search. Apply. Manage.'], description: projects[2].description, action: 'VIEW PROJECT DETAILS', project: 2 },
  { id: 'about', label: 'ABOUT', lines: ['Design into code.', 'That’s my everyday.'], description: 'I’m Sanjana, a front-end developer. I enjoy solving visual\nand stateful problems in the browser, turning Figma layouts\ninto responsive interfaces and reusable React components.', action: 'MEET THE DEVELOPER', project: -1 },
  { id: 'experience', label: 'EXPERIENCE', lines: ['Swaragh Technology.', '2024 to present.'], description: 'Developing responsive React interfaces, building reusable\ncomponents and connecting REST APIs. Working alongside\ndesigners to bring each screen from layout to implementation.', action: 'VIEW MY EXPERIENCE', project: -1 },
]
export function chapterFromHash() {
  const hash = window.location.hash.slice(1)
  const aliases: Record<string, string> = { skills: 'about', resume: 'experience', contact: 'about', 'project-0': 'projects', 'project-1': 'events', 'project-2': 'jobs' }
  const index = chapters.findIndex(chapter => chapter.id === (aliases[hash] || hash))
  return index < 0 ? 0 : index
}
