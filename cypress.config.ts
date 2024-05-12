import { defineConfig } from 'cypress';

const path = require('path');

const dotenv = require('dotenv');
const envLocal = dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    env: {
      ...(envLocal.parsed ?? process.env),
    },
    baseUrl: 'http://localhost:8000',
    viewportHeight: 900,
    viewportWidth: 1600,
  },
});
