import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PmDashboard from "../../../../src/screens/Dashboard/ProjectManager/PmDashboard";
import api from "../../../../src/network/api";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

jest.mock("../../../../src/network/api");
describe("PmDashboard Component", () => {
  it("renders the component without crashing", () => {
    render(
      <MemoryRouter>
        <PmDashboard />
      </MemoryRouter>
    );
  });

  it("calls handleSearchChange when the search input value changes", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <PmDashboard />
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText("Search Projects...");
    fireEvent.change(searchInput, { target: { value: "John" } });
  });

  it('should call handleProjectDetails when the "view" button is clicked', async () => {
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
          <PmDashboard />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByTestId("view-icon"));
    fireEvent.click(screen.getByTestId("onClose"));
  });

  it('should call navigateForm when the "add-user" button is clicked', async () => {
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
          <PmDashboard />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByTestId("add-user"));
  
  });








});
