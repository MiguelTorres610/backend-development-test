module.exports = {
    roots: ["<rootDir>/test", "<rootDir>/src"],
    testMatch: [
        "**/__test__/**/*.js?(x)",
        "**/__test__/**/*.ts?(x)",
        "**/?(*.)+(spec|test).js?(x)",
        "**/?(*.)+(spec|test).ts?(x)",
    ],
    setupFilesAfterEnv: ["<rootDir>/test/setupTest.ts"],
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{js,ts,jsx,tsx}",
        "<rootDir>/src/components/**/*.{js,ts,jsx,tsx}",
        "!**/node_modules/**",
        "!**/coverage/**",
        "!<rootDir>/test/mocks/**",
    ],
    testEnvironment: "jsdom",
};