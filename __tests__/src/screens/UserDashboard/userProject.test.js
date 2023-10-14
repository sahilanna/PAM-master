import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProjects from "../../../../src/screens/Dashboard/UserDashboard/userProjects";
import api from "../../../../src/network/api";
import { ngrokUrl } from "../../../../src/network/config";


jest.mock('../../../../src/network/api', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            projectId: 'ProjectID123',
            projectName: 'Sample Project1',
            projectDescription: 'Sample Description',
          },
          {
            id: 1,
            projectId: 'ProjectID007',
            projectName: 'Sample Project2',
            projectDescription: 'Sample Description2',
          },
          
        ],
      })
    ),
  };
});

describe("PmDashboard Component", () => {
//   it("renders the component without crashing", () => {
//     render(
//         <MemoryRouter>
//           <UserProjects />
//         </MemoryRouter>
//     );
//   });


// it('calls handleSearchChange when the search input value changes', () => {
//     const { getByPlaceholderText } = render(
     
//         <MemoryRouter>
//           <UserProjects/>
//         </MemoryRouter>
      
//     );

//     const searchInput = getByPlaceholderText('Search Projects...');
//     fireEvent.change(searchInput, { target: { value: 'John' } });

//   });

it('calls handleProjectDetails when the "View" button is clicked',  () => {
  const mockProject = {
    id: 1,
    projectId: 'ProjectID123',
    projectName: 'Sample Project',
    projectDescription: 'Sample Description',
  };

  const handleProjectDetailsMock = jest.fn();

  const { getAllByTestId } = render(
   <MemoryRouter><UserProjects /></MemoryRouter> 
  );

  waitFor(() => {
    expect(api.get).toHaveBeenCalledWith(`https://${ngrokUrl}/users/${id}/role/user/projects`);
  });



   const viewButtons = getAllByTestId('view');
  

  viewButtons.forEach((button) => {
    fireEvent.click(button);
  });

  
  // expect(handleProjectDetailsMock).toHaveBeenCalledTimes(1); 

});





});
