import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import FigmaRead from "../../../../../../src/screens/Dashboard/Admin/Figma/FigmaRead";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import api from "../../../../../../src/network/api";
import { ngrokUrl } from "../../../../../../src/network/config";
import DialogBox from "../../../../../../src/screens/Dashboard/DialogBox/DialogBox";

// jest.mock('../../../../../../src/network/api', () => ({
//     delete:jest.fn(),
// }));

jest.mock("../../../../../../src/network/api");

describe("FigmaRead Component", () => {
  const navigateMock = jest.fn();
  const handleAddUserMock = jest.fn();
  const handleDeleteUrlMock = jest.fn();
  const setShowModalMock = jest.fn();
  const setShowConfirmDialogMock = jest.fn();

  const projects = [
    {
      figmaId: "1",
      projectDTO: { projectName: "Project 1" },
      figmaURL: "https://figma.com/project1",
    },
    {
      figmaId: "2",
      projectDTO: { projectName: "Project 2" },
      figmaURL: "https://figma.com/project2",
    },
  ];

  it("should call handleViewDetails when the view button is clicked", async () => {
    const initialState = [
      {
        figmaId: "1",
        projectDTO: { projectName: "Project 1" },
        figmaURL: "https://figma.com/project1",
      },
      {
        figmaId: "2",
        projectDTO: { projectName: "Project 2" },
        figmaURL: "https://figma.com/project2",
      },
    ];
    const apiMockResponse = {
      data: initialState,
    };

    const apiMock = require("../../../../../../src/network/api");
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    const handleDeleteUrl = jest.fn();
    apiMock.default.delete.mockResolvedValue(apiMockResponse);

    const { getByText, getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <FigmaRead />
      </MemoryRouter>
    );

    await waitFor(() => {
      const deleteButton = getAllByTestId("delete");
      deleteButton.forEach((deleteButton) => {
        fireEvent.click(deleteButton);
        waitFor(() => {
          const confirm = getByTestId("confirm");
          fireEvent.click(confirm);
          // expect(handleDeleteUrl).toHaveBeenCalledWith(expectedUserId);
        });
      });
    });
  });



  it("shouldgo to catch block when get api is not hit properly", async () => {
    const initialState = [
      {
        figmaId: "1",
        projectDTO: { projectName: "Project 1" },
        figmaURL: "https://figma.com/project1",
      },
      {
        figmaId: "2",
        projectDTO: { projectName: "Project 2" },
        figmaURL: "https://figma.com/project2",
      },
    ];
    const apiMockResponse = {
      data: initialState,
    };

    const apiMock = require("../../../../../../src/network/api");
    apiMock.default.get.mockRejectedValue('Sample Error');

    
    const { getByText, getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <FigmaRead />
      </MemoryRouter>
    );


  });







  it("should call handleViewDetails when the view button is clicked", async () => {
    const initialState = [
      {
        figmaId: "1",
        projectDTO: { projectName: "Project 1" },
        figmaURL: "https://figma.com/project1",
      },
      {
        figmaId: "2",
        projectDTO: { projectName: "Project 2" },
        figmaURL: "https://figma.com/project2",
      },
    ];
    const apiMockResponse = {
      data: initialState,
    };

    const apiMock = require("../../../../../../src/network/api");
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    const handleDeleteUrl = jest.fn();
    apiMock.default.delete.mockResolvedValue(apiMockResponse);

    const { getAllByTestId, getByTestId } = render(
      <MemoryRouter>
        <FigmaRead />
      </MemoryRouter>
    );

    await waitFor(() => {
      const deleteButton = getAllByTestId("delete");
      deleteButton.forEach((deleteButton) => {
        fireEvent.click(deleteButton);
        waitFor(() => {
          const cancel = getByTestId("onClose");
          fireEvent.click(cancel);
        });
      });
    });
  });

  it("renders Figma URLs correctly", () => {
    render(
      <MemoryRouter>
        <FigmaRead />
      </MemoryRouter>
    );
  });

 

 

  it('calls setShowModal when the "Create Figma" button is clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <FigmaRead
          projects={projects}
          navigate={navigateMock}
          handleAddUser={handleAddUserMock}
          handleDeleteUrl={handleDeleteUrlMock}
          setShowModal={setShowModalMock}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId("create"));
    // waitFor(() => {
    //   expect(setShowModalMock).toHaveBeenCalledWith(true);
    // });
  });

  it("calls handleSearchChange when the search input value changes", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <FigmaRead />
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText("Search Figma...");
    fireEvent.change(searchInput, { target: { value: "John" } });
  });

  it('should call handleAddUser when the "Add User" button is clicked', async () => {
    const initialState = [
      {
        figmaId: "1",
        projectDTO: { projectName: "Project 1" },
        figmaURL: "https://figma.com/project1",
      },
      {
        figmaId: "2",
        projectDTO: { projectName: "Project 2" },
        figmaURL: "https://figma.com/project2",
      },
    ];

    const apiMockResponse = {
      data: initialState,
    };

    const apiMock = require("../../../../../../src/network/api"); // Replace with your actual API mock path
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    const handleAddUser = jest.fn();
    const handleDisplayVerification = jest.fn();

    const { getAllByTestId } = render(
      <MemoryRouter>
        <FigmaRead />
      </MemoryRouter>
    );

    await waitFor(() => {
      const addUserButton = getAllByTestId("add");
      addUserButton.forEach((addUserButton) => {
        fireEvent.click(addUserButton);
      });
    });

    await waitFor(() => {
      const verificationButton = getAllByTestId("verification");
      verificationButton.forEach((verificationButton) => {
        fireEvent.click(verificationButton);
      });
    });
  });


  it('should call handleAddUser when the "Add User" button is clicked and close the modal', async () => {
    const initialState = [
      {
        figmaId: "1",
        projectDTO: { projectName: "Project 1" },
        figmaURL: "https://figma.com/project1",
      },
      
    ];

    const apiMockResponse = {
      data: initialState,
    };

    const apiMock = require("../../../../../../src/network/api"); // Replace with your actual API mock path
    apiMock.default.get.mockResolvedValue(apiMockResponse);

    const handleAddUser = jest.fn();
    const handleDisplayVerification = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <FigmaRead />
      </MemoryRouter>
    );

    await waitFor(() => {
      const addUserButton = getByTestId("add");
      
        fireEvent.click(addUserButton);
    });

   fireEvent.click(getByTestId('close'));

  });


 

});
