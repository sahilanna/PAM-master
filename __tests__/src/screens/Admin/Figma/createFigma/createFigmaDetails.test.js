import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import CreateFigmaDetails from "../../../../../../src/screens/Dashboard/Admin/Figma/createFigma/createFigmaDetails";
import { MemoryRouter, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";
import CreateFigmaDetailsUI from "../../../../../../src/screens/Dashboard/Admin/Figma/createFigma/createFigmaDetailsUI";
import api from "../../../../../../src/network/api";
import { ngrokUrl } from "../../../../../../src/network/config";
import userEvent from '@testing-library/user-event';
import 'jest-location-mock';

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
      return parsedUrl.hostname === 'figma.com';
    } catch (_) {
      return false;
    }
  }

test("renders CreateDriveDetails component with form elements", () => {
  render(
    <MemoryRouter>
      <CreateFigmaDetails />
    </MemoryRouter>
  );

});

test("onClose function navigates back", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <CreateFigmaDetails />
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
        <CreateFigmaDetails />
      </MemoryRouter>
    );
    const inputElement = getByTestId('URL');
  
    fireEvent.change(inputElement, { target: { value: 'https://figma.com' } });
  
    
    waitFor(()=> {
        expect(CreateFigmaDetails.state().driveUrl).toBe('https://figma.com');
    })
    
  });

test('handleSubmit is called when the Submit button is clicked', () => {
    const { getByTestId } = render(
        <MemoryRouter>
          <CreateFigmaDetails />
        </MemoryRouter>
      );
    const submitButton = getByTestId('submit');
  
    
    CreateFigmaDetails.handleSubmit = jest.fn();
    CreateFigmaDetails.navigate = jest.fn();
    CreateFigmaDetails.setFigmaId = jest.fn();
    CreateFigmaDetails.setDriveUrl = jest.fn();
  
    
    fireEvent.click(submitButton);

    waitFor(() => {
    expect(CreateFigmaDetails.handleSubmit).toHaveBeenCalled();
    expect(CreateFigmaDetails.navigate).toHaveBeenCalled();
    expect(CreateFigmaDetails.setFigmaId).toHaveBeenCalled();
    expect(CreateFigmaDetails.setDriveUrl).toHaveBeenCalled();
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
          <CreateFigmaDetails />
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


test('handle submit and check function calls', async () => {
  
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

  const api = require('../../../../../../src/network/api');
  await api.default.get.mockResolvedValueOnce({ data: sampleProjects });
  api.default.post.mockResolvedValue({ data: { id: 'figmaId' } });

  const setFigmaId = jest.fn();
  const navigate = jest.fn();
  const setFigmaUrl = jest.fn();

  render(<CreateFigmaDetails />);

  await waitFor(() => {
    const selectOption = screen.getByText("Second Project");
    fireEvent.click(selectOption);
  });

  const inputUrl = screen.getByTestId('URL');
  userEvent.type(inputUrl, 'validURL');

  const submitButton = screen.getByTestId('submit');

  const originalReplace = window.location.replace;
  window.location.replace = jest.fn();

  fireEvent.click(submitButton);

  

  
  window.location.replace = originalReplace;

 
});





