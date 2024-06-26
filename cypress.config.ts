import { defineConfig } from 'cypress';
import { Client } from 'pg';

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
      on('task', {
        async queryDb(queryString) {
          const client = new Client({
            user: envLocal.parsed.DB_USERNAME,
            password: envLocal.parsed.DB_PASSWORD,
            host: envLocal.parsed.DB_HOST,
            database: envLocal.parsed.DB_TYPE,
            port: envLocal.parsed.DB_PORT,
            connectionString: envLocal.parsed.DB_CONN,
            ssl: envLocal.parsed.DB_SSL === 'true',
          });
          await client.connect();
          const res = await client.query(queryString);
          await client.end();
          return res.rows;
        },
      });
    },
    defaultCommandTimeout: 20000,
    env: {
      ...(envLocal.parsed ?? process.env),
    },
    numTestsKeptInMemory: 1,
    experimentalMemoryManagement: true,
    baseUrl: 'http://localhost:8000',
    viewportHeight: 900,
    viewportWidth: 1600,
  },
});
