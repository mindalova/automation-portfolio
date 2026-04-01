import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../test.config';
import { only } from 'node:test';

const testConfig = new TestConfig();

test.describe('Login Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(testConfig.appUrl);
        const homePage = new HomePage(page);
        await homePage.goToLoginPage();
    });

    test.only('Successful login with valid credentials @smoke', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(testConfig.email, testConfig.password);

        await expect(page).toHaveURL(/route=account\/account/);
        await expect(page.locator('h1').first()).toHaveText('My Account');
    });

    test('Login fails with invalid password @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(testConfig.email, 'wrongpassword');

        await expect(page.locator('.alert-danger')).toBeVisible();
    });

    test('Login fails with invalid email @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('invalid@mail.com', testConfig.password);

        await expect(page.locator('.alert-danger')).toBeVisible();
    });

    test('Login fails with empty fields @regression', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('', '');

        await expect(page.locator('.alert-danger')).toBeVisible();
    });

    test('Forgotten Password link navigates correctly', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.clickForgottenPassword();

        await expect(page).toHaveURL(/route=account\/forgotten/);
    });

});