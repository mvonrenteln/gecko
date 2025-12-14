import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000'
  },
  webServer: {
    command: 'npm run dev -- --hostname 0.0.0.0 --port 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    cwd: __dirname
  },
  testDir: './e2e'
});
