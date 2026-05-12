import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TestConfig } from '../../test.config';
import { LoginPage } from '../../pages/LoginPage';
import { SearchPage } from '../../pages/SearchPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

const testConfig = new TestConfig();

test.describe('E2E Tests', () => {

//login test
test('Login Test', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToLoginPage();
    const loginPage = new LoginPage(page);
    await loginPage.login(testConfig.email, testConfig.password);
    await expect(page).toHaveURL('https://petya-automation.eu/index.php?route=account/account');
});
//search product test
test('Search for HTC', async ({page})=>{



});


//add to cart test

//checkout test



});