import { test, expect } from '@playwright/test';

test.describe('Admin Tabs Visibility', () => {
  test('should show only technician tabs when technician role selected', async ({ page }) => {
    await page.goto('/');
    
    // Switch to Technician role
    await page.click('button:has-text("Technician")');
    
    // Should show technician tabs
    await expect(page.locator('text=Internal Transfer')).toBeVisible();
    await expect(page.locator('text=Warranty Claims')).toBeVisible();
    
    // Should NOT show admin tabs
    await expect(page.locator('text=Invite New Members')).not.toBeVisible();
    await expect(page.locator('text=Reports')).not.toBeVisible();
    await expect(page.locator('text=Settings')).not.toBeVisible();
  });

  test('should show all tabs when admin role selected', async ({ page }) => {
    await page.goto('/');
    
    // Switch to Admin role
    await page.click('button:has-text("Admin")');
    
    // Should show all tabs
    await expect(page.locator('text=Internal Transfer')).toBeVisible();
    await expect(page.locator('text=Warranty Claims')).toBeVisible();
    await expect(page.locator('text=Invite New Members')).toBeVisible();
    await expect(page.locator('text=Reports')).toBeVisible();
    await expect(page.locator('text=Settings')).toBeVisible();
    await expect(page.locator('text=Security Dashboard')).toBeVisible();
    await expect(page.locator('text=Health Checker')).toBeVisible();
  });

  test('should navigate to admin pages when admin', async ({ page }) => {
    await page.goto('/');
    await page.click('button:has-text("Admin")');
    
    // Test navigation to each admin page
    await page.click('text=Invite New Members');
    await expect(page).toHaveURL('/invite-members');
    
    await page.click('text=Reports');
    await expect(page).toHaveURL('/reports');
    
    await page.click('text=Settings');
    await expect(page).toHaveURL('/settings');
    
    await page.click('text=Security Dashboard');
    await expect(page).toHaveURL('/security-dashboard');
    
    await page.click('text=Health Checker');
    await expect(page).toHaveURL('/health-checker');
  });
});
