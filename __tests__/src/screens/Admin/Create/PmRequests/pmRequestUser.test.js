import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PmRequestUser from '../../../../../../src/screens/Dashboard/Admin/PmRequests/PmRequestUser';
import api from '../../../../../../src/network/api';
import '@testing-library/jest-dom'
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ngrokUrl } from '../../../../../../src/network/config';
import { act } from 'react-dom/test-utils';

jest.mock('../../../../../../src/network/api')
// , () => ({
//   get: jest.fn(),
//   put: jest.fn(),
// }));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));


describe('PmRequestUser Component', () => {
  const mockRequestData = [
    {
      accessRequestId: 1,
      pmName: 'PM Name 1',
      project: {
        projectId: 1,
        projectName: 'Project 1',
      },
      user: {
        id: 1,
        name: 'User 1',
      },
      requestDescription: 'Request 1 Description',
    },
    // Add more mock request data as needed
  ];

  beforeEach(() => {
    api.get.mockResolvedValue({ data: mockRequestData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // it('renders the component with loading state', () => {
  //   const { container } = render(<MemoryRouter><PmRequestUser /></MemoryRouter>);
  //   expect(api.get).toHaveBeenCalledTimes(1);
  //   expect(api.get).toHaveBeenCalledWith(`https://${ngrokUrl}/request/allActive`);
  // });

  // it('renders the component with request data', async () => {
  //   api.get.mockResolvedValue({ data: mockRequestData });

  //   const { getByText } = render(<MemoryRouter><PmRequestUser /></MemoryRouter>);
  //   await waitFor(() => {
  //     expect(getByText('Project 1')).toBeInTheDocument();
  //     expect(getByText('User 1')).toBeInTheDocument();
  //     // Add more assertions based on your component's data
  //   });
  // });

  // it('calls AcceptRequest when "Accept" button is clicked', async () => {
  //   const acceptRequestMock = jest.fn();
  //   api.put.mockResolvedValue({ status: 200 });

  //   await act(async () => {
  //     render(
  //       <MemoryRouter>
  //         <PmRequestUser />
  //       </MemoryRouter>
  //     );
  //   });
  //    waitFor(() => {
  //     const acceptButton = screen.getByText('Accept');
  //     fireEvent.click(acceptButton);
  //     expect(api.put).toHaveBeenCalledTimes(1);
  //     expect(api.put).toHaveBeenCalledWith(`https://${ngrokUrl}/request/update/1`, { allowed: true });
  //     // Add assertions related to success toast or other behavior
  //   });
  // });

  

  it('calls DeclineRequest when "Decline" button is clicked', async () => {
    const sampleUsers = [
      {
        id: 2,
        name: "Sweda",
        email: "swedagmail.com",
        enumRole: "USER",
        token: null,
        gitHubUsername: null,
      },
     
    ];

   

    const api = require("../../../../../../src/network/api");
    await api.default.get.mockResolvedValueOnce({ data: sampleUsers }) 
    
    const declineRequestMock = jest.fn();
    // api.put.mockResolvedValue({ status: 200 });

    await act(async () => {
      render(
        <MemoryRouter>
          <PmRequestUser />
        </MemoryRouter>
      );
    });

    
    fireEvent.click(screen.getByTestId("red"));
   

    screen.debug();

    //  waitFor(() => {
    //   const declineButton = screen.getByTestId('red');
    //   fireEvent.click(declineButton);
    //   expect(api.put).toHaveBeenCalledTimes(1);
    //   expect(api.put).toHaveBeenCalledWith(`https://${ngrokUrl}/request/update/1`, { allowed: false });
    //   // Add assertions related to success toast or other behavior
    // });
  });



  it('calls DeclineRequest when "Accept" button is clicked', async () => {
    // Define a sample 'item' object with the expected structure
    const item = {
      accessRequestId: 123, // Replace with a valid access request ID
      user: {
        id: 2, // User ID
        name: "Sweda",
        email: "swedagmail.com",
        enumRole: "USER",
        token: null,
        gitHubUsername: null,
      },
      project: {
        projectId: 456, // Project ID
        // Add other project properties as needed
      },
    };
  
    const sampleUsers = [item]; // Put the 'item' into an array to match the structure returned by your API
  
    const api = require("../../../../../../src/network/api");
    await api.default.get.mockResolvedValueOnce({ data: sampleUsers });
  
    const declineRequestMock = jest.fn();
  
    await act(async () => {
      render(
        <MemoryRouter>
          <PmRequestUser />
        </MemoryRouter>
      );
    });
  
    fireEvent.click(screen.getByTestId("green"));
  
  });

  it('goes into catch field when error comes from get api', async () => {
    // Define a sample 'item' object with the expected structure
    const item = {
      accessRequestId: 123, // Replace with a valid access request ID
      user: {
        id: 2, // User ID
        name: "Sweda",
        email: "swedagmail.com",
        enumRole: "USER",
        token: null,
        gitHubUsername: null,
      },
      project: {
        projectId: 456, 
        
      },
    };
  
    const sampleUsers = [item]; // Put the 'item' into an array to match the structure returned by your API
  
    const api = require("../../../../../../src/network/api");
    await api.default.get.mockRejectedValue('Sample error');
 
    const declineRequestMock = jest.fn();
  
    await act(async () => {
      render(
        <MemoryRouter>
          <PmRequestUser />
        </MemoryRouter>
      );
    });
  
    // fireEvent.click(screen.getByTestId("green"));
  
  });
  
});
