import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {

    //locators
    private readonly pageHeading: Locator;
    //private readonly searchInput: Locator;
    //private readonly searchButton: Locator;
    private readonly productThumb: Locator;
    private readonly addToCartBtn: Locator;
    private readonly addToCartAlert: Locator;

    //constructor
    constructor(page: Page) {

        super(page);

        this.pageHeading = page.getByRole('heading', { name: /Search/i, exact: false });
       // this.searchInput = page.getByRole('textbox', { name: 'Search Criteria' });
       // this.searchButton = page.getByRole('button', { name: 'Search' });
        this.productThumb = page.locator('.product-thumb');
        this.addToCartBtn = this.productThumb.first().locator('button[title="Add to Cart"]');
        this.addToCartAlert = page.locator('#alert');
    }

    //methods
    async isSearchPageLoaded() {
        try {
            await this.page.waitForURL(/.*route=product\/search.*/, { timeout: 5000 });
            return true;
        } catch (error) {
            console.error("Search page did not load properly:", error);
            return false;
        }
    }

    
    async getProductThumb() {
        return await this.productThumb.count();
    }

    async addToCart() {
        await this.addToCartBtn.click();

    }

    async getAddToCartAlert() {
        return await this.addToCartAlert.textContent();
    }
}