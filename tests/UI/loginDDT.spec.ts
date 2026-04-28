import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TestConfig } from '../../test.config';
import { LoginPage } from '../../pages/LoginPage';

const testConfig = new TestConfig();

const loginData = [
  { email: 'petya@mail.com', password: '123456', expected: 'success' },
  { email: 'wrong@mail.com', password: '123456', expected: 'error' },
  { email: 'user1@test.com', password: 'wrongpass', expected: 'error' },
];

for (const data of loginData) {
  test(`Login test with ${data.email}`, async ({ page }) => {
    await page.goto(testConfig.appUrl);
    const homePage = new HomePage(page);
    await homePage.goToLoginPage();
    const loginPage = new LoginPage(page);

    await loginPage.login(data.email, data.password);

    if (data.expected === 'success') {
      await expect(page).toHaveURL(/route=account\/account/);
      await expect(page.locator('h1').first()).toHaveText('My Account');
    } else {
      await expect(page.locator('.alert-danger')).toBeVisible();
    }
  });
}
