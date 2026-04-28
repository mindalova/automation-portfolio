// tests/login-csv.spec.ts
import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { LoginPage } from '../../pages/LoginPage';
import { TestConfig } from '../../test.config';
import { HomePage } from '../../pages/HomePage';

interface UserRow {
  email: string;
  password: string;
  expectedResult: string;
}


const testConfig = new TestConfig();

// read CSV file and parse it into an array of objects
const csvFile = fs.readFileSync(path.join(__dirname, '../../testdata/users.csv'));
const testData: UserRow[] = parse(csvFile, {
  columns: true,         // first row contains column names
  skip_empty_lines: true
});

for (const row of testData) {
  test(`Login [${row.email || 'empty'} / ${row.expectedResult}]`, async ({ page }) => {

    await page.goto(testConfig.appUrl);
        const homePage = new HomePage(page);
        await homePage.goToLoginPage();
        const loginPage = new LoginPage(page);

    await loginPage.login(row.email, row.password);

    if (row.expectedResult === 'success') {
     await expect(page).toHaveURL(/route=account\/account/);
        await expect(page.locator('h1').first()).toHaveText('My Account');
    } else {
      await expect(page.locator('.alert-danger')).toBeVisible();
    }
  });
}
