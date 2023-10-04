import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateRepo from '../../../../../../src/screens/Dashboard/Admin/Create/createRepo/CreateRepo'; // Import your component
import '@testing-library/jest-dom';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('../../../../../../src/network/api', () => ({
    post: jest.fn(),
  }));
// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('CreateRepo Component', () => {
 
  it('handles API errors correctly', async () => {
  
    render(CreateRepo);

    require('../../../../../../src/network/api').post.mockRejectedValue({ response: { status: 400 } });

    
    fireEvent.click(screen.getByText('Submit'));

    
    await waitFor(() => {
      expect(require('react-toastify').toast.error).toHaveBeenCalledWith('Bad Request', {
        position: require('react-toastify').toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    });
  });
});

// it('renders the CreateRepo component with form elements', async () => {
//     // Mock the navigate function
//     const navigate = jest.fn();
//     require('react-router-dom').useNavigate.mockReturnValue(navigate);

//     // Render the component
//     render(CreateRepo);

//     // Check if the input fields and buttons are rendered
//     const nameInput = screen.getByLabelText('Name:');
//     const descriptionInput = screen.getByLabelText('Description:');
//     const submitButton = screen.getByText('Submit');
//     const closeButton = screen.getByText('Close');

//     // Mock API post request
//     require('../../../../../../src/network/api').post.mockResolvedValue({});

//     // Enter values and submit the form
//     fireEvent.change(nameInput, { target: { name: 'name', value: 'Test Repo' } });
//     fireEvent.change(descriptionInput, { target: { name: 'description', value: 'Test Description' } });
//     fireEvent.click(submitButton);

//     // Wait for the API request to complete
//     await waitFor(() => expect(navigate).toHaveBeenCalledWith('/repoRead'));

//     // Verify that the navigate function was called
//     expect(navigate).toHaveBeenCalledTimes(1);

//     // Verify that react-toastify's toast.error was not called
//     expect(require('react-toastify').toast.error).not.toHaveBeenCalled();
//   });
