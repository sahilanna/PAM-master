import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddPmUserName from "../../../../src/screens/Dashboard/PM/addPmUsername";
import api from "../../../../src/network/api";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
jest.mock("../../../../src/network/api");

describe("AddPmUserName Component", () => {
  it("renders AddPmUserName component without errors", () => {
    render(
      <MemoryRouter>
        <AddPmUserName />
      </MemoryRouter>
    );
  });

  it("calls navigate with -1 when the close button is clicked", () => {
    const navigate = require("react-router-dom").useNavigate;
    const mockNavigate = jest.fn();

    render(
      <MemoryRouter>
        <AddPmUserName />
      </MemoryRouter>
    );

    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);

   
  });

  it("submits the form with selected user and GitHub username", async () => {
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

    const api = require("../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: sampleUsers });
    api.default.post.mockResolvedValueOnce({ data: sampleUsers });
    await act(async () => {
      render(
        <MemoryRouter>
          <AddPmUserName />
        </MemoryRouter>
      );
    });

    // Select a user from the Dropdown
    const selectUserDropdown = screen.getByTestId("Select PM");
    fireEvent.click(selectUserDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Sahil");
      fireEvent.click(selectedOption);
    });

    // Fill in the GitHub Username
    const githubUsernameInput = screen.getByPlaceholderText(
      "Enter github username"
    );
    fireEvent.change(githubUsernameInput, { target: { value: "sahilanna" } });

    await waitFor(() => {
      const submitButton = screen.getByTestId("submit");
      fireEvent.click(submitButton);
    });

    screen.debug();
  });

  it("submits the form and goes to catch block", async () => {
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

    const api = require("../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: sampleUsers });
    await api.default.post.mockRejectedValue({ response: { status: 404 } });
    await act(async () => {
      render(
        <MemoryRouter>
          <AddPmUserName />
        </MemoryRouter>
      );
    });

    // Select a user from the Dropdown
    const selectUserDropdown = screen.getByTestId("Select PM");
    fireEvent.click(selectUserDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Sahil");
      fireEvent.click(selectedOption);
    });

    // Fill in the GitHub Username
    const githubUsernameInput = screen.getByPlaceholderText(
      "Enter github username"
    );
    fireEvent.change(githubUsernameInput, { target: { value: "sahilanna" } });

    await waitFor(() => {
      const submitButton = screen.getByTestId("submit");
      fireEvent.click(submitButton);
    });

    await waitFor(() =>{
      fireEvent.click(screen.getByTestId("invalid-username"));
    })

    screen.debug();
  });




});
