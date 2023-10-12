import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import CreateFigmaDetails from "../../../../../../src/screens/Dashboard/Admin/Figma/createFigma/createFigmaDetails";
import { MemoryRouter, useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";



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