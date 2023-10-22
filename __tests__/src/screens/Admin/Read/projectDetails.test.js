import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getByTestId,
  screen,
} from "@testing-library/react";
import ProjectDetails from "../../../../../src/screens/Dashboard/Admin/Read/ProjectDetails";
import { useNavigate, MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import api from "../../../../../src/network/api";
import { ngrokUrl } from "../../../../../src/network/config";
import { act } from "react-dom/test-utils";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../../../src/network/api");

// jest.mock('../../../../../src/network/api', () => ({
//   delete: jest.fn(),
//   get: jest.fn(),
//   post: jest.fn(),
// }));

describe("ProjectDetails Component", () => {
  const project = {
    projectName: "Sample Project",
    projectDescription: "This is a sample project",
    pmName: "John Doe",
    repositories: ["Repo 1", "Repo 2"],
    figma: { figmaURL: "https://figma.com/project" },
    googleDrive: { driveLink: "https://drive.google.com/project" },
    lastUpdated: "2023-10-15T12:00:00Z",
  };
  const onClose = jest.fn();
  const showAddEmployeeButton = true;
  const showAddFileButton = true;
  const onAddFile = jest.fn();
  const handleDeleteProjectMock = jest.fn();

  it("renders project details correctly", () => {
    const project = {
      projectName: "Sample Project",
      projectDescription: "This is a sample project",
      pmName: "John Doe",
      repositories: ["Repo 1", "Repo 2"],
      figma: { figmaURL: "https://figma.com/project" },
      googleDrive: { driveLink: "https://drive.google.com/project" },
      lastUpdated: "2023-10-15T12:00:00Z",
    };
    const onClose = jest.fn();
    const showAddEmployeeButton = true;
    const showAddFileButton = true;
    const onAddFile = jest.fn();

    const { getByText, queryByText } = render(
      <MemoryRouter>
        <ProjectDetails
          project={project}
          onClose={onClose}
          showAddEmployeeButton={showAddEmployeeButton}
          showAddFileButton={showAddFileButton}
          onAddFile={onAddFile}
        />
      </MemoryRouter>
    );
  });

  it("calls confirmDeleteProject when the delete button is clicked", async () => {
    const project = {
      projectId: 1,
      projectName: "Sample Project",
      projectDescription: "This is a sample project",
      pmName: "John Doe",
      repositories: ["Repo 1", "Repo 2"],
      figma: { figmaURL: "https://figma.com/project" },
      googleDrive: { driveLink: "https://drive.google.com/project" },
      lastUpdated: "2023-10-15T12:00:00Z",
      helpDocuments: null,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    const mockDeleteProject = jest.fn();
    jest.mock('../../../../../src/network/api', () => ({
      default: {
        delete: mockDeleteProject,
      },
    }));

    api.post = jest.fn().mockResolvedValue({ data: 'OTP sent' });

   
      render(
        <MemoryRouter>
          <ProjectDetails />
        </MemoryRouter>
      );
   

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);

    waitFor(() => {
      fireEvent.click(screen.getByTestId("confirm"));
    });

    waitFor(() =>{
      fireEvent.click(screen.getByTestId("close-otp"));
    })
    screen.debug();
  });

  it("calls cancelDeleteProject when the cancel button is clicked", async () => {
    const project = {
      projectName: "Sample Project",
      projectDescription: "This is a sample project",
      pmName: "John Doe",
      repositories: ["Repo 1", "Repo 2"],
      figma: { figmaURL: "https://figma.com/project" },
      googleDrive: { driveLink: "https://drive.google.com/project" },
      lastUpdated: "2023-10-15T12:00:00Z",
      helpDocuments: null,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    await act(async () => {
      render(
        <MemoryRouter>
          <ProjectDetails />
        </MemoryRouter>
      );
    });

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);
    waitFor(() =>{
      fireEvent.click(screen.getByTestId("onClose"));
    })
   
  });

  it("does not display the Add File button if showAddFileButton is false", () => {
    const { queryByText } = render(
      <MemoryRouter>
        <ProjectDetails
          project={project}
          onClose={onClose}
          showAddEmployeeButton={showAddEmployeeButton}
          showAddFileButton={false}
          onAddFile={onAddFile}
        />
      </MemoryRouter>
    );

    expect(queryByText("Add File")).toBeNull();
  });

  it("navigates to the addFile page on button click", () => {
    const projectId = "sampleProjectId";
    const projectName = "Sample Project Name";
    // const helpDocumentId = 'sampleHelpDocumentId';

    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <ProjectDetails
          project={project}
          onClose={onClose}
          showAddEmployeeButton={showAddEmployeeButton}
          showAddFileButton={true}
          onAddFile={onAddFile}
        />
      </MemoryRouter>
    );

    const helpDocumentsTab = getByText("Help Documents");
    fireEvent.click(helpDocumentsTab);

    waitFor(() => {
      const addButton = getByTestId("add-file");
      fireEvent.click(addButton);

      expect(navigate).toHaveBeenCalledWith("/addFile", {
        state: { projectId, projectName },
      });
    });
  });
});
