import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'

test('all chapters and verified project content are present', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('SANJANA.')
  for (const id of ['home', 'projects', 'about', 'skills', 'experience', 'resume', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached()
  await expect(page.locator('#experience')).toContainText('Swaragh Technology')
  await expect(page.locator('#project-0')).toContainText('Chart.js')
  await expect(page.locator('#project-1')).toContainText('LocalStorage')
  await expect(page.locator('#project-2')).toContainText('Axios')
  await expect(page.locator('body')).not.toContainText('sub-millisecond')
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0)
  await expect(page.locator('#contact')).toContainText('Contact details pending')
})

test('hero actions and direct navigation use native section anchors', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Explore selected work', exact: true }).click()
  await expect(page).toHaveURL(/#projects$/)
  await page.locator('.desktop-nav').getByRole('link', { name: 'Experience', exact: true }).click()
  await expect(page).toHaveURL(/#experience$/)
  await expect(page.locator('.desktop-nav a[href="#experience"]')).toHaveAttribute('aria-current', 'location')
})

test('three project detail views cycle and return focus', async ({ page }) => {
  await page.goto('/')
  const opener = page.locator('#project-0').getByRole('button', { name: 'View project details' })
  await opener.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('SocialPoster')
  await expect(dialog).toContainText('Media library with cropping, compression and tagging')
  await dialog.getByRole('button', { name: 'Next: Event Booking System' }).click()
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('Event Booking System')
  await dialog.getByRole('button', { name: 'Next: Online Job Portal' }).click()
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('Online Job Portal')
  await dialog.getByRole('button', { name: 'Next: SocialPoster' }).click()
  await expect(dialog.getByRole('heading', { level: 2 })).toHaveText('SocialPoster')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(opener).toBeFocused()
})

test('full-screen navigation traps focus, escapes and selects destinations on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: 'Open navigation' })
  await menu.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Shift+Tab')
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true)
  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(menu).toBeFocused()
  await menu.click()
  await dialog.getByRole('link', { name: /03 Skills/ }).click()
  await expect(page).toHaveURL(/#skills$/)
  await expect(dialog).not.toBeVisible()
})

test('social feature studies disclose the selected feature', async ({ page }) => {
  await page.goto('/')
  const study = page.locator('.calendar-study')
  await study.getByRole('button', { name: 'Media', exact: true }).click()
  await expect(study).toContainText('Cropping, compression and tagging')
  await expect(study.getByRole('button', { name: 'Media', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await study.getByRole('button', { name: 'Analytics', exact: true }).click()
  await expect(study).toContainText('Follower growth, clicks and impressions')
})

test('seat demonstration is reversible and makes no booking', async ({ page }) => {
  await page.goto('/')
  const seat = page.getByRole('button', { name: 'Seat 4', exact: true })
  await seat.click()
  await expect(seat).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.seat-status')).toContainText('Seat 4 selected')
  await seat.press('Enter')
  await expect(seat).toHaveAttribute('aria-pressed', 'false')
  await expect(page.locator('.ticket-study')).toContainText('No booking is made')
})

test('information wall can be filtered, arranged and reversed', async ({ page }) => {
  await page.goto('/')
  const study = page.locator('.information-study')
  await study.getByRole('button', { name: 'Arrange information' }).click()
  await study.getByRole('button', { name: 'Reset composition' }).click()
  await study.getByRole('button', { name: 'Arrange information' }).click()
  await expect(study.getByRole('button', { name: 'Reset composition' })).toHaveAttribute('aria-pressed', 'true')
  await study.getByRole('button', { name: 'Profile', exact: true }).click()
  await expect(study.locator('.information-row')).toHaveCount(1)
  await expect(study.locator('.information-row')).toContainText('Resume upload')
  await study.getByRole('button', { name: 'All', exact: true }).click()
  await expect(study.locator('.information-row')).toHaveCount(3)
})

test('skills connect to actual projects or professional process', async ({ page }) => {
  await page.goto('/')
  await page.locator('#skills').getByRole('button', { name: 'TypeScript', exact: true }).click()
  await expect(page.locator('.skill-connection')).toContainText('SocialPoster')
  await expect(page.locator('.connection-links a')).toHaveCount(1)
  await page.locator('#skills').getByRole('button', { name: 'Git', exact: true }).click()
  await expect(page.locator('.skill-connection')).toContainText('everyday development toolkit')
  await expect(page.locator('.connection-links a')).toHaveAttribute('href', '#experience')
})

test('resume downloads real text, print mode isolates it, and Escape returns focus', async ({ page }) => {
  await page.goto('/')
  const opener = page.locator('.header-resume')
  await page.setViewportSize({ width: 768, height: 1000 })
  await opener.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toContainText('Swaragh Technology')
  const pending = page.waitForEvent('download')
  await dialog.getByRole('link', { name: 'Download text' }).click()
  const download = await pending
  expect(download.suggestedFilename()).toBe('Sanjana-Resume.txt')
  expect(await readFile((await download.path())!, 'utf8')).toContain('SocialPoster')
  await page.evaluate(() => { window.print = () => { document.documentElement.dataset.printCalled = 'true' } })
  await dialog.getByRole('button', { name: 'Print / save PDF' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-print-called', 'true')
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('main')).not.toBeVisible()
  await expect(page.locator('.shared-geometry')).not.toBeVisible()
  await expect(page.locator('.resume-document')).toBeVisible()
  await page.emulateMedia({ media: 'screen' })
  await page.keyboard.press('Escape')
  await expect(opener).toBeFocused()
})

test('motion pause reverts scenes and persists, and system reduced motion overrides it', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Pause motion' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off')
  await page.mouse.move(1100, 380)
  expect(await page.locator('.hero-sculpture .parallax-layer').evaluate(el => getComputedStyle(el).transform)).toBe('none')
  await page.reload()
  await expect(page.getByRole('button', { name: 'Enable motion' })).toBeVisible()
  await page.getByRole('button', { name: 'Enable motion' }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.getByRole('button', { name: 'Reduced motion enabled by system' })).toBeDisabled()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.getByRole('button', { name: 'Pause motion' })).toBeEnabled()
})

test('failed preview image has a useful fallback and working retry', async ({ page }) => {
  await page.route('**/social_poster_mockup.png', route => route.abort())
  await page.goto('/')
  const art = page.locator('#project-0 .project-art')
  await expect(art).toContainText('The image couldn’t load')
  await page.unroute('**/social_poster_mockup.png')
  await art.getByRole('button', { name: 'Retry image' }).click()
  await expect(art.locator('.preview-image')).toHaveClass(/image-loaded/)
})

test('touch-only studies and project actions work', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
  const page = await context.newPage()
  await page.goto('/')
  await page.locator('.calendar-study').getByRole('button', { name: 'Media', exact: true }).tap()
  await expect(page.locator('.calendar-study')).toContainText('Cropping')
  await page.getByRole('button', { name: 'Seat 3', exact: true }).tap()
  await expect(page.locator('.seat-status')).toContainText('Seat 3 selected')
  await page.locator('#project-2').getByRole('button', { name: 'View project details' }).tap()
  await expect(page.getByRole('dialog').getByRole('heading', { level: 2 })).toHaveText('Online Job Portal')
  await context.close()
})

test('all sizes load local assets without overflow or runtime errors, even without WebGL', async ({ page }) => {
  test.slow()
  const errors: string[] = []
  const remote: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:5173') && !request.url().startsWith('data:')) remote.push(request.url()) })
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: unknown[]) {
      if (type.includes('webgl')) return null
      return Reflect.apply(original, this, [type, ...args])
    } as typeof HTMLCanvasElement.prototype.getContext
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const [width, height] of [[320, 700], [390, 844], [768, 1000], [1024, 768], [1440, 900], [1600, 900]]) {
    await page.setViewportSize({ width, height })
    await page.goto('/')
    await page.evaluate(async () => { for (const image of document.images) { image.loading = 'eager'; await image.decode() } await document.fonts.ready })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    for (const id of ['home', 'projects', 'about', 'skills', 'experience', 'resume', 'contact']) {
      const box = await page.locator(`#${id}`).boundingBox()
      expect(box!.width).toBeLessThanOrEqual(width)
      expect(box!.height).toBeGreaterThan(200)
    }
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  }
  expect(errors).toEqual([])
  expect(remote).toEqual([])
})

test('animated scroll scenes run, reverse, and tolerate rapid overlay dismissal', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  const pose = page.locator('.hero-sculpture .sculpture-pose')
  const before = await pose.evaluate(el => getComputedStyle(el).transform)
  await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }))
  await page.waitForTimeout(800)
  expect(await pose.evaluate(el => getComputedStyle(el).transform)).not.toBe(before)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(800)
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.keyboard.press('Escape')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  expect(errors).toEqual([])
})

test('one shared object joins actual browser/calendar/ticket/wall slots and reverses', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const object = page.locator('.shared-geometry')
  await expect(object).toHaveCount(1)
  await expect(page.locator('[data-geometry-slot]')).toHaveCount(4)
  await expect(object.locator('.shared-target .shared-tile')).toHaveCount(12)
  const endpoints = [
    ['browser', 'translate(22 16) scale(3.6 0.66)'],
    ['calendar', 'translate(22 12) scale(3.6 1.55)'],
    ['ticket', 'translate(0 0) scale(3.15 2.4444444444444446)'],
    ['wall', ''],
  ]
  for (const [shape, expected] of endpoints) {
    const top = await page.locator(`[data-geometry-slot="${shape}"]`).evaluate(element => element.getBoundingClientRect().top + scrollY)
    await page.evaluate(y => window.scrollTo({ top: Math.max(0, y - innerHeight * .42), behavior: 'instant' }), top)
    if (expected) await expect(object.locator('.shared-target .shared-tile').first()).toHaveAttribute('transform', expected)
    await expect.poll(() => page.evaluate(shape => {
      const slot = document.querySelector(`[data-geometry-slot="${shape}"]`)!.getBoundingClientRect()
      const object = document.querySelector('.shared-geometry')!.getBoundingClientRect()
      return Math.abs(slot.left + slot.width / 2 - object.left - object.width / 2) + Math.abs(slot.top + slot.height / 2 - object.top - object.height / 2)
    }, shape)).toBeLessThan(8)
    if (shape === 'wall') {
      await expect.poll(async () => {
        const tile = await object.locator('.shared-target .shared-tile').first().boundingBox()
        const row = await page.locator('.information-row').first().boundingBox()
        return Math.abs(tile!.x-row!.x)+Math.abs(tile!.y-row!.y)+Math.abs(tile!.width-row!.width)+Math.abs(tile!.height-row!.height)
      }).toBeLessThan(8)
    }
  }
  const calendarTop = await page.locator('[data-geometry-slot="calendar"]').evaluate(element => element.getBoundingClientRect().top + scrollY)
  await page.evaluate(y => window.scrollTo({ top: y - innerHeight * .42, behavior: 'instant' }), calendarTop)
  await expect(object.locator('.shared-target .shared-tile').first()).toHaveAttribute('transform', endpoints[1][1])
})

test('mobile carries the actual object through source-to-target crossfades', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const object = page.locator('.shared-geometry')
  await expect(object.locator('.shared-source')).toHaveCSS('opacity', '1')
  await expect(object.locator('.shared-target')).toHaveCSS('opacity', '0')
  const top = await page.locator('[data-geometry-slot="calendar"]').evaluate(element => element.getBoundingClientRect().top + scrollY)
  await page.evaluate(y => window.scrollTo({ top: y - innerHeight * .42, behavior: 'instant' }), top)
  await expect(object.locator('.shared-source')).toHaveAttribute('data-shape', 'calendar')
  await expect(object.locator('.shared-source')).toHaveCSS('opacity', '1')
})

test('GSAP work suspends while hidden and resumes from the same frame', async ({ page }) => {
  await page.goto('/')
  await page.locator('.information-study').getByRole('button', { name: 'Arrange information' }).click()
  const frozen = await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    document.dispatchEvent(new Event('visibilitychange'))
    return getComputedStyle(document.querySelector('.information-row')!).transform
  })
  await expect(page.locator('html')).toHaveAttribute('data-visibility', 'hidden')
  await page.waitForTimeout(750)
  expect(await page.locator('.information-row').first().evaluate(element => getComputedStyle(element).transform)).toBe(frozen)
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(page.locator('html')).toHaveAttribute('data-visibility', 'visible')
  await expect(page.locator('.information-row').first()).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
})

test('image loading overlay stays inside its reserved image box', async ({ page }) => {
  let release = () => {}
  await page.route('**/social_poster_mockup.png', async route => {
    await new Promise<void>(resolve => { release = resolve })
    await route.continue()
  })
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const image = page.locator('#project-0 .preview-image')
  await expect(image).toHaveClass(/image-loading/)
  await expect(image).toHaveCSS('position', 'relative')
  const before = await image.boundingBox()
  const loader = await image.locator('.preview-loader').boundingBox()
  expect(Math.abs(loader!.width - before!.width)).toBeLessThan(1)
  expect(Math.abs(loader!.height - before!.height)).toBeLessThan(1)
  release()
  await expect(image).toHaveClass(/image-loaded/)
  const after = await image.boundingBox()
  expect(Math.abs(before!.width - after!.width)).toBeLessThan(1)
  expect(Math.abs(before!.height - after!.height)).toBeLessThan(1)
})
