import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddUserName from "../../../../src/screens/Dashboard/Users/AddUserName";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import api from "../../../../src/network/api";

describe("AddUserName Component", () => {
  
  const mockUseNavigate = jest.fn();
  const mockApi = {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(() => Promise.resolve({ data: { id: 1 } })),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockUseNavigate,
    }));

    
    jest.mock("../../../../src/network/api", () => ({
      get: mockApi.get,
      post: mockApi.post,
    }));
  });

    it('renders the component without crashing', () => {
      render(<MemoryRouter><AddUserName /></MemoryRouter>);

      expect(screen.getByText('Add Github UserName')).toBeInTheDocument();
    });

    it('displays a "Select User" dropdown', async () => {
    
      mockApi.get.mockResolvedValueOnce({ data: [] });

      render(<MemoryRouter><AddUserName /></MemoryRouter>);

    
      await waitFor(() => {
        expect(screen.getByText('Select User')).toBeInTheDocument();
      });
    });

    it('updates selectedUser and id when a user is selected', () => {
      render(<MemoryRouter><AddUserName /></MemoryRouter>);

      const userDropdown = screen.getByTestId('user');

      waitFor(() => {
          fireEvent.change(userDropdown, { target: { value: '1' } });
      })

      waitFor(() => {
          expect(userDropdown).toHaveValue('1');
      })

      waitFor(() => {
          expect(screen.getByDisplayValue('1')).toBeInTheDocument();
      })

    });

    it('updates githubUsername when text is entered into the input field', () => {
      render(<MemoryRouter><AddUserName /></MemoryRouter>);
      const usernameInput = screen.getByPlaceholderText('Enter github username');

      fireEvent.change(usernameInput, { target: { value: 'testusername' } });

      expect(usernameInput).toHaveValue('testusername');
    });

    it('close button', () => {
      const { getByTestId }  = render(
          <MemoryRouter>
              <AddUserName/>
          </MemoryRouter>
      )
      const onCloseMock = jest.fn()
      fireEvent.click(getByTestId('X'))
      
  })

 

  //   it('displays "Invalid Username" modal when submitting an invalid GitHub username', async () => {
  //     render(<MemoryRouter><AddUserName /></MemoryRouter>);
  //     mockApi.post.mockRejectedValueOnce({
  //       response: { data: 'Github username is invalid' },
  //     });

  //     const userDropdown = screen.getByPlaceholderText('Select User');
  //     const usernameInput = screen.getByPlaceholderText('Enter github username');
  //     const submitButton = screen.getByText('Submit');

  //     fireEvent.change(userDropdown, { target: { value: '1' } });
  //     fireEvent.change(usernameInput, { target: { value: 'invalid_username' } });
  //     fireEvent.click(submitButton);

  //     // Wait for the "Invalid Username" modal to appear
  //     await waitFor(() => {
  //       expect(screen.getByText('Invalid Username')).toBeInTheDocument();
  //     });

  //     // Close the modal
  //     fireEvent.click(screen.getByText('OK'));
  //     expect(screen.queryByText('Invalid Username')).not.toBeInTheDocument();
  //   });

  //   it('displays "User Already Exists" modal when submitting a username that already exists', async () => {
  //     render(<MemoryRouter><AddUserName /></MemoryRouter>);
  //     mockApi.post.mockRejectedValueOnce({
  //       response: { status: 409 },
  //     });

  //     const userDropdown = screen.getByPlaceholderText('Select User');
  //     const usernameInput = screen.getByPlaceholderText('Enter github username');
  //     const submitButton = screen.getByText('Submit');

  //     fireEvent.change(userDropdown, { target: { value: '1' } });
  //     fireEvent.change(usernameInput, { target: { value: 'existing_username' } });
  //     fireEvent.click(submitButton);

  //     // Wait for the "User Already Exists" modal to appear
  //     await waitFor(() => {
  //       expect(screen.getByText('User Already Exists')).toBeInTheDocument();
  //     });

  //     // Close the modal
  //     fireEvent.click(screen.getByText('OK'));
  //     expect(screen.queryByText('User Already Exists')).not.toBeInTheDocument();
  //   });
});
