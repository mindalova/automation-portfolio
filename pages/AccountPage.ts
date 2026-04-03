import {Page, expect, Locator} from '@playwright/test';

export class AccountPage {
    private readonly page: Page;

    //locators
    private readonly accountHeader: Locator;

    //constructor
    constructor(page: Page) {
        this.page = page;
        this.accountHeader = page.locator('h1:has-text("My Account")');
    }

    //methods
    async isAccountPageLoaded() {
        try {
            await expect(this.accountHeader).toBeVisible({ timeout: 5000 });
            return true;
        } catch (error) {
            console.error("Account page did not load properly:", error);
            return false;
        }
    }
}
