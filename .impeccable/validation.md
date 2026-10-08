# Validation

- `npm run build`: pass.
- `npm run lint`: pass.
- `npm run test`: all six browser tests passed.
- Chrome viewport coverage: 320, 390, 768, 1024, 1440 pixels, no horizontal overflow or runtime errors.
- Project controls: previous/next, direct frame selection and project anchor navigation.
- Details: inline disclosure open/close.
- Resume: preview open/close and actual text download.
- Theme: light/dark selection persists after reload.
- Mobile navigation: open, Escape close and section selection.
- Reduced motion: storyboard transforms disabled.
- Final capture evidence: decoded all images and loaded all fonts before captures; desktop/mobile/dark full-page and hero evidence in `.impeccable/review/`.
- Independent Impeccable finish review disposition: ship, no material visual findings. Review scope: supplied screenshots and source, not an independent screen-reader or performance audit.
- Mechanical detector: ran once; selector border warning addressed.
- Publishing gap: verified contact email and project URLs not supplied by original repository. These require completion in `src/data.ts` before publication.
- Original npm development dependencies report audit findings; production-only audit returned no findings. No security hardening claim is made.
