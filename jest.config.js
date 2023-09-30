module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '\\.(css|scss)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(bootstrap|react-bootstrap)/)',
    ],
   
    testEnvironment: 'jsdom'
  };
  