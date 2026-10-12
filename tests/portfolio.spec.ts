import { test, expect } from '@playwright/test';

test('portfolio chapters and project details follow selection', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', {name:'EXPLORE THE WORK'}).click();
  await expect(page.getByRole('heading', {level:1})).toContainText('SocialPoster.');
  await page.getByRole('button', {name:'VIEW PROJECT DETAILS'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('heading', {level:2})).toHaveText('SocialPoster');
  await page.getByRole('button', {name:'Next project'}).click();
  await expect(page.getByRole('heading', {level:2})).toHaveText('Event Booking System');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', {name:'VIEW PROJECT DETAILS'})).toBeFocused();
});

test('resume is readable and downloadable', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button', {name:'READ RESUME'}).click();
  await expect(page.getByRole('dialog')).toContainText('Swaragh Technology');
  const download=page.waitForEvent('download');
  await page.getByRole('link', {name:'Download text'}).click();
  expect((await download).suggestedFilename()).toBe('Sanjana-Resume.txt');
  await page.getByRole('button', {name:'Close details'}).click();
  await expect(page.getByRole('button', {name:'READ RESUME'})).toBeFocused();
});

test('navigation works at desktop and mobile widths', async ({page}) => {
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:900});
    await page.goto('/');
    await page.getByRole('button', {name:'Open navigation'}).click();
    await expect(page.locator('.navset')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', {name:'Open navigation'})).toBeFocused();
    await page.getByRole('button', {name:'Open navigation'}).click();
    await page.locator('.navlinks').getByRole('link', {name:'WORK',exact:true}).click();
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.getByRole('button', {name:'Open navigation'})).toHaveAttribute('aria-expanded','false');
  }
});

test('motion toggle and reduced motion stop parallax', async ({page}) => {
  await page.goto('/');
  await page.getByRole('button',{name:'Pause motion'}).click();
  await expect(page.locator('.cinema')).toHaveClass(/motion-disabled/);
  await page.mouse.move(100,100);
  expect(await page.locator('.scene-world').evaluate(el=>getComputedStyle(el).transform)).toBe('none');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload();
  await expect(page.getByRole('button',{name:'Enable motion'})).toBeDisabled();
});

test('responsive portfolio loads locally without overflow or errors', async ({page}) => {
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const [width,height] of [[320,700],[390,844],[768,900],[1024,768],[1440,900],[1600,600]]){
    await page.setViewportSize({width,height});await page.goto('/');
    await page.evaluate(async()=>{for(const img of document.images){img.loading='eager';await img.decode()}await document.fonts.ready});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const hero=await page.locator('.hero').boundingBox();const dock=await page.locator('.dock').boundingBox();
    expect(hero!.y+hero!.height).toBeLessThan(dock!.y);
    await expect(page.getByRole('heading',{level:1})).toBeVisible();
  }
  expect(errors).toEqual([]);
});
