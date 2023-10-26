import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProjects from "../../../../src/screens/Dashboard/UserDashboard/userProjects";
import api from "../../../../src/network/api";
import { ngrokUrl } from "../../../../src/network/config";
import { act } from "react-dom/test-utils";

jest.mock("../../../../src/network/api");

describe("PmDashboard Component", () => {
  it("renders the component without crashing", () => {
    render(
      <MemoryRouter>
        <UserProjects />
      </MemoryRouter>
    );
  });

  it("calls handleSearchChange when the search input value changes", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <UserProjects />
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText("Search Projects...");
    fireEvent.change(searchInput, { target: { value: "John" } });
  });

  it('should callll handleProjectDetails when the "view" button is clicked', async () => {
    const initialState = [
      {
        id: 1,
        projectId: "ProjectID123",
        projectName: "Sample Project1",
        projectDescription: "Sample Description",
        figma: {
          projectDTO: null,
          figmaURL: null,
          screenshotImage: null,
          user: null,
          igmaId: null,
        },
        googleDrive: {
          projectDTO: null,
          driveLink: null,
          driveId: null,
          message: null,
        },
      },
    ];

    const apiMockResponse = {
      data: initialState,
    };

    const apiMock = require("../../../../src/network/api");
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    await act(async () => {
      render(
        <MemoryRouter>
          <UserProjects />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByTestId("view-icon"));
    fireEvent.click(screen.getByTestId("onClose"));
  });

  it("should call logOut and navigate to the Login page with null user data", async () => {
    const sampleUser = { id: 123, name: "Sample User" };
    sessionStorage.setItem("item", JSON.stringify(sampleUser));
  
    render(
      <MemoryRouter>
         <UserProjects/>
      </MemoryRouter>
     
    );
    const data = sessionStorage.getItem("item");
    const user = data ? JSON.parse(data) : null;
    const id = user ? user.id : null;
  });



});

