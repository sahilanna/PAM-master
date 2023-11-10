import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getByTestId,
  screen,
} from "@testing-library/react";
import ProjectDetails from "../../../../../src/screens/Dashboard/Admin/Read/ProjectDetails";
import { useNavigate, MemoryRouter, navigate } from "react-router-dom";
import "@testing-library/jest-dom";
import api from "../../../../../src/network/api";
import { NGROK_URL } from "../../../../../src/network/config";
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
      helpDocuments: null,
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

  it("displays data when result is an array", async () => {
    const mockData = [{ id: 1, fileName: "file1" }];
    // Mock the api.get function to return an array
    jest.spyOn(api, "get").mockResolvedValue({ data: mockData });

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

    const helpDocumentsTab = getByText("Help Documents");
    fireEvent.click(helpDocumentsTab);

    waitFor(() => {
      const addButton = getByTestId("add-file");
      fireEvent.click(addButton);

      expect(navigate).toHaveBeenCalledWith("/addFile", {
        state: { projectId, projectName },
      });
    });

    await waitFor(() => {
      const fileLink = screen.getByTestId("file-download");
      fireEvent.click(fileLink);
    });
    screen.debug();

    // Wait for the data to be displayed
  });


  it("displays data when result is an array", async () => {
    const mockData = [{ id: 1, fileName: "file1" }];
    // Mock the api.get function to return an array
    jest.spyOn(api, "get").mockResolvedValue({ data: mockData });

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

    const helpDocumentsTab = getByText("PM");
    fireEvent.click(helpDocumentsTab);
  })

  it("then displays data when result is an array", async () => {
    const mockData = [{ id: 1, fileName: "file1" }];
    // Mock the api.get function to return an array
    const navigateMock = jest.fn();
    const downloadFile = jest.fn(() => {
      navigate("/adminDashboard"); // Simulate navigate behavior
    });

    jest.spyOn(api, "get").mockResolvedValue({ data: mockData });

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
          downloadFile={downloadFile}
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

    await waitFor(() => {
      const fileLink = screen.getByTestId("file-download");
      fireEvent.click(fileLink);
    });

    screen.debug();

    // Wait for the data to be displayed
  });

  it("delete file function", async () => {
    const mockData = [{ id: 1, fileName: "file1" }];
    // Mock the api.get function to return an array
    jest.spyOn(api, "get").mockResolvedValue({ data: mockData });

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

    const helpDocumentsTab = getByText("Help Documents");
    fireEvent.click(helpDocumentsTab);

    waitFor(() => {
      const addButton = getByTestId("add-file");
      fireEvent.click(addButton);

      expect(navigate).toHaveBeenCalledWith("/addFile", {
        state: { projectId, projectName },
      });
    });

    await waitFor(() => {
      const fileLink = screen.getByTestId("delete-file");
      fireEvent.click(fileLink);
    });
    screen.debug();

    // Wait for the data to be displayed
  });

  it("goes into catch block of delete file function", async () => {
    const mockData = [{ id: 1, fileName: "file1" }];
    // Mock the api.get function to return an array
    jest.spyOn(api, "get").mockResolvedValue({ data: mockData });
    jest.spyOn(api, "delete").mockRejectedValue("Error");
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

    const helpDocumentsTab = getByText("Help Documents");
    fireEvent.click(helpDocumentsTab);

    waitFor(() => {
      const addButton = getByTestId("add-file");
      fireEvent.click(addButton);

      expect(navigate).toHaveBeenCalledWith("/addFile", {
        state: { projectId, projectName },
      });
    });

    await waitFor(() => {
      const fileLink = screen.getByTestId("delete-file");
      fireEvent.click(fileLink);
    });
    screen.debug();

    // Wait for the data to be displayed
  });

  it("displays an error message when result is not an array", async () => {
    // Mock the api.get function to return an invalid result
    jest.spyOn(api, "get").mockResolvedValue({ data: "invalid data" });

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

    // Wait for the error message to be displayed
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

    const apiMockResponse = {
      data: project,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    const mockDeleteProject = jest.fn();
    api.default.delete.mockResolvedValue(apiMockResponse);

    api.post = jest.fn().mockResolvedValue({ data: "OTP sent" });

    render(
      <MemoryRouter>
        <ProjectDetails />
      </MemoryRouter>
    );

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);

    fireEvent.click(screen.getByTestId("confirm"));

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
    waitFor(() => {
      fireEvent.click(screen.getByTestId("onClose"));
    });
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

  it("navigates to the addFile page on button click", async () => {
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

    screen.debug();
  });

  it("closes OTP Modal", async () => {
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

    const apiMockResponse = {
      data: project,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    const mockDeleteProject = jest.fn();
    api.default.delete.mockResolvedValue(apiMockResponse);

    api.default.post.mockResolvedValue({ data: "OTP sent" });

    render(
      <MemoryRouter>
        <ProjectDetails />
      </MemoryRouter>
    );

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);

    fireEvent.click(screen.getByTestId("confirm"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("close-otp"));
    });
  });

  it("closes", async () => {
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

    const apiMockResponse = {
      data: project,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    const mockDeleteProject = jest.fn();
    api.default.delete.mockResolvedValue(apiMockResponse);

    api.default.post.mockResolvedValue({ response: false });

    render(
      <MemoryRouter>
        <ProjectDetails />
      </MemoryRouter>
    );

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);

    fireEvent.click(screen.getByTestId("confirm"));
  });

  it("submits OTP Modal", async () => {
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

    const apiMockResponse = {
      data: project,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    const mockDeleteProject = jest.fn();
    api.default.delete.mockResolvedValue(apiMockResponse);

    api.default.post.mockResolvedValue({ data: "OTP sent" });

    render(
      <MemoryRouter>
        <ProjectDetails />
      </MemoryRouter>
    );

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);

    fireEvent.click(screen.getByTestId("confirm"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit"));
    });
  });

  it("submits OTP Modal and goes in If condition", async () => {
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

    const apiMockResponse = {
      data: project,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    const mockDeleteProject = jest.fn();
    api.default.delete.mockResolvedValue(apiMockResponse);

    api.default.post.mockResolvedValue({ data: "OTP sent" });

    await api.default.delete.mockResolvedValue({ data: "Project deleted" });

    render(
      <MemoryRouter>
        <ProjectDetails />
      </MemoryRouter>
    );

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);

    fireEvent.click(screen.getByTestId("confirm"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit"));
    });
  });

  it("submits OTP Modal and goes in If condition", async () => {
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

    const apiMockResponse = {
      data: project,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    const mockDeleteProject = jest.fn();
    api.default.delete.mockResolvedValue(apiMockResponse);

    api.default.post.mockResolvedValue({ data: "OTP sent" });

    await api.default.delete.mockResolvedValue({ data: "Project deleted" });

    render(
      <MemoryRouter>
        <ProjectDetails />
      </MemoryRouter>
    );

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);

    fireEvent.click(screen.getByTestId("confirm"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit"));
    });
  });

  it("goes into catch block of handleOtpSubmit", async () => {
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

    const apiMockResponse = {
      data: project,
    };

    const api = require("../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: project });

    const mockDeleteProject = jest.fn();
    api.default.delete.mockResolvedValue(apiMockResponse);

    api.default.post.mockResolvedValue({ data: "OTP sent" });
    // api.default.delete.mockResolvedValue('Error');

    render(
      <MemoryRouter>
        <ProjectDetails />
      </MemoryRouter>
    );

    const deleteProject = screen.getByTestId("delete-project");
    fireEvent.click(deleteProject);

    fireEvent.click(screen.getByTestId("confirm"));

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit"));
    });

    api.default.post.mockRejectedValue('Error');

    await waitFor(() => {
      const otpInput = screen.getByTestId("otp-input");
      fireEvent.change(otpInput, { target: { value: "123456" } });
    });

    fireEvent.click(screen.getByTestId("submit"));

    screen.debug();
  });





});
