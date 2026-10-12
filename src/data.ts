export type Project = { title: string; category: string; image: string; description: string; stack: string[]; features: string[]; demo: string; repository: string }
export const profile = {
  name: "Sanjana",
  role: "Front-End Developer",
  company: "Swaragh Technology",
  period: "2024 – Present",
  email: "",
  location: "Bengaluru, India",
  // The original repository provides only example contact and generic project URLs.
  // Add verified destinations here before publication.
};
export const projects: Project[] = [
  {
    title: "SocialPoster",
    category: "Publishing & analytics",
    image: "social_poster_mockup.png",
    description:
      "A workspace for creators to compose, schedule and publish posts, then follow their performance across social platforms.",
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Chart.js",
      "Redux Toolkit",
    ],
    features: [
      "Interactive scheduling calendar",
      "Analytics for follower growth, clicks and impressions",
      "Media library with cropping, compression and tagging",
    ],
    demo: "",
    repository: "",
  },
  {
    title: "Event Booking System",
    category: "Discovery & ticketing",
    image: "event_booking_mockup.png",
    description:
      "An event discovery and booking interface with search, category filters, seat selection and a step-by-step ticketing flow.",
    stack: [
      "React",
      "Context API",
      "CSS Modules",
      "JavaScript",
      "LocalStorage",
    ],
    features: [
      "Filters for category, date, price and location",
      "Debounced event search",
      "Booking flow with seat selection and locally saved receipts",
    ],
    demo: "",
    repository: "",
  },
  {
    title: "Online Job Portal",
    category: "Search & recruitment",
    image: "job_portal_mockup.png",
    description:
      "A recruitment portal that brings job search, applicant profiles and application tracking into one responsive interface.",
    stack: ["React", "JavaScript", "REST APIs", "Tailwind CSS", "Axios"],
    features: [
      "Multi-criteria job search and filtering",
      "Resume upload and applicant profiles",
      "Application tracking from applied to offered",
    ],
    demo: "",
    repository: "",
  },
];
export const resume = `Sanjana\nFront-End Developer\n\nSUMMARY\nFront-end developer with around two years of experience creating responsive web applications with React and TypeScript.\n\nEXPERIENCE\nSwaragh Technology | Front-End Developer | 2024 - Present\n- Developed responsive React interfaces from design files.\n- Built and documented reusable UI components.\n- Integrated REST APIs with Axios and error handling.\n- Collaborated with UI/UX designers and optimized frontend assets.\n\nSKILLS\nReact, TypeScript, JavaScript, HTML5, CSS3, Material UI, Tailwind CSS, Redux, REST APIs, Git\n\nPROJECTS\nSocialPoster: scheduling calendars and analytics dashboards.\nEvent Booking System: event filters, seat selection and booking flows.\nOnline Job Portal: job search, applicant profiles and application tracking.\n`;

export const navigation = [
  { id: 'projects', label: 'Work' }, { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' }, { id: 'experience', label: 'Experience' },
  { id: 'resume', label: 'Resume' }, { id: 'contact', label: 'Contact' },
]
export const responsibilities = [
  { title: 'From design to code', text: 'Translate UI/UX designs into responsive React interfaces.' },
  { title: 'Reusable components', text: 'Build and document reusable components.' },
  { title: 'REST API integration', text: 'Integrate REST APIs with loading and error states.' },
  { title: 'Design collaboration', text: 'Collaborate on design, animation and frontend performance.' },
]
export const skillGroups = [
  { name: 'Interface', tools: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'] },
  { name: 'UI systems', tools: ['Material UI', 'Tailwind CSS', 'Reusable components', 'Responsive layouts'] },
  { name: 'Integration', tools: ['REST APIs', 'Axios', 'Redux', 'Context API', 'Git', 'Figma-to-code'] },
]
export const skillConnections: Record<string, { text: string; projects: number[] }> = {
  React: { text: 'React connects all three projects: scheduling interfaces, event booking and job search.', projects: [0, 1, 2] },
  TypeScript: { text: 'TypeScript is part of the SocialPoster stack, helping describe component and application data.', projects: [0] },
  JavaScript: { text: 'JavaScript is used in the Event Booking System and Online Job Portal.', projects: [1, 2] },
  'Tailwind CSS': { text: 'Tailwind CSS is used in SocialPoster and the Online Job Portal.', projects: [0, 2] },
  'REST APIs': { text: 'REST API integration connects SocialPoster and the Online Job Portal to application data.', projects: [0, 2] },
  Axios: { text: 'Axios is included in the Online Job Portal’s application integration stack.', projects: [2] },
  Redux: { text: 'Redux Toolkit is part of SocialPoster’s state-management stack.', projects: [0] },
  'Context API': { text: 'Context API supports the Event Booking System’s interface state.', projects: [1] },
  HTML5: { text: 'HTML5 gives interface content its structure and meaningful elements.', projects: [] },
  CSS3: { text: 'CSS3 supports layout, responsive behavior and interface styling.', projects: [] },
  'Material UI': { text: 'Material UI is part of my UI systems toolbox for building components.', projects: [] },
  'Reusable components': { text: 'Building and documenting reusable components is part of my work at Swaragh Technology.', projects: [] },
  'Responsive layouts': { text: 'I translate design files into responsive React interfaces at Swaragh Technology.', projects: [] },
  Git: { text: 'Git is part of my everyday development toolkit.', projects: [] },
  'Figma-to-code': { text: 'I translate UI/UX layouts into responsive frontend interfaces.', projects: [] },
}
export const resumeDownload = `data:text/plain;charset=utf-8,${encodeURIComponent(resume)}`
