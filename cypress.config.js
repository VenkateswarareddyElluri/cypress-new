// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    video: true, // Enable video recording
    screenshotOnRunFailure: true, // Enable screenshots on test failures
    setupNodeEvents(on, config) {
      // Add any plugins here
      on('after:run', (results) => {
        const fs = require('fs');
        
        const path = require('path');
        
        // Save the JSON report
        fs.writeFileSync(
          path.join('cypress', 'results', 'test-results.json'),
          JSON.stringify(results, null, 2)
        );
      });
    },
    // Additional configuration options
  },
});
