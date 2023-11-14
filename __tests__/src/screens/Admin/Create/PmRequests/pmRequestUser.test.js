import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PmRequestUser from '../../../../../../src/screens/Dashboard/Admin/PmRequests/PmRequestUser';
import api from '../../../../../../src/network/api';
import '@testing-library/jest-dom'
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { NGROK_URL } from '../../../../../../src/network/config';
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
    

    await act(async () => {
      render(
        <MemoryRouter>
          <PmRequestUser />
        </MemoryRouter>
      );
    });

    
    fireEvent.click(screen.getByTestId("red"));
   

    screen.debug();

   
  });




  it('calls DeclineRequest when "Decline" button is pressed with status 204', async () => {
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
    await api.default.put.mockResolvedValueOnce({ status: 204 }) 
    const declineRequestMock = jest.fn();
    

    await act(async () => {
      render(
        <MemoryRouter>
          <PmRequestUser />
        </MemoryRouter>
      );
    });

    
    fireEvent.click(screen.getByTestId("red"));
   

    screen.debug();

   
  });



  it('calls AcceptRequest when "Accept" button is clicked', async () => {
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

  it('calls AcceptRequest when "Accept" button ', async () => {
   
    const item = {
      accessRequestId: 123, 
      user: {
        id: 2, 
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
  
    const sampleUsers = [item]; 
  
    const api = require("../../../../../../src/network/api");
    await api.default.get.mockResolvedValueOnce({ data: sampleUsers });
    await api.default.put.mockResolvedValueOnce({ status: 204 })
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

  it('calls AcceptRequest when "Accept" button ', async () => {
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
    await api.default.put.mockResolvedValueOnce({ status: 201 })
    await api.default.put.mockResolvedValueOnce({ status: 204 })
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

  it('calls AcceptRequest when "Accept" button ', async () => {
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
    await api.default.put.mockResolvedValueOnce({ status: 201 })
    await api.default.put.mockResolvedValueOnce({ status: 201 })
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



  test("should call Logout and navigate to the Login page with null user data", async () => {
    const sampleUser = { id: 123, name: "Sample User" };
    sessionStorage.setItem("item", JSON.stringify(sampleUser));
  
    render(
      <MemoryRouter>
         <PmRequestUser/>
      </MemoryRouter>
     
    );
    const data = sessionStorage.getItem("item");
    const user = data ? JSON.parse(data) : null;
    const id = user ? user.id : null;
  });

  it('calls AcceptRequest when "Accept" button ', async () => {
    
    const item = {
      accessRequestId: 123,
      user: {
        id: 2, 
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
  
    const sampleUsers = [item]; 
    const api = require("../../../../../../src/network/api");
    await api.default.get.mockResolvedValueOnce({ data: sampleUsers });
    await api.default.put.mockResolvedValueOnce('Error')
    // await api.default.put.mockResolvedValueOnce({ status: 201 })
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

  it('calls AcceptRequest when "Accept" button ', async () => {
    
    const item = {
      accessRequestId: 123,
      user: {
        id: 2, 
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
  
    const sampleUsers = [item]; 
    const api = require("../../../../../../src/network/api");
    await api.default.get.mockResolvedValueOnce({ data: sampleUsers });
    await api.default.put.mockResolvedValueOnce({ status: 201 })
    await api.default.put.mockResolvedValueOnce('Error')
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

  
});