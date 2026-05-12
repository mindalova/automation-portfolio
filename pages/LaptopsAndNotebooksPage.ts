import {Page, expect, Locator} from '@playwright/test'
import { HomePage } from './HomePage';
import { ProductPage } from './ProductPage';

export class LaptopsAndNotebooks {

    private readonly page: Page;

    //locators
    private readonly pageTitle:Locator;
    private readonly listView:Locator;
    private readonly gridView:Locator;
    private readonly sortByDropdownAZ:Locator;
    private readonly sortByDropdownZA:Locator;
    private readonly show25Dropdown:Locator;
    private readonly productTitle:Locator;
    private readonly productNames:Locator;
    private readonly addToCartBtn:Locator;
    private readonly addToWishListBtn:Locator;
    private readonly compareBtn:Locator;
    private readonly productContainer:Locator;

    //constructor 

    constructor (page: Page){

        this.page = page;
        this.pageTitle = page.getByRole('heading', { name: 'Laptops & Notebooks' });
        this.listView = page.locator('#button-list');
        this.gridView = page.locator('#button-grid');
        this.sortByDropdownAZ = page.getByText('Name (A - Z)');
        this.sortByDropdownZA = page.getByText('Name (Z - A)');
        this.show25Dropdown = page.getByText('25');
        this.productTitle = page.getByRole('heading', { name: /Sony VAIO/i });
        this.productNames = page.locator('h4');
        this.addToCartBtn = page.locator('div.button').locator('button').nth(0);
        this.addToWishListBtn= page.locator('div.button').locator('button').nth(1);
        this.compareBtn = page.locator('div.button').locator('button').nth(2);
        this.productContainer = page.locator('#product-list');
    }

    async pageIsLoaded(){
        await expect(this.pageTitle).toBeVisible();
    }

    async goToProductPage (){
        await this.productTitle.click();
        return new ProductPage(this.page);
    }

    async makeListView(){
        await this.listView.click();
        await expect(this.productContainer).toHaveClass(/product-list/);
        
    }

    async makeGridView(){
        await this.gridView.click();
        await expect(this.productContainer).toHaveClass(/row-cols-sm-2/);
    }

    async showNumberProducts(){
        await this.show25Dropdown.click();
    }

    async sortByAz(){
        await this.sortByDropdownAZ.click();
        const names = (await this.productNames.allTextContents()).map((name) => name.trim());
        const sortedNames = [...names].sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: 'base' })
        );
        expect(names).toEqual(sortedNames);
    }

    async sortByZa(){
        await this.sortByDropdownZA.click();
        const names = (await this.productNames.allTextContents()).map((name) => name.trim());
        const sortedNames = [...names].sort((a, b) =>
            b.localeCompare(a, undefined, { sensitivity: 'base' })
        );
        expect(names).toEqual(sortedNames);
    }

    async addToCart(){
        await this.addToCartBtn.click();
    }

    async addToWishList(){
        await this.addToWishListBtn.click();
    }

    async addToCompareList(){
        await this.compareBtn.click();
    }

}