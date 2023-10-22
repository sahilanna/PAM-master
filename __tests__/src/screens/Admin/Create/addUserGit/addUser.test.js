import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddUser from '../../../../../../src/screens/Dashboard/Admin/Create/addUserGit/addUser';
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom';
import "@testing-library/jest-dom";
import api from '../../../../../../src/network/api';
import { act } from 'react-dom/test-utils';


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation:jest.fn(),
}));
jest.mock('../../../../../../src/network/api')

describe("AddUser Component", () => {

it('should render AddUser component', () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);
  const mockLocation = jest.fn();
  useLocation.mockReturnValue(mockLocation);
   render(<AddUser />);
});



it("calls onClose when the close button is clicked", () => {

  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);
  const mockLocation = jest.fn();
  useLocation.mockReturnValue(mockLocation);
  render(<AddUser />);

  const closeButton = screen.getByTestId("close");

  fireEvent.click(closeButton);

  expect(mockNavigate).toHaveBeenCalledWith(-1);
});

it("submits the form with selected user and GitHub username", async () => {
  // const sampleRepo = [
  //   {
  //     repoId: 1104,
  //     name: "ScreeningTestRepo1",
  //     description: "this is screening repo",
  //   },
  //   {
  //     repoId: 1105,
  //     name: "lenovo-repo",
  //     description: "repo for lenovo project",
  //   },
  // ];

 
  const sampleUsers = [
    {
      id: 2,
      name: "Sweda",
      email: "swedagmail.com",
      enumRole: "USER",
      token: null,
      gitHubUsername: null,
    },
    {
      id: 3,
      name: "Sahil",
      email: "xgc.com",
      enumRole: "USER",
      token: null,
      gitHubUsername: null,
    },
  ];

  
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);
  const mockLocation = jest.fn();
  useLocation.mockReturnValue(mockLocation);

  const api = require("../../../../../../src/network/api");
  // api.default.get.mockResolvedValueOnce({ data: sampleRepo });
  api.default.get.mockResolvedValueOnce({ data: sampleUsers });

  await act(async () => {
    render(
    
     <AddUser />
      
    );
  });

  // const selectRepoDropdown = screen.getByTestId("repoNameLabel");
  // fireEvent.click(selectRepoDropdown);

  // waitFor(() => {
  //   const selectedOption = screen.getByText("lenovo-repo");
  //   fireEvent.click(selectedOption);
  // });


  const selectUserDropdown = screen.getByTestId("dropdown");
  fireEvent.click(selectUserDropdown);

  await waitFor(() => {
    const selectedOption = screen.getByText("Sahil");
    fireEvent.click(selectedOption);
  });


    fireEvent.click(screen.getByTestId("submit"));
 
  

});
  
});
  
  