# Sanjana’s portfolio

An interactive React and TypeScript portfolio with a selectable project storyboard, inline project details, light/dark themes, responsive navigation, and a readable/downloadable resume.

## Run locally

```sh
npm install
npm run dev
```

## Check and build

```sh
npm run lint
npm run build
npm run test
```

Browser tests use Google Chrome at `/usr/bin/google-chrome`. Set `CHROME_PATH` to your installed Chrome executable when running on another system.

## Update content

Edit `src/data.ts` for project descriptions, technology lists, career information, resume text and verified destinations. The original repository contains an example email, generic social URLs and no live project URLs. These are not published as working contact actions. Set `profile.email`, project `demo` and `repository` fields when verified information is available. Project links automatically render in the expanded details.

The original resume is a text document; the redesign preserves that download and offers an inline readable preview with Print / save as PDF. There is no supplied PDF resume.

## Design and assets

The visual system is documented in `DESIGN.md`. Existing project mockups and portrait are preserved from the source repository; mockups do not establish live functionality or measured results. Motion supports project switching and modest image movement during scroll, with a reduced-motion fallback. Fonts are bundled locally. No external font requests are required.

## Publication

This checkout has not been pushed or deployed. Run `npm run build` and serve `dist/` using a static host. For deployment under a repository subpath, set the appropriate `base` in `vite.config.ts`. Keep the contact destinations complete before publishing.
