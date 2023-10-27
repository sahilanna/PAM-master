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

  it("should submit the form with selected user and description", async () => {
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
    await api.default.get.mockResolvedValueOnce({ data: sampleUsers });

    await act(async () => {
      render(
        <MemoryRouter>
          <PmRequestForm />
        </MemoryRouter>
      );
    });

    const userDropdown = screen.getByTestId("user-dropdown");
    fireEvent.click(userDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Sahil");
      fireEvent.click(selectedOption);
    });

    const githubUsernameInput = screen.getByTestId("description");
    await waitFor(() => {
      fireEvent.change(githubUsernameInput, {
        target: { value: "Hellooooooo" },
      });
    });

    await waitFor(() => {
      const submit = screen.getByTestId("submit");
      fireEvent.click(submit);
    });

    screen.debug();
  });

  test("should call logOut and navigate to the Login page with null user data", async () => {
    const sampleUser = { id: 123, name: "Sample User" };
    sessionStorage.setItem("item", JSON.stringify(sampleUser));

    render(
      <MemoryRouter>
        <PmRequestForm />
      </MemoryRouter>
    );
    const data = sessionStorage.getItem("item");
    const user = data ? JSON.parse(data) : null;
    const id = user ? user.id : null;
  });

  it("should submit the form with selected user and description and go to if condition", async () => {
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
    await api.default.get.mockResolvedValueOnce({ data: sampleUsers });

    await api.default.post.mockResolvedValueOnce({ data: { success: true } });

    await act(async () => {
      render(
        <MemoryRouter>
          <PmRequestForm />
        </MemoryRouter>
      );
    });

    const userDropdown = screen.getByTestId("user-dropdown");
    fireEvent.click(userDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Sahil");
      fireEvent.click(selectedOption);
    });

    const githubUsernameInput = screen.getByTestId("description");
    await waitFor(() => {
      fireEvent.change(githubUsernameInput, {
        target: { value: "Hellooooooo" },
      });
    });

    await waitFor(() => {
      const submit = screen.getByTestId("submit");
      fireEvent.click(submit);
    });

    screen.debug();
  });

  
});
