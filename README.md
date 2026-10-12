# Sanjana — Front-End Portfolio

A cinematic, single-screen portfolio adapted from the supplied Stratum reference: a fine chamfered frame, restrained typography, six portfolio chapters, pointer parallax, and glass controls. Project chapters show the existing mockups and open readable detail panels. About, experience and resume are available through the same navigation.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1
```

## Check and build

```sh
npm run lint
npm test
npm run build
```

Playwright uses Google Chrome at `/usr/bin/google-chrome`, or `CHROME_PATH` if configured. Tests cover chapter selection, project detail panels, resume download, keyboard navigation, motion preferences, asset loading and responsive overflow.

## Content and assets

- `src/data.ts`: existing profile, projects, skills and resume content.
- `src/chapters.ts`: portfolio chapter copy and route aliases.
- `src/App.tsx`: chapter navigation, native dialog panels and motion controls.
- `src/App.css`: reference-inspired frame, scene, responsive layout and transitions.
- `public/scenes/interface-sculpture.png`: generated conceptual background; generation prompt recorded in `.impeccable/scene-prompt.txt` and embedded in PNG metadata.

Fonts are bundled locally. The original project illustrations remain identified as mockups. Contact and external project destinations can be filled in `src/data.ts` when real links are available; the site does not submit an imitation contact form.

The resume can be downloaded as text or printed/saved as PDF. Motion can be paused and respects the system reduced-motion preference. This revision runs locally; GitHub Pages configuration remains in `vite.config.ts`.
