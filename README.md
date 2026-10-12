# Sanjana — The Interface Experiment

A complete React/TypeScript portfolio implemented from the exported Stitch design package. Seven native-scroll chapters turn interface objects into project exhibits: a layered hero, SocialPoster calendar/content studies, Event Booking ticket/seat selection, a Job Portal information wall, an editorial portrait, linked skills, professional experience, a usable resume and an honest contact-pending finale.

## Run and verify

```sh
npm install
npm run dev -- --host 127.0.0.1
npm run lint
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Playwright uses `/usr/bin/google-chrome`, or `CHROME_PATH`. Eighteen browser tests cover factual chapter content, anchors, menu/dialog focus and Escape, all three project studies, skill connections, real text download, print isolation, motion pause/system preferences, touch, image failure/retry, responsive320–1600px, no-WebGL operation and interrupted/reverse movement.

## Architecture

- `src/data.ts`: typed original profile/projects, truthful skill connections and text resume.
- `src/components`: reusable actions, image loading/error states, header, native-dialog overlays, project chapters/details, skills and resume components.
- `src/scenes`: CSS/SVG interface sculpture and lazy-loaded project studies. There is no WebGL dependency.
- `src/motion`: shared pause/reduced-motion context, GSAP/ScrollTrigger choreography, pointer depth and cleanup.
- `docs/design-implementation-map.md`: source-screen mapping, ambiguity decisions and factual boundaries, written before code changes.
- `docs/qa-report.md`: checked behavior, visual comparison scope and remaining limitations.

Native scroll and semantic anchors remain authoritative. Motion uses transforms/opacity and a portrait mask; it can be paused and respects the operating-system preference. Dialogs trap focus through the native modal API, close with Escape and restore their opener. Touch has explicit controls instead of hover-only features. Project illustration failures keep the facts available and offer retry. Fonts and images are self-hosted.

## Factual boundaries

Career remains Swaragh Technology, Front-End Developer,2024–Present. Original project mockups and portrait are retained. Generated Stitch claims about virtualized workflows, performance guarantees, extra technologies or outcomes are not included. The seat and information-wall interactions are labelled studies, not live booking or recruitment systems.

No verified email, live demos, source destinations or PDF were supplied. Contact remains pending; project external links are omitted until verified. Resume downloads the actual text document. The preview supports browser print/save PDF; that does not represent a supplied PDF resume.

## Preserved design

The previous cinematic laptop portfolio is committed on `codex/preserved-cinematic` at `dfea644`. This implementation is on `codex/interface-experiment`. `main` was left unchanged. Nothing has been pushed or deployed by this implementation task.
