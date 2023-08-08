module.exports = {
    // Other Jest configuration options...
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '\\.(css|scss)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
      // Add the paths that should be ignored for ES module transformation
      '/node_modules/(?!(bootstrap|react-bootstrap)/)',
    ],
  };
  