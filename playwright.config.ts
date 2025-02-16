import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    baseURL: 'https://parabank.parasoft.com',
    actionTimeout: 0,
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
    headless: false
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
      testMatch: /.*ui.*\.spec\.ts/
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      },
      testMatch: /.*ui.*\.spec\.ts/
    },
    {
      name: 'api',
      testMatch: /.*api.*\.spec\.ts/
    }
  ]
};

export default config;