import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddUser from '../../../../../../src/screens/Dashboard/Admin/Create/addUserGit/addUser';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import "@testing-library/jest-dom";

jest.mock('react-toastify', () => ({
  toast: {
    POSITION: {
      TOP_RIGHT: 'top-right',
    },
    error: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));

test('should render AddUser component', () => {
   render(<MemoryRouter><AddUser /></MemoryRouter>);
});



test('close button', () => {
    const { getByTestId }  = render(
        <MemoryRouter>
            <AddUser/>
        </MemoryRouter>
    )
    const onCloseMock = jest.fn()
    fireEvent.click(getByTestId('X'))
    
})

// test('should call handleSubmit when the "Submit" button is clicked', () => {
    
//     const { getByTestId } = render(<MemoryRouter>
//         <AddUser />
//     </MemoryRouter>);
  
//     const submitButton = getByTestId('submit');
//     AddUser.handleSubmit = jest.fn();
//     AddUser.navigate = jest.fn();
//     fireEvent.click(submitButton);
    
//     waitFor(() => 
//     {
//         expect(AddUser.handleSubmit).toHaveBeenCalled();
//     })
   
//   });
  
  
  
  
  