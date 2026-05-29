import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutPage } from './CheckoutPage';

export class CartPage extends BasePage {
    
    //locators
    private readonly cartPageHeader: Locator;
    private readonly productsTable: Locator;
    private readonly checkoutButton: Locator;

    //constructor
    constructor(page: Page) {
        super(page);

        this.cartPageHeader = page.getByRole('heading', { name: /Shopping Cart/ });
        this.productsTable = page.locator('tbody:visible');
        this.checkoutButton = page.getByRole('link', {name: /Checkout/}).nth(2);
    }

    //methods
    async isCartPageLoaded() {
        try {
            await expect(this.cartPageHeader).toBeVisible({ timeout: 5000 });
            return true;
        } catch (error) {
            console.error("Cart page did not load properly:", error);
            return false;
        }
    }

    async goToCheckoutPage() {
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL(/route=checkout\/checkout/);
        return new CheckoutPage(this.page);
    }
}