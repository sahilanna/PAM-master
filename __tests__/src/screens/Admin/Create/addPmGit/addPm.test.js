import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import api from "../../../../../../src/network/api";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import AddPm from "../../../../../../src/screens/Dashboard/Admin/Create/addPmGit/addPm";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("../../../../../../src/network/api");

// const mockRepositories = [
//   { repoId: "repo1", name: "MyProjectRepo" },
//   { repoId: "repo2", name: "AnotherRepo" },
// ];

// const mockUsernames = ["JohnDoe", "JaneSmith", "BobJohnson"];

// const gitAccessToken = "yourAccessToken"; // Replace with your actual access token

describe("AddPm Component", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  test("renders AddPm component", () => {
    render(<AddPm />);
    expect(screen.getByText("Add PM")).toBeInTheDocument();
  });

  test("skips the form and navigates to addUser", async () => {
    const navigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(navigate);

    render(<AddPm />);
    await screen.findByText("Add PM");

    const skipButton = screen.getByText("Skip");
    fireEvent.click(skipButton);

    expect(navigate).toHaveBeenCalledWith("/addUser", {
      state: { selectedRepo: "" },
    });
  });

  it("calls onClose when the close button is clicked", () => {
    const mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);
    render(<AddPm />);
    const closeButton = screen.getByTestId("close");

    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  //Check this once
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

    const apiMockResponse = {
      data: sampleRepo,
    };


    const api = require("../../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: apiMockResponse });

    await act(async () => {
      render(
        <MemoryRouter>
          <AddPm />
        </MemoryRouter>
      );
    });

    const selectUserDropdown = screen.getByTestId("Select-Repo");
    fireEvent.click(selectUserDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("lenovo-repo");
      fireEvent.click(selectedOption);
    });

    screen.debug();
  });
});
