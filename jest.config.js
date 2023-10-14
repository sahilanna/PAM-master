
module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
      '\\.(css|scss)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
      '\\.(gif|png|jpg|jpeg|avif)$': '/home/nineleaps/Desktop/Pratap/PAM-master/imageMock.js',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(bootstrap|react-bootstrap|semantic-ui-react)/)',
    ],
    testEnvironment: 'jsdom'
  };
  