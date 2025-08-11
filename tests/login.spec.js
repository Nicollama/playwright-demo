import { test, expect } from '@playwright/test';

test('user can log in successfully', async ({ page }) => {
  // 1. Go to the login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.waitForTimeout(3000);

  // 2. Fill in the username/email
  await page.getByPlaceholder('Username').fill('Admin');
  await page.waitForTimeout(3000);
  // or: await page.getByLabel('Email').fill('user@example.com');

  // 3. Fill in the password
  await page.getByPlaceholder('Password').fill('admin123');
  await page.waitForTimeout(3000);

  // 4. Click the "Log in" button
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);

  // 5. Wait for redirect or success message
  await expect(page).toHaveURL(/\/dashboard/);
  await page.waitForTimeout(3000);
  // OR check for visible heading
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.waitForTimeout(3000);
});