import { test, expect } from "@playwright/test";

// READ-ONLY end-to-end coverage against the real dev server + DB.
// These tests never submit, save, or delete - mutations are covered in the
// component tests with mocks.

test.describe("CL Poster - dashboard", () => {
  test("homepage loads and shows the templates list", async ({ page }) => {
    await page.goto("/");
    // Header brand + template count.
    await expect(page.getByRole("heading", { name: "CL Poster" })).toBeVisible();
    await expect(page.getByText(/templates/)).toBeVisible();
    // The New Post link is present.
    await expect(page.getByRole("link", { name: "+ New Post" })).toBeVisible();
    // At least one post row renders (Copy action appears on rows).
    await expect(page.getByText("Copy").first()).toBeVisible();
  });

  test("week navigation changes the displayed week label", async ({ page }) => {
    await page.goto("/");
    const label = page.locator("text=/Week \\d+ \\//");
    await expect(label).toBeVisible();
    const before = await label.textContent();
    // Right arrow advances the week.
    await page.getByRole("button", { name: "→" }).click();
    await expect(label).not.toHaveText(before ?? "");
  });

  test("All toggle reveals every template", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.getByText(/All \d+ posts/)).toBeVisible();
  });

  test("clicking a post opens its detail page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Copy").first()).toBeVisible();
    // Post-row links point at /posts/<numeric id>; the "+ New Post" link is /posts/new,
    // so exclude it. CSS :not() keeps us on a real post detail link.
    const numericPostLink = page.locator('a[href^="/posts/"]:not([href="/posts/new"])').first();
    await numericPostLink.click();
    await expect(page).toHaveURL(/\/posts\/\d+/);
    // Detail view shows the Dashboard back link + Edit action.
    await expect(page.getByRole("link", { name: "← Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Edit" })).toBeVisible();
  });
});

test.describe("CL Poster - new post (read-only)", () => {
  test("new post page loads and Auto-Generate fills the form", async ({ page }) => {
    await page.goto("/posts/new");
    await expect(page.getByRole("heading", { name: "New Post Template" })).toBeVisible();

    const title = page.getByPlaceholder("Your CL post title");
    const body = page.getByPlaceholder("Your CL post body");
    await expect(title).toHaveValue("");

    // Auto-Generate populates the fields (no save - read-only).
    await page.getByRole("button", { name: "Auto-Generate" }).click();
    await expect(title).toHaveValue(/Full-Stack Web Developer/);
    await expect(body).not.toHaveValue("");
  });
});
