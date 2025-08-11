import { test, expect } from '@playwright/test';

test('user can log in and log out successfully', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForTimeout(1000);

  await page.getByPlaceholder('Username').fill('Admin');
  await page.waitForTimeout(500);

  await page.getByPlaceholder('Password').fill('admin123');
  await page.waitForTimeout(500);

  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  // Open the user menu
  await page.locator('header [class*="oxd-userdropdown-name"]').click();
  await page.waitForTimeout(500);

  // Click Logout
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Verify redirect to login
  await expect(page).toHaveURL(/\/auth\/login/);
});