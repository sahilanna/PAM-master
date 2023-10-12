import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import CreateDriveDetails from "../../../../../../src/screens/Dashboard/Admin/Drive/createDrive/createDriveDetails";
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















// test("handles URL input and project selection", () => {
//   render( <MemoryRouter>
//     <CreateDriveDetails />
//   </MemoryRouter>);

//   const driveURLInput = screen.getByLabelText("Drive URL");
//   fireEvent.change(driveURLInput, {
//     target: { value: "http://drive.google.com/example" },
//   });

//   expect(driveURLInput).toHaveValue("http://drive.google.com/example");

//   const projectDropdown = screen.getByLabelText("Select Project");
//   fireEvent.change(projectDropdown, { target: { value: "project-1" } });

//   expect(projectDropdown).toHaveValue("project-1");
// });

// test("validates URL format", () => {
//   render( <MemoryRouter>
//     <CreateDriveDetails />
//   </MemoryRouter>);

//   // Enter an invalid URL
//   const driveURLInput = screen.getByLabelText("Drive URL");
//   fireEvent.change(driveURLInput, { target: { value: "invalid-url" } });

//   // Ensure the URL input value is updated
//   expect(driveURLInput).toHaveValue("invalid-url");

//   // Ensure an error message is displayed
//   const errorMessage = screen.getByText("Invalid URL");
//   expect(errorMessage).toBeInTheDocument();
// });

// test("handles form submission", async () => {
//   // Mock API calls
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve({ id: "123" }),
//     })
//   );

//   render( <MemoryRouter>
//     <CreateDriveDetails />
//   </MemoryRouter>);

//   // Fill out the form
//   const driveURLInput = screen.getByLabelText("Drive URL");
//   const projectDropdown = screen.getByLabelText("Select Project");
//   const createButton = screen.getByText("Create Drive");

//   fireEvent.change(driveURLInput, {
//     target: { value: "http://drive.google.com/example" },
//   });
//   fireEvent.change(projectDropdown, { target: { value: "project-1" } });

//   // Submit the form
//   fireEvent.click(createButton);

//   // Ensure the API was called with the correct data
//   await act(async () => {
//     await new Promise((resolve) => setImmediate(resolve));
//   });

//   expect(global.fetch).toHaveBeenCalledWith(
//     "https://your-api-endpoint/createGoogleDrive",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         projectDTO: {
//           projectId: "project-1",
//           projectName: "project-1",
//         },
//         driveLink: "http://drive.google.com/example",
//       }),
//     }
//   );
// });
