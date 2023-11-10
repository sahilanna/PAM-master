import React from 'react';
import { render, fireEvent, screen, waitFor, } from '@testing-library/react';
import Test from '../../../src/screens/Test';
import axios from 'axios';
import { NGROK_LOGIN } from '../../../src/network/config';
jest.mock("axios");
// Mock the initialize and renderButton functions
window.google = {
  accounts: {
    id: {
      initialize: jest.fn(),
      renderButton: jest.fn(),
    },
  },
};

it('renders and initializes Google Accounts API button', () => {
  const { container } = render(<Test />);

});

it('renders and initializes Google Accounts API button', () => {
  const { container } = render(<Test />);

  // Check if initialize and renderButton functions were called
  expect(window.google.accounts.id.initialize).toHaveBeenCalledWith({
    client_id: "664601673419-hiir2173k5usfrm159r3ttg9108cpuhi.apps.googleusercontent.com",
    callback: expect.any(Function), // A function should be passed as a callback
  });

  expect(window.google.accounts.id.renderButton).toHaveBeenCalledWith(
    document.getElementById("signIn"),
    { theme: "outline", size: "large" }
  );

  const signInElement = container.querySelector('#signIn');
 
});






