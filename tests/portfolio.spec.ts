import { test, expect } from "@playwright/test";

test("project frames cycle and support direct selection", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Next project", exact: true }).click();
  await expect(page.locator(".stage-bottom")).toContainText(
    "Event Booking System",
  );
  await page
    .getByRole("button", { name: "Previous project", exact: true })
    .click();
  await expect(page.locator(".stage-bottom")).toContainText("SocialPoster");
  await page
    .getByRole("button", { name: "Online Job Portal Search & recruitment" })
    .click();
  await expect(page.locator(".stage-bottom")).toContainText(
    "Online Job Portal",
  );
  await expect(page.locator(".frame-selector.selected")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page
    .getByRole("link", { name: "Read about Online Job Portal" })
    .click();
  await expect(page).toHaveURL(/#project-2$/);
});

test("project details expand inline with correct content", async ({ page }) => {
  await page.goto("/");
  const project = page.locator("#project-0");
  await project.getByRole("button", { name: "Project details" }).click();
  await expect(project.locator(".project-details")).toBeVisible();
  await expect(project.locator(".project-details")).toContainText(
    "Interactive scheduling calendar",
  );
  await project.getByRole("button", { name: "Project details" }).click();
  await expect(project.locator(".project-details")).toBeHidden();
});

test("resume opens, downloads, and closes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Read resume", exact: true }).click();
  await expect(page.locator("#resume-preview")).toBeVisible();
  await expect(page.locator("#resume-preview")).toContainText(
    "Swaragh Technology",
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Download resume", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("Sanjana-Resume.txt");
  await page.getByRole("button", { name: "Close resume", exact: true }).click();
  await expect(page.locator("#resume-preview")).toBeHidden();
});

test("theme selection persists after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("mobile navigation supports Escape and section selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation")).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole("navigation")).toBeHidden();
});

test("all supported widths have loaded assets, no overflow, and no runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(async () => {
      for (const img of document.images) {
        img.loading = "eager";
        await img.decode();
      }
      await document.fonts.ready;
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page
        .locator(".stage")
        .evaluate((element) => getComputedStyle(element).transform),
    ).toBe("none");
  }
  expect(errors).toEqual([]);
});
