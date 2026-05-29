import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    
    //locators
    private readonly shippingMethods: Locator;
    private readonly paymentMethods: Locator;

    //constructor

    constructor(page: Page) {
        super(page);

        this.shippingMethods = page.locator('#button-shipping-methods');
        this.paymentMethods = page.locator('#button-payment-methods');


    }
}