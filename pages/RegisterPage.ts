import {Page, expect, Locator} from '@playwright/test';
import { RandomDataUtil } from '../utils/randomDataGenerator';

export class RegisterPage {
    private readonly page: Page;

    // locators
    private readonly pageTitle: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continueButton: Locator;
    private readonly newsletterCheckbox: Locator;

    // constructor

    constructor(page: Page) {

        this.page = page;
        this.pageTitle = page.getByRole('heading', { name: 'Register Account'})
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.privacyPolicy = page.locator('[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.newsletterCheckbox = page.locator('#input-newsletter');

        
    }

    // methods
    async isRegisterPageLoaded() {
        try {
            await expect(this.pageTitle).toBeVisible({ timeout: 5000 }); 
            await expect(this.page).toHaveURL(/route=account\/register/);  
            return true;
        } catch (error) {
            console.error("Register page did not load properly:", error);
            return false;
        }   

    }

    async successfulRegister(firstName: string, lastName: string, email: string, password: string, subscribeNewsletter: boolean = false) {
        await this.firstNameInput.fill(RandomDataUtil.getFirstName());
        await this.lastNameInput.fill(RandomDataUtil.getlastName());
        await this.emailInput.fill(RandomDataUtil.getEmail());
        await this.passwordInput.fill(RandomDataUtil.getRandomPassword());
        if (subscribeNewsletter) {
            await this.newsletterCheckbox.check();
        }
        await this.privacyPolicy.check();
        await this.continueButton.click();
    }



}