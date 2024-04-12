module.exports = {
  testEnvironment: 'node',  // Use the Node test environment, suitable for a backend project.
  clearMocks: true,        // Automatically reset mocks between tests to ensure clean test runs.
  testPathIgnorePatterns: ['/node_modules/'],  // Ignore node_modules from test paths to speed up tests.
  collectCoverage: true,   // Enable coverage collection to monitor how much of your code is tested.
  coverageReporters: ["text", "lcov"],  // Output coverage in readable text and lcov formats for further analysis.
  coverageThreshold: {     // Set minimum coverage percentages to enforce high-quality code standards.
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80  // Adjusted to match the coverage requirement for statements as well.
    }
  },
  coverageProvider: "v8"  // Use V8's built-in coverage tool, available in newer versions of Node.js.
};
