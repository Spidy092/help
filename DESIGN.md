---
name: Sanjana Portfolio
description: A motion-led front-end developer portfolio
colors:
  paper: "#eef1f6"
  ink: "#20242a"
  muted: "#545d6e"
  line: "#c9cfdb"
  blue: "#2d4fc9"
  panel: "#e2e8f1"
  image-stage: "#dce3f1"
  white: "#fff"
  button-text: "#fff"
  dark-paper: "#191e29"
  dark-ink: "#eef1f6"
  dark-muted: "#b4bdcd"
  dark-line: "#3b4659"
  dark-blue: "#a5b6ff"
  dark-panel: "#232c3d"
  dark-image-stage: "#2b354b"
  dark-white: "#202938"
  dark-button-text: "#171e31"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(72px, 8.1vw, 96px)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(48px, 5.2vw, 76px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  role:
    fontFamily: "Manrope, sans-serif"
    fontSize: "30px"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    lineHeight: 1.9
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 600
rounded:
  thumbnail: "4px"
  stage-image: "5px"
  project-image: "8px"
  disclosure: "12px"
  stage: "14px"
  circular: "50%"
spacing:
  header-action-gap: "8px"
  storyboard-gap: "18px"
  nav-gap: "24px"
  project-column-gap: "36px"
  hero-column-gap: "52px"
components:
  primary-link:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.button-text}"
    padding: "18px 22px"
  icon-button:
    rounded: "{rounded.circular}"
    width: "40px"
    height: "40px"
  icon-button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  project-details:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.disclosure}"
    padding: "24px"
---

# Design System: Sanjana Portfolio

## Overview

**Creative North Star: "Motion Storyboard"**

Project interfaces become selectable storyboard frames. Cool porcelain, cobalt and graphite keep the presentation crisp; condensed display typography gives the developer’s name and section headings a strong editorial rhythm.

Motion supports exploration through a tilted featured stage, directional image reveals and scroll-linked project images. Project descriptions, career information and honest availability states remain readable without animation.

**Key Characteristics:**
- Selectable project storyboard
- Condensed headings and clear sans-serif body copy
- Matte image stages with restrained shadows
- Light and dark palettes with shared semantic roles
- Motion that respects reduced-motion preferences

## Colors

The palette pairs cool porcelain surfaces with cobalt actions and graphite text. `src/index.css` is the normative color source; the frontmatter preserves its values. The sidecar’s eight-step OKLCH tonal ramps are synthesized panel previews, not additional implemented application tokens.

### Primary

- **Cobalt (`blue`)** marks the hero name, heading accents, links, selected storyboard rules and focus outlines.
- **Pale cobalt (`dark-blue`)** replaces the accent in dark mode; dark primary buttons use `dark-button-text` for their text.

### Neutral

- `paper` is the page and header background; `ink` is primary text; `muted` is descriptions and metadata; `line` is borders and separators.
- `panel` is disclosure and portrait backing; `image-stage` is the matte mockup field; `white` is the featured stage, circular image actions and resume preview. The semantic name `white` becomes a blue-gray surface in dark mode.
- Dark mode replaces all nine semantic roles through `:root[data-theme="dark"]`. The toggle persists `portfolio-theme` in localStorage; a fresh session defaults to light, rather than following the operating system.

## Typography

**Display Font:** Barlow Condensed, sans-serif. Self-hosted through Fontsource Latin files at weights 600 and 700.

**Body Font:** Manrope, sans-serif. Self-hosted through Fontsource Latin files at weights 400, 500 and 600. The wordmark requests 700, although no Manrope 700 file is imported; global `font-synthesis: none` is set.

- Hero display: 700, `clamp(72px, 8.1vw, 96px)`, line-height `.96`, tracking `-.025em`, uppercase, no wrapping. At ≤1100px it is 90px; at ≤767px it becomes `clamp(74px, 19vw, 96px)`.
- Section headings: 600, `clamp(48px, 5.2vw, 76px)`, line-height `.96`, tracking `-.025em`; 52px on mobile. Contact uses `clamp(56px, 6.3vw, 88px)` and 62px on mobile.
- Role statement: 500, 30px/1.25, tracking `-.035em`; 24px at ≤1100px and 25px at ≤767px.
- Body: hero description 14px/1.9 at 355px maximum width; project descriptions 13px/1.85 at 600px maximum; about copy 15px/1.9 at 490px maximum. Mobile sizes are 13px, 12px and 13px respectively.
- Project titles: Manrope 22px with `-.04em` tracking, 20px on mobile. Navigation is 12px/600, 11px at ≤1100px and 14px in the mobile menu. Metadata generally spans 9–11px. Frame counts use tabular numerals.

## Layout

The desktop wrapper is `min(1280px, calc(100% - 112px))`, centered. The header is 88px tall with 56px horizontal padding. It is relative, not sticky. The hero has `1fr 1.06fr` columns, `36px 52px` gaps, 60px top and 48px bottom padding, and 720px minimum height. Its three-column storyboard spans both columns.

Work uses two columns with `60px 36px` gaps; the first project spans both. Default image stages have aspect ratio 1.55 and 35px padding; the featured project uses 2.2 and `50px 15%`. About uses `.75fr 1fr` with an 11% gap. Skills and experience use `1fr 1.3fr` with 70px gaps. Resume uses `1fr auto`; contact uses `1.2fr 1fr` with an 80px gap. Generous section padding ranges from 70px to 100px on desktop.

- **≥1600px:** hero minimum height 770px, vertically centered; name 96px.
- **≤1100px:** wrapper subtracts 64px, header padding 32px, hero minimum height 650px with `35px 25px` gaps; thumbnail width 54px; stage image ratio 1.3. Skills/experience gaps reduce to 40px, contact to 45px.
- **≤767px:** wrapper subtracts 40px, header 72px with 20px padding. Main section grids and storyboard stack into one column. Work images use ratio 1.5 and 26px padding. Hero has no minimum height. Mobile section padding is generally 30–65px. Skill lists retain three columns. Portrait is 85% wide, max 360px, ratio 1.08. Navigation becomes a two-column menu below the header; footer wraps.

The body has a 320px minimum width. Anchor scrolling is smooth with 95px scroll padding. Print CSS isolates the opened resume preview, uses white/black and 11pt resume text; this is browser print output, not a committed PDF.

## Elevation & Depth

Depth comes from matte tonal fields, image layering and a featured stage rotated -3 degrees. Two structural shadows are implemented: stage `0 22px 42px -20px #15254850`; project mockup `0 20px 28px -16px #16214466`. The selected frame has `inset 0 2px var(--blue)` plus an accent top rule. Both themes use the same shadow declarations.

## Shapes

The primary link is rectangular. Icon buttons and image action buttons are circular. Radii are 4px for thumbnails, 5px for the stage image, 8px for project images, 12px for details/resume panels and 14px for stages/portrait. One-pixel rules structure navigation and section boundaries. Tech labels are plain text separated by 15px gaps.

## Components

- **Primary link:** accent fill, button-text foreground, 13px/600, 18px 22px padding, minimum height 54px. Hover expands its arrow gap from 30px to 42px over .25s.
- **Icon button:** 40px circle, one-pixel line border; ink fill/paper foreground on hover over .2s. Storyboard previous/next controls use 34px circles.
- **Navigation:** seven section anchors, closing the mobile menu on selection. A 2px accent underline grows over .2s on hover. Menu button exposes `aria-expanded`; Escape closes the menu.
- **Storyboard:** three manual selectors with `aria-pressed`. Previous/next wrap modulo three. Selected border and inset rule show state; hover scales thumbnails to 1.06 over .3s. The current title has `aria-live="polite"`. No timer advances projects.
- **Project card:** image button and text toggle share a disclosure state with `aria-expanded` and `aria-controls`. Only one project can be expanded at a time. The 48px arrow action rotates 45 degrees on hover over .25s (40px on mobile). Hidden detail panels use the `hidden` attribute.
- **Resume:** plain text download, inline text preview and browser print action. Preview toggle exposes expanded state. Contact displays a pending message until verified email is supplied; empty demo/repository URLs do not render links. No input form is implemented.

### Motion and accessibility

GSAP runs its entrance/scroll timelines only under `prefers-reduced-motion: no-preference`. Hero text rises from y=32 with an 80% lower clip to y=0/unclipped over 1.1s `expo.out`. Stage starts at rotation 0/y=24 and settles at -3°/y=0 over 1.3s `expo.out`. Work images move from y=28 to -16 between `top bottom` and `bottom top`, linear with ScrollTrigger `scrub: 1`. Selecting a project reveals its image from a right-side 100% clip and scale 1.025 to unclipped/scale 1 over .65s `expo.out`.

Reduced motion disables these GSAP sequences, removes stage rotation and work-image transforms, changes smooth scrolling to auto and reduces CSS animation/transition durations to .01ms. Buttons and links have a 3px accent focus outline with 5px offset. A keyboard-visible skip link targets main content. Informative mockups use alt text; duplicate selector thumbnails are decorative. Controls are native buttons/links, with labels on icon-only actions. These are implementation facts, not a claim of a completed accessibility certification.

## Do's and Don'ts

- Use semantic CSS variables so both themes remain coherent.
- Keep the project mockups and verified career information central.
- Use explicit button labels, visible keyboard focus and honest unavailable-link states.
- Preserve the reduced-motion fallback and responsive stacking.

- Do not invent contact destinations, project outcomes or downloadable PDF files.
- Do not add autoplay to the manual project selector.
- Do not turn every text label into a pill or every section into a card.
- Do not hard-code the light palette into interactive controls.
