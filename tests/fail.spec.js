import { test, expect } from '@playwright/test';

test('user cannot log in with invalid password', async ({ page }) => {
  // 1. Go to the login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // 2. Fill in the username
  await page.getByPlaceholder('Username').fill('Admin');

  // 3. Fill in an incorrect password
  await page.getByPlaceholder('Password').fill('incorrectPassword123');

  // 4. Click the "Log in" button
  await page.getByRole('button', { name: 'Login' }).click();

  // 5. Assert that the login was successful. This assertion will cause the test to fail.
  // The page will not redirect to the dashboard, and the heading will not be visible.
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});