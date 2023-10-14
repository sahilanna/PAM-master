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

    // it('should call selectedUserChange when an option is selected', () => {
    //   const users = [
    //     { key: '1', value: 'user1', text: 'User 1' },
    //     { key: '2', value: 'user2', text: 'User 2' },
    //   ];
    //   const selectedUserChange = jest.fn();
    //   const { getByTestId, getByText } = render(
    //    <MemoryRouter>
    //      <AddUserName users={users} selectedUserChange={selectedUserChange} />
    //    </MemoryRouter>
    //   );
    //   const dropdown = getByTestId('user');
  
    //   fireEvent.click(dropdown);
  
    //   const option1 = getByText('User 1');
  
    //   fireEvent.click(option1);
  
    //   expect(selectedUserChange).toHaveBeenCalledWith('user1');
    // });










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

 
});
