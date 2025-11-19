import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/PartPulse/);
    await expect(page.locator('h1')).toContainText('Welcome to PartPulse');
  });

  test('should navigate to Internal Transfer page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Internal Transfer');
    await expect(page).toHaveURL('/internal-transfer');
    await expect(page.locator('h1')).toContainText('Internal Transfer');
  });

  test('should navigate to Warranty Claims page', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Warranty Claims');
    await expect(page).toHaveURL('/warranty-claims');
    await expect(page.locator('h1')).toContainText('Warranty Claims');
  });
});

test.describe('Admin Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Switch to Admin role
    await page.click('button:has-text("Admin")');
  });

  test('should show admin-only tabs when admin role selected', async ({ page }) => {
    await expect(page.locator('text=Invite New Members')).toBeVisible();
    await expect(page.locator('text=Reports')).toBeVisible();
    await expect(page.locator('text=Settings')).toBeVisible();
    await expect(page.locator('text=Security Dashboard')).toBeVisible();
    await expect(page.locator('text=Health Checker')).toBeVisible();
  });

  test('should navigate to Reports page', async ({ page }) => {
    await page.click('text=Reports');
    await expect(page).toHaveURL('/reports');
    await expect(page.locator('h1')).toContainText('Reports');
  });

  test('should navigate to Health Checker page', async ({ page }) => {
    await page.click('text=Health Checker');
    await expect(page).toHaveURL('/health-checker');
    await expect(page.locator('h1')).toContainText('Health Checker');
  });
});
