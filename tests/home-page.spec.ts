import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { TestConfig } from '../test.config';

const testConfig = new TestConfig();

test.describe('Home Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.appUrl);
  });

  test('Home page loads successfully @smoke', async ({ page }) => {
    const homePage = new HomePage(page);

    const isLoaded = await homePage.isHomePageLoaded();
    expect(isLoaded).toBe(true);
  });

  test('User can navigate to Register page @regression', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToRegisterPage();

    await expect(page).toHaveURL(/route=account\/register/);
    await expect(page.locator('h1')).toHaveText('Register Account');
  });

  test('User can navigate to Login page', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goToLoginPage();

    await expect(page).toHaveURL(/route=account\/login/);
    await expect(page.getByRole('heading', { name: 'Returning Customer' })).toBeVisible();
  });

  test('User can search for an existing product @smoke @regression', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.searchProduct(testConfig.productName);

    await expect(page).toHaveURL(/route=product\/search/);
    await expect(page.locator('h1')).toContainText(testConfig.productName);
  });

  test('User sees message when searching for non-existing product', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.searchProduct('NonExistingProduct123');

    await expect(page.locator('#content'))
      .toContainText('There is no product that matches the search criteria.');
  });

});