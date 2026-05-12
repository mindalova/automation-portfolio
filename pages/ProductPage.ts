import {Page, expect, Locator} from '@playwright/test'

export class ProductPage {

private readonly page: Page;

//locators
private readonly productTitle: Locator;
private readonly price: Locator;
private readonly availableOptions: Locator;
private readonly availability: Locator;
private readonly addToWishList: Locator;
private readonly compare: Locator;
private readonly productQty: Locator;
private readonly addToCartBtn: Locator;
private readonly productDescriptionBtn: Locator;
private readonly productReviewBtn: Locator;




//constructor

constructor (page: Page) {

    this.page=page;



}






}