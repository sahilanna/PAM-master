import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { useNavigate, useLocation,MemoryRouter, Route, Router } from "react-router-dom";
import CommonAddProject from "../../../../../../src/screens/Dashboard/Admin/Create/addUserProject/commonAddProject";
import "@testing-library/jest-dom";
import api from "../../../../../../src/network/api";
import { NGROK_URL } from "../../../../../../src/network/config";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("../../../../../../src/network/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

describe("CommonAddProject", () => {
  const mockNavigate = jest.fn();
  const mockLocation = {
    state: {
      projectId: "123",
      projectName: "Test Project",
    },
  };

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue(mockLocation);
    api.get.mockResolvedValue({
      data: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ],
    });
    jest.clearAllMocks();
  });


  it("handles form submission with user selection", async () => {
    render(<CommonAddProject role="user" />);

    const fetchUsersPromise = Promise.resolve([
      {
        key: "1",
        text: "User 1",
        value: "1",
      },
      {
        key: "2",
        text: "User 2",
        value: "2",
      },
    ]);

    const apiGetMock = jest.spyOn(api, "get");
    apiGetMock.mockResolvedValue({ data: fetchUsersPromise });

    await fetchUsersPromise;

    const userDropdown = screen.getByTestId("userDropdown");
    fireEvent.click(userDropdown);

    const dropdownItem = screen.getByText("User 2");
    fireEvent.click(dropdownItem);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const onClose = screen.getByTestId("otp-close");
      fireEvent.click(onClose);
    });

    screen.debug();
  });

  it('goes to catch block if api response is not proper', async () => {

    const error = new Error('An error occurred');
    const apiGetMock = jest.spyOn(api, 'get');
    apiGetMock.mockRejectedValue(error);

    render(<CommonAddProject role="user" />);
    
    apiGetMock.mockRestore();
  });

  it("handles form submission without user selection", async () => {
    render(<CommonAddProject role="user" />);
  
    const fetchUsersPromise = Promise.resolve([
      {
        key: "1",
        text: "User 1",
        value: "1",
      },
      {
        key: "2",
        text: "User 2",
        value: "2",
      },
    ]);
  
    const apiGetMock = jest.spyOn(api, "get");
    apiGetMock.mockResolvedValue({ data: fetchUsersPromise });
  
    await fetchUsersPromise;
  
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
  
  
  });




  it("handles otp submission", async () => {
    const mockApiPost = jest.fn();
    const mockApiPut = jest.fn();
    api.post = mockApiPost;
    api.put = mockApiPut;

    render(<CommonAddProject role="user" />);

    const fetchUsersPromise = Promise.resolve([
      {
        key: "1",
        text: "User 1",
        value: "1",
      },
      {
        key: "2",
        text: "User 2",
        value: "2",
      },
    ]);

    const apiGetMock = jest.spyOn(api, "get");
    apiGetMock.mockResolvedValue({ data: fetchUsersPromise });
    mockApiPost.mockResolvedValueOnce({ status: 200 });

    await fetchUsersPromise;

    const userDropdown = screen.getByTestId("userDropdown");
    fireEvent.click(userDropdown);

    const dropdownItem = screen.getByText("User 2");
    fireEvent.click(dropdownItem);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const otpInput = screen.getByTestId("otp");
      fireEvent.change(otpInput, { target: { value: "123456" } });
    });

    fireEvent.click(screen.getByText("Submit OTP"));

    await waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith(
        `https://${NGROK_URL}/OTP/verify`,
        { otp: "123456" }
      );
    });

    screen.debug();
  });



  it("handles otp submission with an error response", async () => {
    const mockApiPost = jest.fn();
    const mockApiPut = jest.fn();
    api.post = mockApiPost;
    api.put = mockApiPut;
  
    render(<CommonAddProject role="user" />);
  
    const fetchUsersPromise = Promise.resolve([
      {
        key: "1",
        text: "User 1",
        value: "1",
      },
      {
        key: "2",
        text: "User 2",
        value: "2",
      },
    ]);
  
    const apiGetMock = jest.spyOn(api, "get");
    apiGetMock.mockResolvedValue({ data: fetchUsersPromise });
    mockApiPost.mockResolvedValueOnce({ status: 400 }); // Simulate an error response
  
    await fetchUsersPromise;
  
    const userDropdown = screen.getByTestId("userDropdown");
    fireEvent.click(userDropdown);
  
    const dropdownItem = screen.getByText("User 2");
    fireEvent.click(dropdownItem);
  
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      const otpInput = screen.getByTestId("otp");
      fireEvent.change(otpInput, { target: { value: "123456" } });
    });
  
    fireEvent.click(screen.getByText("Submit OTP"));
  
    await waitFor(() => {
      expect(mockApiPost).toHaveBeenCalledWith(
        `https://${NGROK_URL}/OTP/verify`,
        { otp: "123456" }
      );
  
      // Ensure that the error message is set
      expect(screen.getByText('Invalid OTP. Please try again.')).toBeInTheDocument();
    });
  
    // You can also add assertions to check that the api.put function and navigate were not called
    expect(mockApiPut).not.toHaveBeenCalled();
  });
  





  it('handles otp submission with a successful response and user update', async () => {
  const mockApiPost = jest.fn();
  const mockApiPut = jest.fn();
  api.post = mockApiPost;
  api.put = mockApiPut;

  // Define projectId and userId values
  const projectId = 'your-project-id';
  const userId = 'your-user-id';

  render(<CommonAddProject role="user" projectId={projectId} userId={userId} />);

  const fetchUsersPromise = Promise.resolve([
    {
      key: '1',
      text: 'User 1',
      value: '1',
    },
    {
      key: '2',
      text: 'User 2',
      value: '2',
    },
  ]);

  const apiGetMock = jest.spyOn(api, 'get');
  apiGetMock.mockResolvedValue({ data: fetchUsersPromise });

  // Mock the API response to have a status of 200
  mockApiPost.mockResolvedValueOnce({ status: 200 });

  await fetchUsersPromise;

  const userDropdown = screen.getByTestId('userDropdown');
  fireEvent.click(userDropdown);

  const dropdownItem = screen.getByText('User 2');
  fireEvent.click(dropdownItem);

  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);

  await waitFor(() => {
    const otpInput = screen.getByTestId('otp');
    fireEvent.change(otpInput, { target: { value: '123456' } });
  });

  fireEvent.click(screen.getByText('Submit OTP'));

  // Assert that the mockApiPost function was called with the expected parameters
  expect(mockApiPost).toHaveBeenCalledWith(
    `https://${NGROK_URL}/OTP/verify`,
    { otp: '123456' }
  );

 

  // You can also add additional assertions for navigation or other actions
});






  it("renders the component for user role", async () => {
    const { container } = render(<CommonAddProject role="user" />);
    expect(container).toMatchSnapshot();
  });

  it("renders the component for pm role", async () => {
    const { container } = render(<CommonAddProject role="pm" />);
    expect(container).toMatchSnapshot();
  });

  it("handles form submission without user selection", async () => {
    render(<CommonAddProject role="user" />);

    const submitButton = screen.getByText("Submit");
    userEvent.click(submitButton);

    expect(api.post).not.toHaveBeenCalled();
  });

  it("close button", () => {
    const { getByTestId } = render(<CommonAddProject />);
    fireEvent.click(getByTestId("X"));
  });


  it("handles catch block of handleSubmit", async () => {
    const mockApiPost = jest.fn();
    const mockApiPut = jest.fn();
    api.post = mockApiPost;
    api.put = mockApiPut;

    render(<CommonAddProject role="user" />);

    const fetchUsersPromise = Promise.resolve([
      {
        key: "1",
        text: "User 1",
        value: "1",
      },
      {
        key: "2",
        text: "User 2",
        value: "2",
      },
    ]);

    const apiGetMock = jest.spyOn(api, "get");
    apiGetMock.mockResolvedValue({ data: fetchUsersPromise });
    mockApiPost.mockRejectedValue('Error');

    await fetchUsersPromise;

    const userDropdown = screen.getByTestId("userDropdown");
    fireEvent.click(userDropdown);

    const dropdownItem = screen.getByText("User 2");
    fireEvent.click(dropdownItem);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);


  });





  it('handles otp submission with a successful response and user update', async () => {
    const mockApiPost = jest.fn();
    const mockApiPut = jest.fn();
    api.post = mockApiPost;
    api.put = mockApiPut;
  
    // Define projectId and userId values
    const projectId = "123";
    const userId = 2;
  
    render(<CommonAddProject role="user" projectId={projectId} userId={userId} />);
  
    const fetchUsersPromise = Promise.resolve([
      {
        key: '1',
        text: 'User 1',
        value: '1',
      },
      {
        key: '2',
        text: 'User 2',
        value: '2',
      },
    ]);
  
    const apiGetMock = jest.spyOn(api, 'get');
    apiGetMock.mockResolvedValue({ data: fetchUsersPromise });
  
    // Mock the API response to have a status of 200
    mockApiPost.mockResolvedValueOnce({ status: 200 });
    mockApiPost.mockResolvedValueOnce({ status: 200 });
    mockApiPut.mockResolvedValueOnce({ status: 200 });

    await fetchUsersPromise;
  
    const userDropdown = screen.getByTestId('userDropdown');
    fireEvent.click(userDropdown);
  
    const dropdownItem = screen.getByText('User 2');
    fireEvent.click(dropdownItem);
  
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      const otpInput = screen.getByTestId('otp');
      fireEvent.change(otpInput, { target: { value: '123456' } });
    });
  
    fireEvent.click(screen.getByText('Submit OTP'));
  
    // Assert that the mockApiPost function was called with the expected parameters
    expect(mockApiPost).toHaveBeenCalledWith(
      `https://${NGROK_URL}/OTP/verify`,
      { otp: '123456' }
    );

    await waitFor(() =>{
      expect(mockApiPut).toHaveBeenCalledWith(
        `https://${NGROK_URL}/projects/${projectId}/users/${userId}`,
        {
          projectId: projectId,
          userId: userId,
        }
      );

    })
   
  });

  it('handles otp submission with a unsuccessful response and user update', async () => {
    const mockApiPost = jest.fn();
    const mockApiPut = jest.fn();
    api.post = mockApiPost;
    api.put = mockApiPut;
  
    // Define projectId and userId values
    const projectId = "123";
    const userId = 2;
  
    render(<CommonAddProject role="user" projectId={projectId} userId={userId} />);
  
    const fetchUsersPromise = Promise.resolve([
      {
        key: '1',
        text: 'User 1',
        value: '1',
      },
      {
        key: '2',
        text: 'User 2',
        value: '2',
      },
    ]);
  
    const apiGetMock = jest.spyOn(api, 'get');
    apiGetMock.mockResolvedValue({ data: fetchUsersPromise });
  
    // Mock the API response to have a status of 200
    mockApiPost.mockResolvedValueOnce({ status: 200 });
    mockApiPost.mockResolvedValueOnce('Error');
  

    await fetchUsersPromise;
  
    const userDropdown = screen.getByTestId('userDropdown');
    fireEvent.click(userDropdown);
  
    const dropdownItem = screen.getByText('User 2');
    fireEvent.click(dropdownItem);
  
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
  
    await waitFor(() => {
      const otpInput = screen.getByTestId('otp');
      fireEvent.change(otpInput, { target: { value: '123456' } });
    });
  
    fireEvent.click(screen.getByText('Submit OTP'));
  
    // Assert that the mockApiPost function was called with the expected parameters
    expect(mockApiPost).toHaveBeenCalledWith(
      `https://${NGROK_URL}/OTP/verify`,
      { otp: '123456' }
    );

    
   
  });





  
});
