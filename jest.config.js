module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "^next/image$": "<rootDir>/__mocks__/next-image.js",
    "^next/link$": "<rootDir>/__mocks__/next-link.js"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
