import {test, expect} from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { RegisterPage } from '../../pages/RegisterPage';   
import { TestConfig } from '../../test.config';
import { RandomDataUtil } from '../../utils/randomDataGenerator';

const testConfig = new TestConfig();

test.describe('Registration Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.appUrl);
  });

  test('1.User can navigate to Registration page @smoke', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegisterPage(page);

    await homePage.goToRegisterPage();

    await registrationPage.isRegisterPageLoaded();
  });

    test('2.User can successfully register with valid data @regression', async ({ page }) => {
      const homePage = new HomePage(page);
      const registrationPage = new RegisterPage(page);

      await homePage.goToRegisterPage();
      await registrationPage.successfulRegister(
        RandomDataUtil.getFirstName(),
        RandomDataUtil.getlastName(),
        RandomDataUtil.getEmail(),
        RandomDataUtil.getRandomPassword()
      );
        await expect(page).toHaveURL(/route=account\/success/);
    });

    test('3.User cannot register with an already existing email @regression', async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.goToRegisterPage();
      await page.getByRole('textbox', { name: 'First Name' }).fill(RandomDataUtil.getFirstName());
      await page.getByRole('textbox', { name: 'Last Name' }).fill(RandomDataUtil.getlastName());
      await page.getByRole('textbox', { name: 'E-Mail' }).fill(testConfig.email);
      await page.getByRole('textbox', { name: 'Password' }).fill(RandomDataUtil.getRandomPassword());
      await page.locator('[name="agree"]').check();
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.getByText(/already registered/i)).toBeVisible();
      await expect(page).toHaveURL(/route=account\/register/);
    });

    test('4.User cannot register with invalid email format @regression', async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.goToRegisterPage();
      await page.getByRole('textbox', { name: 'First Name' }).fill(RandomDataUtil.getFirstName());
      await page.getByRole('textbox', { name: 'Last Name' }).fill(RandomDataUtil.getlastName());
      await page.getByRole('textbox', { name: 'E-Mail' }).fill('invalid-email-format');
      await page.getByRole('textbox', { name: 'Password' }).fill(RandomDataUtil.getRandomPassword());
      await page.locator('[name="agree"]').check();
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page).toHaveURL(/route=account\/register/);
      const emailInput = page.locator('#input-email');

      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);

      expect(validationMessage).toContain("Please include an '@'");
      
    });

    test('5.User cannot register with empty first name @regression', async ({ page }) => {
      const homePage = new HomePage(page);

      await homePage.goToRegisterPage();
      await page.getByRole('textbox', { name: 'Last Name' }).fill(RandomDataUtil.getlastName());
      await page.getByRole('textbox', { name: 'E-Mail' }).fill(RandomDataUtil.getEmail());
      await page.getByRole('textbox', { name: 'Password' }).fill(RandomDataUtil.getRandomPassword());
      await page.locator('[name="agree"]').check();
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page).toHaveURL(/route=account\/register/);
      await expect(page.locator('#error-firstname')).toHaveText('First Name must be between 1 and 32 characters!');
    });


});

