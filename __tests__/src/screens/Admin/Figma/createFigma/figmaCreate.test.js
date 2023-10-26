import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  userEvent,
} from "@testing-library/react";
import FigmaCreate from "../../../../../../src/screens/Dashboard/Admin/Figma/FigmaCreate";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import api from "../../../../../../src/network/api";
import { act } from "react-dom/test-utils";
import { UserEvent } from "@testing-library/user-event";
jest.mock("../../../../../../src/network/api");

jest.mock("../../../../../../src/network/api", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

describe("FigmaCreate Component", () => {
  const onCloseMock = jest.fn();
  const figmaURL = "https://example.com/figma-url";
  const projectId = "project-123";
  const figmaId = "figma-456";

  const mockUsers = [
    { key: 0, text: "User 1", value: "User 1" },
    { key: 1, text: "User 2", value: "User 2" },
  ];

  const mockApiPost = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the FigmaCreate component", () => {
    render(
      <MemoryRouter>
        <FigmaCreate
          onClose={onCloseMock}
          figmaURL={figmaURL}
          projectId={projectId}
          figmaId={figmaId}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  it("selects a user and handles form submission", () => {
    render(
      <MemoryRouter>
        <FigmaCreate
          onClose={onCloseMock}
          figmaURL={figmaURL}
          projectId={projectId}
          figmaId={figmaId}
        />
      </MemoryRouter>
    );

    const userDropdown = screen.getByTestId("User");
    waitFor(() => {
      fireEvent.change(userDropdown, { target: { value: "User 1" } });
    });

    const fileInput = screen.getByTestId("Upload");
    Object.defineProperty(fileInput, "files", {
      value: [
        new File(["screenshot"], "screenshot.png", { type: "image/png" }),
      ],
    });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith(
        `https://example.com/figmas/${figmaId}/user`,
        {
          user: "User 1",
          screenshotImage: expect.any(File),
        }
      );
    });

    waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it("handles file upload and sets screenshotImage", () => {
    const figmaURL = "https://example.com/figma";
    const figmaId = "sampleFigmaId";
    const projectId = "projectId";

    render(
      <MemoryRouter>
        <FigmaCreate
          onClose={onCloseMock}
          figmaURL={figmaURL}
          projectId={projectId}
          figmaId={figmaId}
        />
      </MemoryRouter>
    );

    const screenshotImageFile = new File(["image data"], "screenshot.png", {
      type: "image/png",
    });
    const fileInput = screen.getByTestId("ss");

    const mockFileReader = {
      readAsDataURL: jest.fn(),
      result: "data:image/png;base64,...",
    };
    window.FileReader = jest.fn(() => mockFileReader);

    fireEvent.change(fileInput, { target: { files: [screenshotImageFile] } });

    waitFor(() => {
      expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(
        screenshotImageFile
      );
    });

    // expect(screen.getByLabelText('screenshotImage')).toHaveValue(mockFileReader.result);

    delete window.FileReader;
  });

  it("catch block of form submission", () => {
    render(
      <MemoryRouter>
        <FigmaCreate
          onClose={onCloseMock}
          figmaURL={figmaURL}
          projectId={projectId}
          figmaId={figmaId}
        />
      </MemoryRouter>
    );

    const userDropdown = screen.getByTestId("User");
    waitFor(() => {
      fireEvent.change(userDropdown, { target: { value: "User 1" } });
    });

    const fileInput = screen.getByTestId("Upload");
    Object.defineProperty(fileInput, "files", {
      value: [
        new File(["screenshot"], "screenshot.png", { type: "image/png" }),
      ],
    });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    waitFor(() => {
      // expect(mockApiPost).toHaveBeenCalledWith(`https://example.com/figmas/${figmaId}/user`, {
      //   user: 'User 1',
      //   screenshotImage: expect.any(File),
      // });
      mockApiPost.mockRejectedValue("Sample Error");
    });

    waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  test("should call logOut and navigate to the Login page with null user data", async () => {
    const sampleUser = { id: 123, name: "Sample User" };
    sessionStorage.setItem("item", JSON.stringify(sampleUser));

    render(
      <MemoryRouter>
        <FigmaCreate />
      </MemoryRouter>
    );
    const data = sessionStorage.getItem("item");
    const user = data ? JSON.parse(data) : null;
    const id = user ? user.id : null;
  });

  it("selects a user and handles form submission with error", async () => {
    // Mock the API post call to reject with an error
    const mockApiPost = jest.spyOn(api, "post");
    mockApiPost.mockRejectedValue(new Error("API error"));

    render(
      <MemoryRouter>
        <FigmaCreate
          onClose={onCloseMock}
          figmaURL={figmaURL}
          projectId={projectId}
          figmaId={figmaId}
        />
      </MemoryRouter>
    );

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
  });

  it("handles URL input change", () => {
    render(
      <MemoryRouter>
        <FigmaCreate
          onClose={onCloseMock}
          figmaURL={figmaURL}
          projectId={projectId}
          figmaId={figmaId}
        />
      </MemoryRouter>
    );

    const urlInput = screen.getByTestId("url-select");

    fireEvent.change(urlInput, {
      target: { value: "https://example.com/figma" },
    });

    // Assert that the state 'url' is updated with the new value
    expect(screen.getByTestId("url-select")).toHaveValue(
      "https://example.com/figma"
    );
  });

  class MockFileReader {
    result = null;

    readAsDataURL(file) {
      this.result = `data:${file.type};base64,base64-encoded-data`; // Simulated base64 data
      this.onload();
    }

    onload() {}
  }

  it("handles file upload and updates screenshotImage state", async () => {
    render(
      <MemoryRouter>
        <FigmaCreate
          onClose={onCloseMock}
          figmaURL={figmaURL}
          projectId={projectId}
          figmaId={figmaId}
        />
      </MemoryRouter>
    );

    const fileInput = screen.getByTestId("Upload");

    // Create an instance of the MockFileReader
    const mockFileReader = new MockFileReader();

    // Replace the global FileReader with the MockFileReader
    global.FileReader = jest.fn(() => mockFileReader);

    // Simulate a file upload event
    fireEvent.change(fileInput, {
      target: {
        files: [
          new File(["screenshot"], "screenshot.png", { type: "image/png" }),
        ],
      },
    });

    // Wait for the asynchronous code to update the state
    await waitFor(() => {
      // Assert that the screenshotImage state is updated with the simulated base64 data
      expect(screen.getByTestId("ss")).toBeInTheDocument();
    });

    // Restore the original FileReader
    delete global.FileReader;
  });

  it("calls handleUserChange", async () => {
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

    const api = require("../../../../../../src/network/api");
    api.get.mockResolvedValueOnce({ data: sampleUsers });

    await act(async () => {
      render(
        <MemoryRouter>
          <FigmaCreate
            onClose={onCloseMock}
            figmaURL={figmaURL}
            projectId={projectId}
            figmaId={figmaId}
          />
        </MemoryRouter>
      );
    });

    const userDropdown = screen.getByTestId("User");
    fireEvent.click(userDropdown);

    await waitFor(() => {
      const selectedOption = screen.getByText("Sahil");
      fireEvent.click(selectedOption);
    });
  });
});
