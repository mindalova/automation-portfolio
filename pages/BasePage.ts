import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  //locators

  //top
  protected readonly contactButton: Locator;
  protected readonly myAccountDropdown: Locator;
  protected readonly wishlistButton: Locator;
  protected readonly shoppingcartButton: Locator;
  protected readonly checkoutButton: Locator;
  protected readonly currencyDropdown: Locator;
  protected readonly logoutButton: Locator;
  protected readonly registerButton: Locator;
  protected readonly loginButton: Locator;
  protected readonly orderHistory: Locator;
  protected readonly transactions: Locator;
  protected readonly downloads: Locator;

  // middle
  protected readonly logo: Locator;
  protected readonly searchInput: Locator;
  protected readonly searchButton: Locator;
  protected readonly itemsInTheCartButton: Locator;

  //menu
  protected readonly menuDesktop: Locator;
  protected readonly menuLaptopsNotebooks: Locator;
  protected readonly menuComponents: Locator;
  protected readonly menuTablets:Locator;
  protected readonly menuSoftware: Locator;
  protected readonly menuPhones: Locator;
  protected readonly menuCameras: Locator;
  protected readonly menuMP3Players: Locator;

  //constructor
  protected constructor(page: Page) {
    this.page = page;

    //top
   
    this.myAccountDropdown = page.locator('span:has-text("My Account")');
    this.loginButton = page.getByRole('link', {name: "Login"}).first()
    this.registerButton = page.getByRole('link', { name: "Register" }).first()
    this.logoutButton = page.getByRole('link', { name: "Logout" }).first()
    this.registerButton = page.locator('a').filter({ hasText: 'Register' }).first();
    this.checkoutButton = page.getByRole('link', { name: "Checkout" });
    this.wishlistButton = page.getByRole('link', { name: "Wish List" }).first();

    //middle
    this.logo = page.locator('#logo');
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('button[type="submit"].btn-light');
    this.itemsInTheCartButton = page.getByRole('button', { name: /item\(s\)/ }).nth(1);

    
  }


  //search a product
  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
}

// go to login page  
async goToLoginPage() {
    this.myAccountDropdown.click();
    this.loginButton.click();
  }

  // go to registration page
  async goToRegisterPage() {
    try {
        await this.myAccountDropdown.click();
        await this.registerButton.click();
    } catch (error) {
        console.error("Navigation to register page failed:", error);
        throw error; 
    }
}

}
