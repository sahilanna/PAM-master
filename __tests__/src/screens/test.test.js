import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Test from '../../../src/screens/Test';

// Mock the initialize and renderButton functions
window.google = {
  accounts: {
    id: {
      initialize: jest.fn(),
      renderButton: jest.fn(),
    },
  },
};

test('renders and initializes Google Accounts API button', () => {
  const { container } = render(<Test />);

});
