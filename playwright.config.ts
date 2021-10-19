import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: './tests',
  retries: 1,
  use: {
    trace: 'on',
  },
}

export default config