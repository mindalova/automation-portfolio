import { test, expect } from '@playwright/test';
import testData from '../testdata/users.json';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { HomePage } from '../pages/HomePage';
import { TestConfig } from '../test.config';

const testConfig = new TestConfig();

for (const row of testData) {
  test(`Login with JSON data [${row.email || 'empty'} / ${row.expectedResult}]`, async ({ page }) => {

    await page.goto(testConfig.appUrl);
    const homePage = new HomePage(page);
    await homePage.goToLoginPage();
    const loginPage = new LoginPage(page);

    await loginPage.login(row.email, row.password);
    
    if (row.expectedResult === 'success') {
       await expect(page).toHaveURL(/route=account\/account/);
        await expect(page.locator('h1').first()).toHaveText('My Account');
    } else {
       await expect(page.locator('.alert-danger')).toBeVisible();
    }
  });
}