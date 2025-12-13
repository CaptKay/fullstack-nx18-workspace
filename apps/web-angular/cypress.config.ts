import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // IMPORTANT: put the actual URL shown by "nx serve web-angular"
    baseUrl: 'http://localhost:4400',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
  },
});
