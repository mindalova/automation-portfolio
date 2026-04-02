import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';   
import { TestConfig } from '../test.config';
import { RandomDataUtil } from '../utils/randomDataGenerator';

const testConfig = new TestConfig();

test.describe('Registration Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(testConfig.appUrl);
  });

  test('User can navigate to Registration page @smoke', async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationPage = new RegisterPage(page);

    await homePage.goToRegisterPage();

    await registrationPage.isRegisterPageLoaded();
  });

    test('User can successfully register with valid data @regression', async ({ page }) => {
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


});

