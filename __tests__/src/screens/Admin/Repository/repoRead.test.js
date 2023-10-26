import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RepoRead from "../../../../../src/screens/Dashboard/Admin/Repository/repoRead";
import api from "../../../../../src/network/api";
import { MemoryRouter, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";
import { ngrokUrl } from "../../../../../src/network/config";

jest.mock("../../../../../src/network/api");

const navigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("RepoRead Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    render(<MemoryRouter><RepoRead /></MemoryRouter>);

  });
  it('calls handleSearchChange when the search input value changes', () => {
    const { getByPlaceholderText } = render(
      
        <MemoryRouter>
          <RepoRead/>
        </MemoryRouter>
     
    );
  
    const searchInput = getByPlaceholderText('Search Repo...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
  
  });
  


  it('tests create repo, add project git, add collab git button ', async () => {
    
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    render(<MemoryRouter><RepoRead /></MemoryRouter>);

    const createButton = screen.getByTestId('createOnClick');
    fireEvent.click(createButton);

    const addProjectGitButton = screen.getByTestId('add-project');
    fireEvent.click(addProjectGitButton);

    const addCollaboratorsButton = screen.getByTestId('add-collab');
    fireEvent.click(addCollaboratorsButton);

  });

  

  // it('calls handleOTPClose when "Cancel" button is clicked in OTP modal', async () => {
  //   render(<MemoryRouter><RepoRead /></MemoryRouter>);

  //   waitFor(() => {
  //       fireEvent.click(getByText('Delete'));
  //   });

  //   waitFor(() => {
  //       fireEvent.click(getByText('Cancel'));
  //   });

  //   expect(screen.queryByText('Enter OTP')).not.toBeInTheDocument();
  // });

  it("should call onClose when deleteUser dialog box appears", async () => {
    const initialState = [
      {
        repoId: 1,
        name: "Repo1",
        description: "Repo 1 for Project 1",
      },
      {
        repoId: 2,
        name: "Repo2",
        description: "Repo 2 for Project 2",
      },
    ];
    const apiMockResponse = {
      data: initialState,
    };

    const apiMock = require("../../../../../src/network/api");
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    const deleteUser = jest.fn();
    apiMock.default.delete.mockResolvedValue(apiMockResponse);

    render(
      <MemoryRouter>
        <RepoRead />
      </MemoryRouter>
    );


      await waitFor(() =>{
        const deleteButton = screen.getAllByTestId("delete");
        deleteButton.forEach((deleteButton) => {
          fireEvent.click(deleteButton);
          waitFor(() => {
            const cancel = screen.getByTestId('onClose');
            fireEvent.click(cancel);
          });
        });

      })
     

  });

  it('should call deleteUser when delete button is clicked', async () => {

    const initialState =
   [ {
    repoId: '1',
    name: 'Repo1',
    description: 'Repo 1 for Project 1',
  },
  {
    repoId: '2',
    name: 'Repo2',
    description: 'Repo 2 for Project 2',
  },
      ];
    const apiMockResponse = {
      data: initialState,
    };

    const apiMock = require('../../../../../src/network/api');
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    const deleteUser = jest.fn();
    const handleConfirmDelete = jest.fn();
    
    

   render(
      <MemoryRouter>
        <RepoRead />
      </MemoryRouter>
    );

    await waitFor(() =>{
      const deleteButton = screen.getAllByTestId('delete');
      deleteButton.forEach((deleteButton) => {
         fireEvent.click(deleteButton)
         waitFor(() =>{
          const confirm = screen.getByTestId('confirm')
          fireEvent.click(confirm);
         })
      });
    })

  })


  test("should call logOut and navigate to the Login page with null user data", async () => {
    const sampleUser = { id: 123, name: "Sample User" };
    sessionStorage.setItem("item", JSON.stringify(sampleUser));
  
    render(
      <MemoryRouter>
         <RepoRead/>
      </MemoryRouter>
     
    );
    const data = sessionStorage.getItem("item");
    const user = data ? JSON.parse(data) : null;
    const id = user ? user.id : null;
  });

});
