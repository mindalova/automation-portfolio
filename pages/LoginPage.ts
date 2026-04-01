import { Page, expect, Locator } from '@playwright/test';

export class LoginPage {

    private readonly page: Page;

    // locators
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly forgottenPasswordLink: Locator;

    // constructor
    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('#form-login').getByRole('link', { name: 'Forgotten Password' });
        this.forgottenPasswordLink = page.locator('a').filter({ hasText: 'Forgotten Password' }).last();
    }

    // methods
    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async clickForgottenPassword() {
        await this.forgottenPasswordLink.click();
    }
}