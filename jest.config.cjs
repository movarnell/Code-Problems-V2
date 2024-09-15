module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript and JSX files using Babel
    '^.+\\.tsx?$': 'ts-jest',    // Transform TypeScript and TSX files using ts-jest
  },
  transformIgnorePatterns: [
    '/node_modules/', // Ignore transforming files in node_modules
  ],
};