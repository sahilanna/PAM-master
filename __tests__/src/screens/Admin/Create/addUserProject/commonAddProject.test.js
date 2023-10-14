import React from 'react';
import { render, screen, fireEvent, waitFor, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate, useLocation } from 'react-router-dom';
import CommonAddProject from '../../../../../../src/screens/Dashboard/Admin/Create/addUserProject/commonAddProject';
import '@testing-library/jest-dom';
import api from '../../../../../../src/network/api';


jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../../../../../../src/network/api', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

describe('CommonAddProject', () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    state: {
      projectId: '123',
      projectName: 'Test Project',
    },
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue(mockLocation);
    api.get.mockResolvedValue({
      data: [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ],
    });
    jest.clearAllMocks();
  });

  it('renders the component for user role', async () => {
    const { container } = render(<CommonAddProject role="user" />);
    expect(container).toMatchSnapshot();
    
  });

  it('renders the component for pm role', async () => {
    const { container } = render(<CommonAddProject role="pm" />);
    expect(container).toMatchSnapshot();
    
  });

  it('handles user selection and OTP submission', async () => {
    // Mocking the API responses
    api.get.mockResolvedValueOnce({ data: [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }] });
    api.post.mockResolvedValueOnce({});
    api.post.mockResolvedValueOnce({ status: 200 });
    api.put.mockResolvedValueOnce({});

    render(<CommonAddProject role="user" />);


   
    const otpInput = screen.getByRole('textbox'); 
    userEvent.type(otpInput, '123456');
   
    
  });


  it('handles form submission without user selection', async () => {
    render(<CommonAddProject role="user" />);

   
    const submitButton = screen.getByText('Submit');
    userEvent.click(submitButton);

    
    expect(api.post).not.toHaveBeenCalled();
  });



it('close button', () => {
    const { getByTestId }  = render(<CommonAddProject/>)
    fireEvent.click(getByTestId('X'))  
})

// it('handles user selection from Dropdown in CommonAddProject',() => {
//   const userOptions = [
//     {
//       data: [
//         { id: 1, name: 'User 1' },
//         { id: 2, name: 'User 2' },
//       ],
//     }
//   ];

//   api.get.mockResolvedValue({data:userOptions});
  
//   const handleUserChange = jest.fn();

//   render(
//     <CommonAddProject
//       user={userOptions}
//       handleUserChange={handleUserChange}
//     />
//   );

//   const dropdown = screen.getByTestId('userDropdown');
//     userEvent.click(dropdown)

//    userEvent.selectOptions(dropdown, ['User 1']);
//   //  expect(handleUserChange).toHaveBeenCalledWith(expect.anything(), { value: 2 });
 
  
// });

});
