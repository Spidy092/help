# Stitch → implementation map

Written before implementation. Reference package: ../stitch-interface-experiment. Current design preserved on codex/preserved-cinematic, commit dfea644. Implementation branch codex/interface-experiment. No remote publication implied.

## Inspected inputs

All13 current exported canvas nodes and HTML, three reviewed project detail files, screenshot inventory and chapter crops, DESIGN.md, CREATIVE-BRIEF.md, MOTION-HANDOFF.md, source data, current components, old tests, README, PRODUCT.md and incumbent design system. Full desktop9273813f259c41c7b3bfd90da8980c38 is the primary layout reference; heroBa0382e2b3c5b435f8dadc28d93a328c1 supplies the physical sculpture. Mobile0361fe491dc54930bed01aa5bd7bf374 and tablet42407b605ee24391bb4beb6acf7c05c2 supply reading-order constraints. Navigationa05b9d8d691a46a78c08b4a311d23870 and specimen7db88b5e32c24a7f84c0ff0c8af9dc3c supply overlays/states. Three reviewed details supersede generated factual copy. Storyboardcacac6146f2c4f689b80dc430c2d32e4 and staticae1867a4fd1c4138a0a14acfcb20f388 define motion/static parity.

| Reference region | Component | Behavior / evidence |
|---|---|---|
| Persistent nav + six destinations | Header, Overlay | Native anchors, active section, full-screen native dialog, focus trap, Escape and focus return |
| Arrival00 + tactile ribbon | Hero, InterfaceSculpture | GSAP assembly750ms; transform-only layered browser planes, calendar/paper/violet objects; pointer depth; scroll assembly toward work |
| Work01 three exhibits | ProjectChapter, ProjectStudy | Original mockups and caption, exact features/stacks, detail action and next anchor; reversible GSAP scene compositions |
| SocialPoster study | CalendarStudy | Accessible feature toggles/calendar, library and analytics annotation; no fake project metrics |
| Event study | SeatStudy | Explicitly marked interaction study,44px seats, selected state toggles; no booking claim |
| Job study | InformationStudy | Arrange/reset controlled specimen wall and native filter toggles; no invented vacancies/results |
| Detail screens | ProjectDetail in Overlay | Exact repository copy, original image, feature/stack hierarchy, next project, close, optional verified links only |
| About02 editorial portrait | About | Exact original photo, rectangle crop, layered type and restrained reveal/parallax |
| Toolbox03 | Skills | Three actual skill groups, selectable tool, meaningful explanation and project links, no proficiency ratings |
| Experience04 | Experience | Only SwaraghTechnology2024–Present, four factual responsibilities, unfolding blueprint line |
| Resume05 | ResumeSection, ResumeDetail | Factual readable preview, native text download, isolated resume print/save PDF |
| Finale06 | Contact | Opening geometry returns assembled, honest pending-contact copy, working resume action |
| All specimen states | Button, PreviewImage, Overlay | Hover/pressed/focus/selected/disabled, image loading/error; contact empty state; no artificial global loading |
| Responsive/static screens | shared CSS + motion context | Native scroll, desktop1440/tablet768/mobile390 composition; no hover-only actions; immediate settled reduced-motion/no-WebGL equivalent |

## Ambiguity and decisions

The heroB folded planes and full-page hero flat windows differ: preserve full-page reading zones and reintroduce B's carefully tilted tactile structure. The exact continuous topology across project transitions is not uniquely specified; use consistent browser paper planes, source/target transform ranges, scroll-linked exit/enter and reversible interactions. No scroll hijack or mandatory pinned sections. Screens are not functional animations. Follow timing table, not decorative timing/latency labels.

Generated copies infer drag-and-drop, virtualization, sub-millisecond sync, production status, AA compliance, employer outcomes, additional technology and role names. None is carried into production. Original mockup embedded fictional product data is illustrative and captioned. All prose and stacks use src/data.ts. Real email, project URLs and PDF are absent: contact stays pending, project destination controls omitted, resume text and print remain functional.

No new raster asset is required. Build interface objects using CSS/SVG and original imagery. Real3D/WebGL does not materially improve these compositions; omit Three.js/R3F and provide the same complete experience without WebGL. Heavy project studies are lazy components with accessible fallback summaries. Fonts self-host BarlowCondensed/Manrope/IBMPlexMono. Reuse installedGSAP and ScrollTrigger; shared reduced-motion/pause context kills and reverts timelines/listeners on change/unmount. Pointer updates avoid React renders. Document visibility pauses ambient motion. Every chapter readable before animation.

Old cinematic tests assert obsolete chapter-switcher selectors. Rewrite them around retained capabilities (work/details/menu/resume/motion/overflow) and add interaction, fallback, keyboard and production checks. Screenshots at1440/768/390 and full desktop/mobile page compare against the actual reference; record meaningful adaptations and limits rather than claiming pixel perfect.

## Integrated continuity after finish review

SharedGeometry is one fixed SVG object, not separate transition panels. GeometrySlot anchors inside the actual hero browser, calendar study, live seat grid and information wall supply measured bounds. ScrollTrigger drives a GSAP-smoothed native-scroll position. The same12 fragments interpolate position/shape between those actual controls, using matched information-row bounds and selected-seat state. Mobile crossfades the same object between source/target forms. Pause/reduced motion restores inline static geometry in every composition. Pointer/arrangement/resize/visibility observers queue one render per frame and clean up; no React updates per scroll frame. Finale uses the same static browser geometry with the original authored return assembly.
