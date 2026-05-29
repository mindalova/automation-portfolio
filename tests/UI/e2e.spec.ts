import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { TestConfig } from '../../test.config';
import { LoginPage } from '../../pages/LoginPage';
import { SearchPage } from '../../pages/SearchPage';
import { CartPage } from '../../pages/CartPage';
//import { CheckoutPage } from '../../pages/CheckoutPage';


const testConfig = new TestConfig();

test.describe('E2E Tests', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await page.goto(testConfig.appUrl);
        await homePage.goToHomePage();
    });

    test('1. Login Test', async ({ page }) => {
        await homePage.goToLoginPage();
        const loginPage = new LoginPage(page);
        await loginPage.login(testConfig.email, testConfig.password);
        await expect(page).toHaveURL(/route=account\/account/);
    });

    test.describe('2. Search and add to cart test', () => {
        let searchPage: SearchPage;
        let cartPage: CartPage;

        test.beforeEach(async ({ page }) => {
            searchPage = new SearchPage(page);
            await homePage.searchProduct('HTC'); 
        });

        test('2. Search for HTC', async () => {
            expect(await searchPage.isSearchPageLoaded()).toBe(true);
            expect(await searchPage.getProductThumb()).toBe(1);
        });

        test('3. Add to cart test', async ({ page }) => {
            await searchPage.addToCart();
            await expect(page.locator('#alert')).toContainText(/Success/);
        });

        test('4. View cart test', async ({ page }) => {
            await searchPage.addToCart();
            cartPage = await homePage.goToCartPage();            
            expect(await cartPage.isCartPageLoaded()).toBe(true);
        });
    });



    //checkout test



});