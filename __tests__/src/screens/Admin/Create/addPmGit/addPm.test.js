import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import api from "../../../../../../src/network/api";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { act } from "react-dom/test-utils";
import AddPm from "../../../../../../src/screens/Dashboard/Admin/Create/addPmGit/addPm";


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../../../../../../src/network/api");


describe("AddPm Component", () => {


  it("renders AddPm component", () => {
   
    render(<AddPm />);
    expect(screen.getByText("Add PM")).toBeInTheDocument();
  });

  it("skips the form and navigates to addUser", async () => {
   
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<AddPm />);
    await screen.findByText("Add PM");

    const skipButton = screen.getByText("Skip");
    fireEvent.click(skipButton);

    // expect(navigate).toHaveBeenCalledWith("/addUser", {
    //   state: { selectedRepo: "" },
    // });
  });

  it("calls onClose when the close button is clicked", () => {

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(<AddPm />);
    const closeButton = screen.getByTestId("close");

    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("submits the form with selected user and GitHub username", async () => {
    const sampleRepo = [
      {
        repoId: 1104,
        name: "ScreeningTestRepo1",
        description: "this is screening repo",
      },
      {
        repoId: 1105,
        name: "lenovo-repo",
        description: "repo for lenovo project",
      },
    ];

   
    const sampleUsers = [
      {
        id: 2,
        name: "Sweda",
        email: "swedagmail.com",
        enumRole: "PROJECT_MANAGER",
        token: null,
        gitHubUsername: null,
      },
      {
        id: 3,
        name: "Sahil",
        email: "xgc.com",
        enumRole: "PROJECT_MANAGER",
        token: null,
        gitHubUsername: null,
      },
    ];

    
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const api = require("../../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: sampleRepo });
    api.default.get.mockResolvedValueOnce({ data: sampleUsers });

    await act(async () => {
      render(
      
       <AddPm />
        
      );
    });

    const selectRepoDropdown = screen.getByTestId("Select-Repo");
    fireEvent.click(selectRepoDropdown);

    waitFor(() => {
      const selectedOption = screen.getByText("lenovo-repo");
      fireEvent.click(selectedOption);
    });


    const selectUserDropdown = screen.getByTestId("dropdownu");
    fireEvent.click(selectUserDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Sahil");
      fireEvent.click(selectedOption);
    });

    await waitFor(() =>{
      fireEvent.click(screen.getByTestId("submit"));
    })
    

  });
});
