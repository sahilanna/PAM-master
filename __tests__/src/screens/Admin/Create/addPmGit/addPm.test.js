import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AddPm from '../../../../../../src/screens/Dashboard/Admin/Create/addPmGit/addPm';
import '@testing-library/jest-dom'
import api from '../../../../../../src/network/api';
import { MemoryRouter } from 'react-router-dom';


jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("../../../../../../src/network/api", () => ({
  get: jest.fn().mockResolvedValue({ data: [] }),
  post: jest.fn().mockResolvedValue({}),
}));

const mockRepositories = [
    { repoId: 'repo1', name: 'MyProjectRepo' },
    { repoId: 'repo2', name: 'AnotherRepo' },
    
  ];
  
const mockUsernames = ['JohnDoe', 'JaneSmith', 'BobJohnson'];

const gitAccessToken = "yourAccessToken"; // Replace with your actual access token

describe('AddPm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders AddPm component', () => {
    render(<AddPm />);
    expect(screen.getByText('Add PM')).toBeInTheDocument();
  });



  test('skips the form and navigates to addUser', async () => {
    const navigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(navigate);

    render(<AddPm />);
    await screen.findByText('Add PM');
    
    const skipButton = screen.getByText('Skip');
    fireEvent.click(skipButton);
    
    expect(navigate).toHaveBeenCalledWith('/addUser', { state: { selectedRepo: '' } });
  });


it('calls onClose when the close button is clicked', () => {
  const mockNavigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
  render(
  <AddPm />
  );
  const closeButton = screen.getByTestId('close');

  fireEvent.click(closeButton);

  expect(mockNavigate).toHaveBeenCalledWith(-1);
});


// test('updates selectedRepo state when selecting a repo', () => {
//   render(<AddPm />);
//   const repoDropdown = screen.getByTestId("dropdown");
//     act(() => {
//       fireEvent.mouseDown(repoDropdown); 
//     });
//     const repoOption = screen.getByText('AnotherRepo'); 
//     act(() => {
//       fireEvent.click(repoOption);
//     });

   
//     expect(screen.getByText('Selected Repo: AnotherRepo')).toBeInTheDocument();
// });
  
// test('calls the API to add PM and navigates to addUser when submitting the form', async () => {
//   const navigate = jest.fn();
//   jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(navigate);

//   render(<AddPm />);
//   await screen.findByText('Add PM');

//   const repoDropdown = screen.getByTestId("dropdown");
//   act(() => {
//     fireEvent.mouseDown(repoDropdown); 
//   });
//   const repoOption = screen.getByText('AnotherRepo'); 
//   act(() => {
//     fireEvent.click(repoOption);
//   });

//   const usernameDropdown = screen.getByTestId("dropdownu");
//   act(() => {
//     fireEvent.mouseDown(usernameDropdown); 
//   });
//   const usernameOption = screen.getByText('JohnDoe'); 
//   act(() => {
//     fireEvent.click(usernameOption);
//   });

//   const submitButton = screen.getByText('Submit');
//   fireEvent.click(submitButton);

  
//   await act(async () => {
//     await Promise.resolve();
//   });
//   expect(api.post).toHaveBeenCalledWith(`https://${ngrokUrl}/collaborators/add`, {
//     owner,
//     repo: 'AnotherRepo',
//     username: 'JohnDoe',
//     accessToken: gitAccessToken,
//   });

  
//   expect(navigate).toHaveBeenCalledWith('/addUser', { state: { selectedRepo: 'AnotherRepo' } });
// });
  
});
