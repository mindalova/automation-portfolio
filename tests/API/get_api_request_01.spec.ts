import { test, expect } from '@playwright/test';

test('Get API Request 01', async ({ request }) => {
  const response = await request.get('/booking/5');

  console.log(response.status());
  console.log(await response.text());

  expect(response.status()).toBe(200);
});
