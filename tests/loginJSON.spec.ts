import { test, expect } from '@playwright/test';
import testData from '../testdata/users.json';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { TestConfig } from '../test.config';

interface UserRow {
  email: string;
  password: string;
  expectedResult: string;
}

const testConfig = new TestConfig();

for (const row of testData as UserRow[]) {
  test(`Login [${row.email || 'empty'} / ${row.expectedResult}]`, async ({ page }) => {
    // #region agent log
    fetch('http://127.0.0.1:7657/ingest/547a6e38-fa2c-4737-a1a1-d57fe82ee7ee',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8cdf3a'},body:JSON.stringify({sessionId:'8cdf3a',runId:'pre-fix',hypothesisId:'H1',location:'tests/loginJSON.spec.ts:19',message:'Starting login test row',data:{email:row.email,expectedResult:row.expectedResult,passwordEmpty:row.password === ''},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    await page.goto(testConfig.appUrl);
    const homePage = new HomePage(page);
    await homePage.goToLoginPage();
    const loginPage = new LoginPage(page);

    await loginPage.login(row.email, row.password);
    // #region agent log
    fetch('http://127.0.0.1:7657/ingest/547a6e38-fa2c-4737-a1a1-d57fe82ee7ee',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8cdf3a'},body:JSON.stringify({sessionId:'8cdf3a',runId:'pre-fix',hypothesisId:'H2',location:'tests/loginJSON.spec.ts:27',message:'Login submitted',data:{expectedResult:row.expectedResult,currentUrl:page.url()},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (row.expectedResult === 'success') {
      // #region agent log
      fetch('http://127.0.0.1:7657/ingest/547a6e38-fa2c-4737-a1a1-d57fe82ee7ee',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8cdf3a'},body:JSON.stringify({sessionId:'8cdf3a',runId:'pre-fix',hypothesisId:'H3',location:'tests/loginJSON.spec.ts:32',message:'Executing success assertions',data:{currentUrl:page.url()},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      await expect(page).toHaveURL(/route=account\/account/);
      await expect(page.locator('h1').first()).toHaveText('My Account');
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7657/ingest/547a6e38-fa2c-4737-a1a1-d57fe82ee7ee',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8cdf3a'},body:JSON.stringify({sessionId:'8cdf3a',runId:'pre-fix',hypothesisId:'H4',location:'tests/loginJSON.spec.ts:37',message:'Executing error assertion',data:{currentUrl:page.url()},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
      await expect(page.locator('.alert-danger')).toBeVisible();
    }
  });
}