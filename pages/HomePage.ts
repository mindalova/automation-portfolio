import {Page, expect, Locator} from '@playwright/test';
import { LaptopsAndNotebooks } from './LaptopsAndNotebooksPage';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    
    //locators
        
                
        
        private readonly laptopsAndNotebooks: Locator;

    //constructor
        constructor(page: Page) {

        super(page);

        
        
        
        
        this.laptopsAndNotebooks = page.getByRole('link', { name: 'Laptops & Notebooks' });
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
    

   

    async goToLaptopsAndNotebooksPage() {
        await this.laptopsAndNotebooks.click();
        await expect(this.page).toHaveURL(/route=product\/category&path=57/);
        return new LaptopsAndNotebooks(this.page);
    }

    


}

