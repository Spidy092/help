---
name: Sanjana — Interface Experiment
description: A tactile native-scroll exhibition of frontend craft.
colors:
  ink: "#111211"
  paper: "#f4f0e8"
  citron: "#deff38"
  violet: "#8976ff"
  silver: "#c9cbcd"
  line: "#42463f"
  muted: "#b1b5aa"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(84px,8.4vw,128px)"
    fontWeight: 700
    lineHeight: 0.91
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(38px,4vw,60px)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-.015em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: ".06em"
rounded:
  square: "0"
spacing:
  gutter: "clamp(20px,4.45vw,64px)"
  gutter-mobile: "20px"
  chapter: "100px"
components:
  action-primary:
    backgroundColor: "{colors.citron}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "16px 22px"
    typography: "{typography.label}"
  action-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "16px 22px"
  detail-dialog:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    width: "min(1100px,calc(100vw - 48px))"
---

# Design System: Sanjana — Interface Experiment

## Overview

**Creative North Star: "The Interface Experiment"**

Interfaces become tactile objects, assemble into usable project stories, and reveal the developer’s craft. The built exhibition pairs an ink environment with paper reading surfaces, condensed headlines, technical annotations and bright directional controls.

Native scrolling connects seven complete chapters. The sculpture is authored CSS/SVG geometry; original project mockups and the portrait remain the evidence. Motion adds continuity while the paused and reduced-motion views retain every chapter and interaction.

**Key Characteristics:**
- Ink/paper alternation with citron actions and violet inserts.
- Condensed display, calm body copy and monospaced annotations.
- Sharp structural boundaries and layered interface objects.
- Native scroll with complete static parity.

## Colors

### Primary
- **Citron:** directional actions, selected tools and seats, active navigation, chapter labels and keyboard focus on ink.

### Secondary
- **Violet:** folded sculpture insert, information-filter selection and information-wall geometry outlines.

### Neutral
- **Ink:** exhibition background and primary text on paper.
- **Paper:** reading chapters, browser plane, resume and light ticket study.
- **Silver:** structure plane, shared fragments and secondary body text.
- **Structural line:** chapter boundaries and restrained control outlines.
- **Muted:** supporting descriptions and quiet annotations.

**The Surface Contrast Rule.** Paper chapters use dark text and darker focus outlines; ink chapters use paper text and citron focus.

## Typography

Self-hosted Barlow Condensed (700) supplies display and headings; Manrope (400/600) supplies readable prose; IBM Plex Mono (400) supplies uppercase annotations and controls. The frontmatter records desktop roles, not a universal size for every paragraph.

Hero role text uses a smaller condensed scale (`clamp(33px,3.8vw,58px)`). Project titles use 36px condensed type; project descriptions use 21px/1.7 with a 42ch measure. Hero body copy has a 53ch maximum. Full-screen menu destinations reach 100px on desktop and use 58px on mobile. Meaningful mobile annotations and controls are at least 12px; smaller lettering belongs to decorative sculpture artwork.

## Layout

Seven native-scroll chapters: Arrival, Work Gallery, About, Toolbox, Experience, Resume and Contact. Work contains three distinct exhibits: SocialPoster, Event Booking System and Online Job Portal. A sticky header and six destination anchors provide orientation; numbered chapter labels remain visible.

Chapter content is centered within 1536px and uses the responsive gutter token. Desktop hero is a 1.15fr/.85fr split with 64px gap; project reading uses 1.2fr/1fr with 55px gap. The 48px hero grid is a structural backdrop. Paper alternation belongs to the event exhibit, About and Resume. At 1023px and below desktop navigation moves into the menu; at 767px and below primary layouts stack, gutters become 20px, toolbox becomes one column and details use narrow viewport insets. Native anchors reserve space below the sticky header.

## Elevation & Depth

Most reading surfaces are flat and outlined. Depth belongs to the physical browser, silver structure, citron fold and violet insert, produced by rotation, perspective and local shadows. Browser-plane shadow is `13px 22px 32px #0005`; detail-dialog shadow is `0 20px 70px #0008`. This is tactile layering, not glass UI. Original project mockups remain uncropped inside their image containers.

## Shapes

Sharp rectangular controls, thin boundaries, crosshair corners and layered paper planes define the world. Buttons have square corners. Ticket perforation and the 12-seat grid express ticketing; the information wall uses offset rectangular cards. There is no chamfered global cinema frame.

## Components

### Actions
Citron primary and outlined secondary actions share uppercase mono labels, inline arrows, a 50px minimum height and square corners. Hover shifts upward by 2px; pressed state moves down by 1px. Focus uses a 2px outline with 5px offset. On paper, primary actions invert to ink/paper. Fine-pointer magnetic movement is decorative and obeys motion settings.

### Header and menu
The sticky ink header carries the wordmark, anchor navigation, motion toggle and citron MENU button. Active desktop links show citron text and an underline. Menu is a full-screen native dialog with oversized condensed destinations, active citron text and a supporting resume panel; it stacks on mobile.

### Project exhibits and studies
Each exhibit pairs an original mockup with exact source descriptions, features, bordered technology tags, details and a next anchor. Calendar feature tabs disclose scheduling/analytics/media notes. Twelve accessible seat buttons toggle one selected seat and explicitly make no booking. Violet information filters and Arrange/Reset controls alter an illustrative wall. Selected states stay visible without animation.

### Shared interface geometry
One fixed SVG carries 12 fragments through measured slots in the actual hero browser, calendar, live seat grid and information wall. ScrollTrigger drives native-scroll progress with GSAP smoothing; desktop interpolates fragment bounds and mobile crossfades the same object between forms. Wall fragments follow actual filtered/arranged card bounds; seat selection updates its geometry state. Motion off removes the shared object and restores static geometry in every slot. The finale has standalone browser geometry and the authored return assembly.

### Details, resume and honest empty state
Project details and resume use a centered, scrollable native dialog with sticky close header, Escape support and focus return. Detail prose uses verified source data, original artwork and next-project navigation. Resume provides the actual text download plus an isolated print/save-PDF preview; it does not claim a committed PDF. Contact clearly states pending details and offers working resume actions. No input form or submission state exists.

### Motion
Assembly lasts 750ms; reveals 450ms; hover 180ms; overlay entry 350ms and exit 250ms, using `power3.out` for the main grammar. Scroll reveals reverse. Fine-pointer sculpture depth uses GSAP smoothing; touch has no hover dependency. The pause preference persists locally; live system reduced motion takes precedence. Document hiding suspends GSAP/ScrollTrigger/ticker and resuming restores them. Scoped timelines and listeners clean up on unmount or preference changes.

## Do's and Don'ts

### Do:
- **Do** retain the seven chapter anchors and three original project exhibits.
- **Do** use original mockups and the portrait with truthful captions.
- **Do** keep visible keyboard focus, reversible studies and native dialog focus restoration.
- **Do** preserve immediate static geometry and readable content when motion is off.

### Don't:
- **Don’t** restore the superseded fixed cinematic viewport, blush palette or chapter rail.
- **Don’t** replace native scrolling with scroll-jacking or mandatory pinned scenes.
- **Don’t** invent outcomes, contact destinations, project links or a supplied PDF.
- **Don’t** require hover, animation or WebGL to reach essential content.
