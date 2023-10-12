import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import Test from '../../../src/redux/Login';
import '@testing-library/jest-dom'

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
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });


//   it('renders the component with the welcome message', () => {
//     render(
//       <MemoryRouter>
//         <Test />
//       </MemoryRouter>
//     );

//     expect(screen.getByText('Welcome to PAM')).toBeInTheDocument();
//   });

//   it('renders the logo', () => {
//     render(
//       <MemoryRouter>
//         <Test />
//       </MemoryRouter>
//     );

//     const logo = screen.getByTestId('logo');
//     expect(logo).toBeInTheDocument();
//     expect(logo).toHaveAttribute('src', 'logo1.png');
//   });

//   it('initiates Google login when Google button is clicked', async() => {

//     render(
//       <MemoryRouter>
//         <Test />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//         expect(window.google.accounts.id.initialize).toHaveBeenCalled();
//       });
    
//       expect(window.google.accounts.id.renderButton).toHaveBeenCalled();

   
//   });

// test('handles successful Google login and redirects to the appropriate page', async () => {
//     // Mock a successful axios response for Google login
//     axios.get.mockResolvedValueOnce({
//       data: {
//         enumRole: 'ADMIN',
//         token: 'mockAccessToken',
//       },
//     });
  
//     const history = createMemoryHistory();
//     history.push('/'); // Set an initial route (e.g., '/')
  
//     render(
//       <Router history={history}>
//         <Test />
//       </Router>
//     );
  
//     // Wait for the Google button to appear
//     await waitFor(() => {
//       expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
//     });
  
//     const googleButton = screen.getByTestId('google-login-button');
//     fireEvent.click(googleButton);
  
//     // Wait for the component to handle the Google login (use a timeout if needed)
//     await waitFor(() => {
//       // Verify that the user is redirected to the appropriate page
//       expect(history.location.pathname).toBe('/AdminDashboard');
//     });
  
//     // Add expectations for elements that should appear after successful login
//     expect(screen.getByText('Welcome to PAM')).toBeInTheDocument();
//   });

it('handles user not found and displays an error modal', async () => {
   
    axios.get.mockRejectedValue({ message: 'User not found' });
    render(<MemoryRouter><Test /></MemoryRouter>);
    const signInButton = screen.getByText('Sign In');

    fireEvent.click(signInButton);

   
    await waitFor(() => {
      const errorModalHeader = screen.getByText('User not found');
      expect(errorModalHeader).toBeInTheDocument();
    });

   
    const errorMessage = screen.getByText('This user was not found. Please try again.');
    expect(errorMessage).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      const closedModal = screen.queryByText('User not found');
      expect(closedModal).not.toBeInTheDocument();
    });
  });

  
});
