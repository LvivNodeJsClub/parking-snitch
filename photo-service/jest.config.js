module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "name": "photo-service",
  "roots": ["<rootDir>/tests", "<rootDir>/dist"],
  "modulePaths": ["<rootDir>/dist"],
  "testMatch": ["**\/*.test.ts"],
  "reporters": [
    "default",
    [ "jest-junit", {
      "outputDirectory": "./test-report"} ],
    ["jest-html-reporter", {
      "outputPath": "test-report/index.html"
    }]
  ],
  "collectCoverage": true,
  "coverageReporters": ["lcov"],
  "coverageDirectory": "./test-coverage",
  "testResultsProcessor": "jest-sonar-reporter"
};