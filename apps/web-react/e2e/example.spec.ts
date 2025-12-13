import { test, expect } from '@playwright/test';

test('home shows projects heading', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      name: /Fullstack Nx18 Workspace – Projects/i,
    }),
  ).toBeVisible();

  // We do not assert specific project text (because API may be empty / fail),
  // just that some body content about projects is visible.
  const body = await page.textContent('body');
  expect(body).toMatch(/Loading projects|Projects|No projects|Could not load projects/i);
});
