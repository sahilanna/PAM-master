import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateRepo from '../../../../../../src/screens/Dashboard/Admin/Create/createRepo/CreateRepo';
import api from '../../../../../../src/network/api';



jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock the API module
jest.mock('../../../../../../src/network/api');

describe('CreateRepo Component', () => {
  test('it renders the CreateRepo component', () => {
    render(<CreateRepo/>);
  });

  test('it handles form submission with valid data', async () => {
    
    api.post.mockResolvedValue({});
    
    render(<CreateRepo />);

   
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Test Repo' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Description' } });
    
    // Trigger form submission
    fireEvent.click(screen.getByTestId('submit-button'));
    
  });

  // test('it handles form submission with invalid data', () => {
  //   render(<CreateRepo />);
    
  //   // Trigger form submission with missing data
  //   fireEvent.click(screen.getByTestId('submit-button'));

  //   // Assert that an error message is displayed
  //   expect(screen.getByText('Bad Request')).toBeInTheDocument();
  // });

  // test('it handles form submission with 404 error', () => {
  //   // Mock the API post method to reject with a 404 error
  //   api.post.mockRejectedValue({ response: { status: ERROR_CODE_NOT_FOUND } });
    
  //   render(<CreateRepo />);
    
  //   // Simulate user input
  //   fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'Test Repo' } });
  //   fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Description' } });
    
  //   // Trigger form submission
  //   fireEvent.click(screen.getByTestId('submit-button'));

  //   // Assert that a 404 error message is displayed
  //   expect(screen.getByText('404 NOT FOUND')).toBeInTheDocument();
  // });

 
});
