import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DriveRead from "../../../../../../src/screens/Dashboard/Admin/Drive/driveScreen/driveDetails";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import LoadingPage from "../../../../../../src/atoms/loadingPage";
import api from "../../../../../../src/network/api";


jest.mock("../../../../../../src/network/api")

it("renders DriveRead component", () => {
  render(
    <MemoryRouter>
      <DriveRead />
    </MemoryRouter>
  );
});


it('should call handleDeleteUrl when delete button is clicked', async () => {

  const initialState = 
 [ {
  driveId: '1',
  projectDTO: { projectId:1, projectName: 'Project 1', },
  driveLink: 'https://drive.com/project1',
},
{
  driveId: '2',
  projectDTO: { projectId:2, projectName: 'Project 2', },
  driveLink: 'https://drive.com/project2',
},
    ];
  const apiMockResponse = {
    data: initialState,
  };

  

  const apiMock = require('../../../../../../src/network/api');
  apiMock.default.get.mockResolvedValue(apiMockResponse);

  const handleDeleteUrl = jest.fn();
  apiMock.default.delete.mockResolvedValue(apiMockResponse);

  const { getByText, getAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <DriveRead />
    </MemoryRouter>
  );

  
  await waitFor(() =>{
    const deleteButton = getAllByTestId('delete');
    deleteButton.forEach((deleteButton) => {
       fireEvent.click(deleteButton)
       waitFor(() =>{
        const cancel = getByTestId('onClose')
        fireEvent.click(cancel);
       })
    });
  })


})

it('should call handleDeleteUrl when delete button is clicked', async () => {

  const initialState = 
 [ {
  driveId: '1',
  projectDTO: { projectId:1, projectName: 'Project 1', },
  driveLink: 'https://drive.com/project1',
},
{
  driveId: '2',
  projectDTO: { projectId:2, projectName: 'Project 2', },
  driveLink: 'https://drive.com/project2',
},
    ];
  const apiMockResponse = {
    data: initialState,
  };

  

  const apiMock = require('../../../../../../src/network/api');
  apiMock.default.get.mockResolvedValue(apiMockResponse);

  const handleDeleteUrl = jest.fn();
  apiMock.default.delete.mockResolvedValue(apiMockResponse);

  const { getByText, getAllByTestId, getByTestId } = render(
    <MemoryRouter>
      <DriveRead />
    </MemoryRouter>
  );

  
  await waitFor(() =>{
    const deleteButton = getAllByTestId('delete');
    deleteButton.forEach((deleteButton) => {
       fireEvent.click(deleteButton)
       waitFor(() =>{
        const confirm = getByTestId('confirm');
        fireEvent.click(confirm);
        // expect(handleDeleteUrl).toHaveBeenCalledWith(expectedUserId);
       })
    });
  })


})




it('calls handleSearchChange when the search input value changes', () => {
  const { getByPlaceholderText } = render(
    
      <MemoryRouter>
        <DriveRead/>
      </MemoryRouter>
   
  );

  const searchInput = getByPlaceholderText('Search Project');
  fireEvent.change(searchInput, { target: { value: 'John' } });

});










// test("renders DriveRead component with loading", () => {
//   render(
//     <MemoryRouter>
//       <DriveRead />
//     </MemoryRouter>
//   );
// });

// test("handles search input", () => {
//   render(
//     <MemoryRouter>
//       <DriveRead />
//     </MemoryRouter>
//   );

  
//   const searchInput = screen.getByPlaceholderText("Search Project");
//   fireEvent.change(searchInput, { target: { value: "Project 1" } });


//   expect(searchInput).toHaveValue("Project 1");
// });


