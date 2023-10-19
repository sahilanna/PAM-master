import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Create from '../../../../../../src/screens/Dashboard/Admin/Create/addProjectRepo/Create';
import { MemoryRouter } from 'react-router-dom';
import api from '../../../../../../src/network/api';
import { act } from 'react-dom/test-utils';


jest.mock('../../../../../../src/network/api')

// test('Render Create component', () => {
//   const { getByTestId } = render(<MemoryRouter><Create /></MemoryRouter>);
  
//   fireEvent.click(getByTestId('X'))
// });

it.only("do something", async () => {
    const sampleProjects = [
        {
          projectId: 1,
          projectName: "First Project",
          projectDescription: "This is the first project",
    
        },
      {
        projectId: 2,
        projectName: "Second Project",
        projectDescription: "This is the second project",
  
      },
    ];


    const api = require("../../../../../../src/network/api");
    api.default.get.mockResolvedValueOnce({ data: sampleProjects });

    await act(async () => {
      render(
        <MemoryRouter>
          <Create />
        </MemoryRouter>
      );
    });

    await waitFor(() =>{
      const selectProjectDropdown = screen.getByTestId("project-dropdown");
      fireEvent.click(selectProjectDropdown);
     
    })


    
      const selectedOption = screen.getByText("Second Project");
      fireEvent.click(selectedOption);
  

    screen.debug();
  });