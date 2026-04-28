import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,

  reporter: [
    ['list'],
    ['html'],
    ['dot'],
    ['allure-playwright']
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    // headless: false,
  },

  projects: [
    {
      name: 'ui',
      testDir: './tests/UI',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://petya-automation.eu/',
      },
    },
    {
      name: 'api',
      testDir: './tests/API',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
      },
    },
  ],
});