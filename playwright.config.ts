import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Logs in once via UI, saves storage state (tests/utils/auth.ts AUTH_FILE)
    // for specs to opt into with `test.use({ storageState: AUTH_FILE })`.
    { name: 'setup', testMatch: /auth\.setup\.ts/ },

    {
      name: 'chromium',
      dependencies: ['setup'],
      testMatch: /specs\/.*\.spec\.ts/,
    },
  ],
});
