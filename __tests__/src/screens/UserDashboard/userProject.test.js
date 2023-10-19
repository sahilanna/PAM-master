import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProjects from "../../../../src/screens/Dashboard/UserDashboard/userProjects";
import api from "../../../../src/network/api";
import { ngrokUrl } from "../../../../src/network/config";
import { act } from "react-dom/test-utils";

jest.mock("../../../../src/network/api");
// , () => {
//   return {
//     get: jest.fn(() =>
//       Promise.resolve({
//         data: [
//           {
//             id: 1,
//             projectId: 'ProjectID123',
//             projectName: 'Sample Project1',
//             projectDescription: 'Sample Description',
//           },
//           {
//             id: 1,
//             projectId: 'ProjectID007',
//             projectName: 'Sample Project2',
//             projectDescription: 'Sample Description2',
//           },

//         ],
//       })
//     ),
//   };
// });

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
});

