import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import PmRequestForm from "../../../../src/screens/Dashboard/ProjectManager/PmRequestForm";
import api from "../../../../src/network/api";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { act } from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../../src/network/api");

describe("PmRequestForm Component", () => {
  it("renders PmRequestForm component without errors", () => {
    const location = {
      state: {
        projectId: 1,
        projectName: "ProjectName",
      },
    };
    render(
      <MemoryRouter>
        <PmRequestForm location={location} />
      </MemoryRouter>
    );
  });

  //   it("submits the request form successfully", async () => {
  //     const location = {
  //       state: {
  //         projectId: 1,
  //         projectName: "ProjectName",
  //       },
  //     };

  //     // Mock the API response
  //     api.post.mockResolvedValue({ data: { success: true } });

  //     const { getByLabelText, getByText } = render(
  //         <MemoryRouter><PmRequestForm location={location} /></MemoryRouter>
  //     );

  //     const descriptionInput = getByLabelText("Description:");
  //     fireEvent.change(descriptionInput, { target: { value: "Test description" } });

  //     const submitButton = getByText("Submit");
  //     fireEvent.click(submitButton);

  //     // Wait for the asynchronous code to complete
  //     await waitFor(() => {
  //       expect(api.post).toHaveBeenCalledWith(
  //         `https://your-api-url-here.com/request/`,
  //         {
  //           pmName: "YourPmName",
  //           user: {
  //             id: "selectedUserId",
  //           },
  //           project: {
  //             projectId: 1,
  //           },
  //           requestDescription: "Test description",
  //         }
  //       );

  //       // You can also add assertions for the success message or navigation
  //     });
  //   });

  it("displays 'No users available' when there are no users", () => {
    const location = {
      state: {
        projectId: 1,
        projectName: "ProjectName",
      },
    };

    const { getByText } = render(
      <MemoryRouter>
        <PmRequestForm location={location} />
      </MemoryRouter>
    );

    const noUsersMessage = getByText("No users available");
    expect(noUsersMessage).toBeInTheDocument();
  });

  it("calls navigate with -1 when the close button is clicked", async () => {
    const navigate = require("react-router-dom").useNavigate;
    const mockNavigate = jest.fn();
    navigate.mockReturnValue(mockNavigate);

    const { getByTestId } = render(
      <MemoryRouter>
        <PmRequestForm />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId("close"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });


  it('should submit the form with selected user and description', async () => {
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
        email: "xgc@gmail.com",
        enumRole: "USER",
        token: null,
        gitHubUsername: null,
      },
    ];

   

    const api = require("../../../../src/network/api");
    await api.default.get.mockResolvedValueOnce({ data: sampleUsers }) 
    


  

    await act(async () => {
      render(
        <MemoryRouter>
          <PmRequestForm />
        </MemoryRouter>
      );
    });

    // const githubUsernameInput = screen.getByPlaceholderText("Enter github username");
    // fireEvent.change(githubUsernameInput, { target: { value: "sahilanna" } });

    
    const userDropdown = screen.getByTestId("user-dropdown");
    fireEvent.click(userDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Sahil");
      fireEvent.click(selectedOption);
    });

    const githubUsernameInput = screen.getByTestId("description");
    await waitFor(() =>{
      fireEvent.change(githubUsernameInput, { target: { value: "Hellooooooo" } });
    })


   
    await waitFor(() => {
      const submit = screen.getByTestId("submit");
      fireEvent.click(submit);
    });


    
      // const submitButton = screen.getByTestId('submit');
      // fireEvent.click(submitButton);
  
      screen.debug();
    
  });
});
