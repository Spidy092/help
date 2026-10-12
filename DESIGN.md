---
name: Sanjana Cinematic Portfolio
description: Six portfolio chapters inside a dark cinematic interface.
colors:
  night: "#04070d"
  panel: "#0d141e"
  cream: "#e8d1cb"
  ink: "#15131b"
  text: "#f2f3f7"
  headline: "#ffffff"
  body: "#c4cedd"
  muted: "#8d98aa"
  line: "rgba(255,255,255,.18)"
  glass: "rgba(255,255,255,.035)"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "calc(31.5 * var(--t))"
    fontWeight: 700
    lineHeight: "calc(34 * var(--t))"
    letterSpacing: "calc(1.1 * var(--t))"
  body:
    fontFamily: "Inter, -apple-system, Helvetica Neue, Arial, sans-serif"
    fontSize: "calc(11.5 * var(--t))"
    fontWeight: 400
    lineHeight: "calc(20 * var(--t))"
  label:
    fontFamily: "Chakra Petch, sans-serif"
    fontSize: "calc(10 * var(--t))"
    fontWeight: 700
  panel-title:
    fontFamily: "Inter, sans-serif"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: "1.15"
    letterSpacing: "-.035em"
rounded:
  square: "0"
spacing:
  panel-inline: "36px"
  panel-mobile-inline: "22px"
components:
  menu-button:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "calc(41 * var(--t))"
    padding: "0 calc(20 * var(--t))"
  scene-button:
    backgroundColor: "{colors.glass}"
    textColor: "#e9eef7"
    typography: "{typography.label}"
    padding: "0 calc(19 * var(--t))"
  detail-panel:
    backgroundColor: "{colors.panel}"
    textColor: "#e9edf4"
    width: "min(650px, 100vw)"
    height: "100dvh"
---

# Design System: Sanjana Cinematic Portfolio

## Overview

**Creative North Star: “The Cinematic Interface”**

The built portfolio adapts the user-supplied Stratum framing and navigation grammar to Sanjana's existing career and project content. A single fixed viewport holds a smoked-glass sculpture, a fine chamfered perimeter, a left chapter rail, a lower-center headline and a three-part bottom dock. The image supplies atmosphere; the frame and controls supply orientation.

Six manually selected chapters cover Introduction, SocialPoster, Event Booking, Job Portal, About and Experience. Project chapters dim the sculpture and place existing project mockups in a tilted plane with a faint reflected image. Detailed reading moves into a native dialog at the right edge. This is the current dark presentation; the previous porcelain/cobalt scrolling storyboard and theme switch are no longer the design system.

**Key Characteristics:**
- Navy-black environment, white type and pale blush controls.
- Inter display/body with uppercase Chakra Petch navigation labels.
- Chamfered framing and restrained translucent controls.
- Manual chapter navigation with clear active and count states.
- Local motion toggle and system reduced-motion support.

## Colors

The UI palette stays cool and subdued. Warm illumination belongs to the sculpture image rather than a separate UI accent.

### Primary
- **Pale blush** (`cream`): menu fill, slash wordmark, active chapter marker, focus outline and panel actions.

### Neutral
- **Night** (`night`): fixed cinema and page background.
- **Deep navy panel** (`panel`): native detail dialog and sticky panel header.
- **Warm ink** (`ink`): menu text and selection text.
- **White** (`headline`) and **soft white** (`text`): chapter headline and default text.
- **Cool body** (`body`): centered description.
- **Muted steel** (`muted`): inactive chapter links and chapter-count denominator.
- **Fine line** (`line`): frame, dock divisions and panel separators.
- **Smoked glass** (`glass`): scene action surface; its hover fill rises to `rgba(255,255,255,.09)`.

## Typography

**Display and Body Font:** locally bundled Inter, weights 700 and 400.
**Label Font:** locally bundled Chakra Petch, weight 700.

Display text is uppercase and compact. Technical labels are small, tracked and stable in width during the decode animation. Body descriptions remain sentence case.

- **Display:** frontmatter scale on desktop; 34px/36px below 830px; `clamp(23px,6.4vw,32px)` with 1.12 line height below 548px. Desktop lines are separate blocks; mobile joins them into wrapping inline text.
- **Body:** centered at a maximum `calc(460 * var(--t))` width; mobile uses 11px/19px and 360px maximum width.
- **Label:** approximately 10px at the reference scale, with 1.2 scale units of tracking on the rail. The brand uses bold Inter with a Chakra Petch slash.
- **Panel title:** 38px on desktop, 30px below 548px. Panel prose uses 13px/1.9; the intro uses 15px/1.8, reduced to 13px on mobile.

## Layout

The document and root fill the viewport; body scrolling is disabled. `.cinema` is fixed with hidden overflow. Desktop geometry uses `--u: clamp(.68px,min(100vw / 1280,100dvh / 800),1.72px)` and `--t: var(--u)`. The perimeter is inset by roughly 30 scale units; its corners are cut over 26 scale units. The brand sits top-left, masthead top-right, rail left-center, hero lower-center and dock at the bottom inside the frame.

Project planes use 530 × 310 scale units, positioned at 50% horizontal and 36% vertical, with perspective rotation. Mobile retains the cinematic composition, moving the rail to the upper-left below the wordmark and cropping the sculpture vertically. At 830px and below, navigation links and resume move into the menu surface. At 548px and below, the hero sits 78px above the frame bottom and the dock uses smaller labels. At 370px and below, the dock wraps into two rows. Short-height rules compact the headline and hide the blurb on small screens.

The native dialog is independently scrollable, full viewport height, up to 650px wide, and flush to the right. It becomes full width on small screens. Its header remains sticky; panel body padding is 50px 36px 40px, reduced to 35px 22px on mobile.

## Elevation & Depth

Depth comes from the sculpture raster, the dimmed background in project chapters, a tilted mockup plane and its blurred reflection. UI glass uses backdrop blur of 12px; navigation uses 16px. The dialog backdrop darkens and blurs the scene by 8px.

- **Project plane:** `0 28px 90px -22px rgba(0,0,0,.8)`.
- **Detail dialog:** `-25px 0 90px rgba(0,0,0,.45)`.
- **Reflection:** 0.16 opacity, 3px blur, vertical flip and a transparent-to-black mask.

## Shapes

The main silhouette is a fine rectangular frame with diagonal chamfers. Menu and scene actions also use polygon clipping; they do not use rounded pill geometry despite the internal `.pill` class name. Detail panels, project planes and secondary panel buttons remain square. Dividers are one pixel and translucent.

## Components

### Scene action
A transparent chamfered button with a glass layer, plus icon, uppercase label and outward arrow. Hover brightens the glass. Minimum height is 42 scale units on desktop and 44px at responsive sizes, with short-height compaction. Focus is a blush outline inset by 4px.

### Masthead and menu
Desktop links, resume and blush MENU control share a horizontal line. MENU can open an overlay on desktop as well as mobile. The overlay uses a dark translucent surface; mobile adds clipped corners. Open state sets `aria-expanded`, focuses the first link and supports Escape and outside pointer dismissal.

### Chapter rail and dock
The six chapter links retain hashes and mark the current chapter with `aria-current="page"`, brighter text and a blush block to the left. Previous/next dock buttons wrap through all six chapters, with a two-digit count. The dock also holds MOTION ON/OFF and READ RESUME.

### Native detail panel
Project, biography, experience, resume and contact views share a native `dialog` opened with `showModal()`. A close control, sticky wordmark header and footer frame the content. Close returns focus to the invoking element. Project details use an uncropped reading image, descriptive prose and a next-project action. Resume offers the existing text download and print workflow. Contact availability remains explicit where destinations are unverified.

### Motion
The entry draws frame edges, raises masked headline lines and settles controls in a stagger. Chapter text swaps after 380ms, while scenes crossfade over 900ms. Hover/focus labels decode over 400ms without changing their reserved width. Pointer parallax applies to the decorative world, ignores touch and stops when motion is disabled. The local toggle is session state; it does not persist across reloads. System reduced motion disables the toggle and removes CSS transitions and animations.

## Do's and Don'ts

### Do:
- **Do** preserve the supplied Stratum composition while using Sanjana's verified portfolio content.
- **Do** keep chapter selection manual, hashes meaningful and detail reading in the native panel.
- **Do** use the fine chamfered frame, square panel geometry and restrained blush accent consistently.
- **Do** retain visible focus, accessible label text, focus restoration and both motion fallbacks.

### Don't:
- **Don't** reintroduce the stale light/cobalt palette, condensed type or scrolling storyboard rules.
- **Don't** make the decorative sculpture or project scene an inaccessible source of essential text.
- **Don't** invent project outcomes, contact destinations or a PDF resume.
- **Don't** add automatic chapter playback or persist the motion toggle without an intentional behavior change.
