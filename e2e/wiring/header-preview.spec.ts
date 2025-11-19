import { test, expect } from '@playwright/test';

test.describe('Header Preview Toggle', () => {
  test('should have preview toggle visible', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Preview:')).toBeVisible();
    await expect(page.locator('button:has-text("Desktop")')).toBeVisible();
    await expect(page.locator('button:has-text("Mobile")')).toBeVisible();
  });

  test('should toggle between desktop and mobile preview modes', async ({ page }) => {
    await page.goto('/');
    
    // Click Mobile
    const mobileButton = page.locator('button:has-text("Mobile")');
    await mobileButton.click();
    
    // Verify Mobile button is active
    await expect(mobileButton).toHaveClass(/bg-white text-primary shadow-sm/);
    
    // Click Desktop
    const desktopButton = page.locator('button:has-text("Desktop")');
    await desktopButton.click();
    
    // Verify Desktop button is active
    await expect(desktopButton).toHaveClass(/bg-white text-primary shadow-sm/);
  });
});
