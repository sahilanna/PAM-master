import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddUserName from "../../../../src/screens/Dashboard/Users/AddUserName";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import api from "../../../../src/network/api";
import { act } from "react-dom/test-utils";
jest.mock("../../../../src/network/api");
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

  it("renders the component without crashing", () => {
    render(
      <MemoryRouter>
        <AddUserName />
      </MemoryRouter>
    );

    expect(screen.getByText("Add Github UserName")).toBeInTheDocument();
  });

  it('displays a "Select User" dropdown', async () => {
    mockApi.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <AddUserName />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Select User")).toBeInTheDocument();
    });
  });

  it("submits the form with selected user and GitHub username", async () => {
    const sampleUsers = [
      {
        id: 2,
        name: "Hassain",
        email: "swedagmail.com",
        enumRole: "USER",
        token: null,
        gitHubUsername: null,
      },
      {
        id: 3,
        name: "Nipoon",
        email: "xgc.com",
        enumRole: "USER",
        token: null,
        gitHubUsername: null,
      },
    ];

    const api = require("../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: sampleUsers });
    api.default.post.mockResolvedValueOnce({ data: sampleUsers });

    await act(async () => {
      render(
        <MemoryRouter>
          <AddUserName />
        </MemoryRouter>
      );
    });

    // Select a user from the Dropdown
    const selectUserDropdown = screen.getByTestId("Select User");
    fireEvent.click(selectUserDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Nipoon");
      fireEvent.click(selectedOption);
    });

    // Fill in the GitHub Username
    const githubUsernameInput = screen.getByPlaceholderText("Enter github username");
    fireEvent.change(githubUsernameInput, { target: { value: "sahilanna" } });

    await waitFor(() =>{
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
    })

    screen.debug();
  });

  it("submits the form and goes to catch block", async () => {
    const sampleUsers = [
      {
        id: 2,
        name: "Hassain",
        email: "swedagmail.com",
        enumRole: "USER",
        token: null,
        gitHubUsername: null,
      },
      {
        id: 3,
        name: "Nipoon",
        email: "xgc.com",
        enumRole: "USER",
        token: null,
        gitHubUsername: null,
      },
    ];

    const api = require("../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: sampleUsers });
    await api.default.post.mockRejectedValue({ response: { status: 404 } });

    await act(async () => {
      render(
        <MemoryRouter>
          <AddUserName />
        </MemoryRouter>
      );
    });

    // Select a user from the Dropdown
    const selectUserDropdown = screen.getByTestId("Select User");
    fireEvent.click(selectUserDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Nipoon");
      fireEvent.click(selectedOption);
    });

    // Fill in the GitHub Username
    const githubUsernameInput = screen.getByPlaceholderText("Enter github username");
    fireEvent.change(githubUsernameInput, { target: { value: "sahilanna" } });

    await waitFor(() =>{
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
    })

    await waitFor(() =>{
      fireEvent.click(screen.getByTestId("invalid-username"));
    })

    screen.debug();
  });

  it("updates githubUsername when text is entered into the input field", () => {
    render(
      <MemoryRouter>
        <AddUserName />
      </MemoryRouter>
    );
    const usernameInput = screen.getByPlaceholderText("Enter github username");

    fireEvent.change(usernameInput, { target: { value: "testusername" } });

    expect(usernameInput).toHaveValue("testusername");
  });

  it("close button", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <AddUserName />
      </MemoryRouter>
    );
    const onCloseMock = jest.fn();
    fireEvent.click(getByTestId("X"));
  });
});
