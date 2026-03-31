import {Page, expect, Locator} from '@playwright/test';

export class HomePage {

    private readonly page: Page;

    //locators
        private readonly myAccount: Locator;
        private readonly register: Locator;
        private readonly login: Locator;    
        private readonly searchBox: Locator;
        private readonly searchButton: Locator;
        private readonly logo: Locator; 

    //constructor
        constructor(page: Page) {

        this.page = page;
        this.myAccount = page.locator('span:has-text("My Account")');
        this.register = page.locator('a').filter({ hasText: 'Register' }).first();
        this.login = page.locator('a').filter({ hasText: 'Login' }).first();
        this.searchBox = page.locator('input[name="search"]');
        this.searchButton = page.locator('i.fa-solid.fa-magnifying-glass');
        this.logo = page.locator('img[title="Your Store"]');
    }
    
    //methods
    async isHomePageLoaded() {
        try {
            await expect(this.logo).toBeVisible({ timeout: 5000 });
            return true;
        } catch (error) {
            console.error("Home page did not load properly:", error);
            return false;
        }
}
    async goToRegisterPage() {
    try {
        await this.myAccount.click();
        await this.register.click();
    } catch (error) {
        console.error("Navigation to register page failed:", error);
        throw error; 
    }
}

    async goToLoginPage() {
        this.myAccount.click();
        this.login.click();
    }

    async searchProduct(productName: string) {
        await this.searchBox.fill(productName);
        await this.searchButton.click();
    }


}

