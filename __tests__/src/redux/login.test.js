import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import Test from '../../../src/redux/Login';
import '@testing-library/jest-dom'
import { ngrokLogin } from '../../../src/network/config';
import { decodeIdToken } from '../../../src/redux/Login';


jest.mock('axios'); // Mock axios calls
jest.mock('../../src/Assets/logo1.png', () => 'logo1.png');

window.google = {
    accounts: {
      id: {
        initialize: jest.fn(),
        renderButton: jest.fn(),
      },
    },
  };


  describe('Test Component', () => {
    beforeEach(() => {
      // Mock axios response for the Google login test
      axios.get.mockResolvedValue({
        data: {
          enumRole: 'USER',
          token: 'example-token',
        },
      });
    });
  
    it('renders the component', () => {
      render(<MemoryRouter><Test /></MemoryRouter>);
      expect(screen.getByText('Welcome to PAM')).toBeInTheDocument();
    });
  
    it('handles Google login', async () => {
      
      render(<MemoryRouter><Test /></MemoryRouter>);
  
      
      const signInButton = screen.getByTestId('signIn');
      fireEvent.click(signInButton);
  
     
      await new Promise((resolve) => setTimeout(resolve, 0));
  
      expect(window.google.accounts.id.initialize).toHaveBeenCalledWith({
        client_id: process.env.REACT_APP_googleClientID,
        callback: expect.any(Function),
      });
  
     
    });
  
    it('correctly decodes a JWT token', () => {
     
      const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  
     
      const decodedData = decodeIdToken(sampleToken);
  
     
      const expectedDecodedData = {
        sub: '1234567890',
        name: 'John Doe',
        iat: 1516239022,
      };
  
      
      expect(decodedData).toEqual(expectedDecodedData);
    });


    it('handles Google login correctly', async () => {
      // Define a sample response from the API
      const sampleResponse = {
        data: {
          enumRole: 'USER',
          token: 'sampleToken',
        },
      };
  
      // Mock the axios.get method to simulate an API call
      axios.get.mockResolvedValue(sampleResponse);
  
      const { container } = render(<MemoryRouter><Test /></MemoryRouter>);
  
      // Simulate a click on the Google login button
      const googleLoginButton = container.querySelector('#signIn');
      fireEvent.click(googleLoginButton);
  
     
  
      // expect(axios.get).toHaveBeenCalledWith(`https://${ngrokLogin}/auth/api/v1/get-email`, {
      //   headers: {
      //     'ngrok-skip-browser-warning': 'true',
      //     emailToVerify: 'test@example.com',
      //   },
      // });
    });
     
  
   


  });