import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateRepo from '../../../../../../src/screens/Dashboard/Admin/Create/createRepo/CreateRepo';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { MemoryRouter } from 'react-router-dom';
import CreateRepoUI from '../../../../../../src/screens/Dashboard/Admin/Create/createRepo/createRepoUI';


jest.mock('react-toastify', () => ({
  toast: {
    POSITION: {
      TOP_RIGHT: 'top-right',
    },
    error: jest.fn(),
  },
}));

test('should render CreateRepo component', () => {
  render(<CreateRepo/>);
  
});

// test('should update name and description when input fields change', () => {
//   const { getByPlaceholderText } = render(<MemoryRouter><CreateRepo /></MemoryRouter>);
//   const nameInput = getByPlaceholderText('Repository Name');
//   const descriptionInput = getByPlaceholderText('Repository Description');

//   fireEvent.change(nameInput, { target: { value: 'My Repo' } });
//   fireEvent.change(descriptionInput, { target: { value: 'Description of my repo' } });

//   expect(nameInput).toHaveValue('My Repo');
//   expect(descriptionInput).toHaveValue('Description of my repo');
// });

// test('should show an error toast if form submission fails', async () => {
//   const { getByText, getByPlaceholderText } = render(<MemoryRouter><CreateRepo /></MemoryRouter>);
//   const nameInput = getByPlaceholderText('Repository Name');
//   const descriptionInput = getByPlaceholderText('Repository Description');

//   fireEvent.change(nameInput, { target: { value: 'My Repo' } });
//   fireEvent.change(descriptionInput, { target: { value: 'Description of my repo' } });

//   // Mock the API call to fail
//   jest.spyOn(window, 'fetch').mockRejectedValue(new Error('Fake error'));

//   const createButton = getByText('Create');
//   fireEvent.click(createButton);

//   // Wait for the error toast to be called
//   await waitFor(() => {
//     expect(require('react-toastify').toast.error).toHaveBeenCalledWith('Error Occurred', {
//       position: 'top-right',
//       autoClose: 3000,
//     });
//   });

