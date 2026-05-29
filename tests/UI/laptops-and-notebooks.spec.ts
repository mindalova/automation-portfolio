import {test, expect} from '@playwright/test'
import { HomePage } from '../../pages/HomePage';
import { LaptopsAndNotebooks } from '../../pages/LaptopsAndNotebooksPage';
import { ProductPage } from '../../pages/ProductPage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { AccountPage } from '../../pages/AccountPage';


test.describe('Laptops and Notebooks', () => {

    let laptopsPage: LaptopsAndNotebooks;

    test.beforeEach(async ({page}) => {
        laptopsPage = new LaptopsAndNotebooks(page);
        await page.goto('https://petya-automation.eu/index.php?route=product/category&language=en-gb&path=18');
        await laptopsPage.pageIsLoaded();
    });

    test.describe('View Mode', ()=>{
        test('List View', async () => {
            await laptopsPage.makeListView();
            
        });
        test('Grid View', async () => {
            await laptopsPage.makeGridView();
        });

    });

    test.describe('Sort By', ()=>{
        test('Name: A to Z', async () => {
            await laptopsPage.sortByAz;
        });
        test('Name: Z to A', async () => {
            await laptopsPage.sortByZa();
        });
    });
    
});