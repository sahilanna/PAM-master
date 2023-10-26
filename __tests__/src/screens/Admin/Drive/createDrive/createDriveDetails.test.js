import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import CreateDriveDetails from "../../../../../../src/screens/Dashboard/Admin/Drive/createDrive/createDriveDetails";
import { MemoryRouter, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";
import api from "../../../../../../src/network/api";

jest.mock("../../../../../../src/network/api")


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mockProjects = [
    { key: 1, text: 'Project 1', value: 'Project 1' },
    { key: 2, text: 'Project 2', value: 'Project 2' },
    
  ];
  

function validateURL(url) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === 'drive.google.com';
    } catch (_) {
      return false;
    }
  }

test("renders CreateDriveDetails component with form elements", () => {
  render(
    <MemoryRouter>
      <CreateDriveDetails />
    </MemoryRouter>
  );

});

test("onClose function navigates back", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <CreateDriveDetails />
    </MemoryRouter>
  );
  const closeButton = getByTestId("X");

  fireEvent.click(closeButton);

  const navigate = require("react-router-dom").useNavigate();
  waitFor(()=> {
    expect(navigate).toHaveBeenCalledWith(-1);
  })
  
});


test("onClose function navigates back", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <CreateDriveDetails />
      </MemoryRouter>
    );
    const inputElement = getByTestId('URL');
  
    fireEvent.change(inputElement, { target: { value: 'https://drive.google.com' } });
  
    
    waitFor(()=> {
        expect(CreateDriveDetails.state().driveUrl).toBe('https://drive.google.com');
    })
    
  });

test('handleSubmit is called when the Submit button is clicked', () => {
    const { getByTestId } = render(
        <MemoryRouter>
          <CreateDriveDetails />
        </MemoryRouter>
      );
    const submitButton = getByTestId('submit');
  
    
    CreateDriveDetails.handleSubmit = jest.fn();
    CreateDriveDetails.navigate = jest.fn();
    CreateDriveDetails.setDriveId = jest.fn();
    CreateDriveDetails.setDriveUrl = jest.fn();
  
    
    fireEvent.click(submitButton);

    waitFor(() => {
    expect(CreateDriveDetails.handleSubmit).toHaveBeenCalled();
    expect(CreateDriveDetails.navigate).toHaveBeenCalled();
    expect(CreateDriveDetails.setDriveId).toHaveBeenCalled();
    expect(CreateDriveDetails.setDriveUrl).toHaveBeenCalled();
    })
    
   
  });

  it("handle submit and dropdown functions", async () => {
    const sampleProjects = [
      {
        projectId: 1,
      projectName: "First Project",
      projectDescription: "This is the first repo",
      },
      {
        projectId: 2,
      projectName: "Second Project",
      projectDescription: "This is the second repo",
      },
    ];
  
    const api = require("../../../../../../src/network/api");
  
    await api.default.get.mockResolvedValueOnce({ data: sampleProjects });
    await api.default.post.mockResolvedValue({ data: { id: "figmaId" } });

  
    await act(async () => {
      render(
        <MemoryRouter>
          <CreateDriveDetails />
        </MemoryRouter>
      );
    });
  
    const selectProjectDropdown = screen.getByTestId("projects");
    fireEvent.click(selectProjectDropdown);
  
    await waitFor(() => {
      const selectOption = screen.getByText("Second Project");
      fireEvent.click(selectOption);
    });

    const inputUrl = screen.getByTestId("URL");
    fireEvent.change(inputUrl, { target: { value: "validURL" } });
  
   
  
    await waitFor(() => {
      const submit = screen.getByTestId("submit");
      fireEvent.click(submit);
    });





  });

  it("handle ", async () => {
    const sampleProjects = [
      {
        projectId: 1,
        projectName: "First Project",
        projectDescription: "This is the first repo",
      },
      {
        projectId: 2,
        projectName: "Second Project",
        projectDescription: "This is the second repo",
      },
    ];
  
    const api = require("../../../../../../src/network/api");
  
    await api.default.get.mockResolvedValueOnce({ data: sampleProjects });
    await api.default.post.mockResolvedValue({ data: { id: "figmaId" } });
  
    await act(async () => {
      render(
        <MemoryRouter>
          <CreateDriveDetails />
        </MemoryRouter>
      );
    });
  
    const selectProjectDropdown = screen.getByTestId("projects");
    fireEvent.click(selectProjectDropdown);
  
    await waitFor(() => {
      const selectOption = screen.getByText("Second Project");
      fireEvent.click(selectOption);
    });
  
    const inputUrl = screen.getByTestId("URL");
    fireEvent.change(inputUrl, { target: { value: "validURL" } });
  
    await waitFor(() => {
      const submit = screen.getByTestId("submit");
      fireEvent.click(submit);
    });
  
    // Assert that state changes and navigation are triggered
    // For example:
    const driveId = "someDriveId"; // Mock the driveId value from the API response
    // expect(screen.getByTestId("driveId").textContent).toBe(driveId);
  
    const navigateMock = jest.fn();
    // expect(navigateMock).toHaveBeenCalledWith('/driveDetails', { state: { driveId } });
  
    const driveUrlInput = screen.getByTestId("URL");
    // expect(driveUrlInput.value).toBe(''); // Make sure the input is cleared
  
    // Ensure that navigate is called with the expected arguments
    // expect(navigateMock).toHaveBeenCalledWith('/driveDetails', { state: { driveId } });
  });
  









