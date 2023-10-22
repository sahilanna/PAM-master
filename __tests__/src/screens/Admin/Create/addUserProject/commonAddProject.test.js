import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate, useLocation } from "react-router-dom";
import CommonAddProject from "../../../../../../src/screens/Dashboard/Admin/Create/addUserProject/commonAddProject";
import "@testing-library/jest-dom";
import api from "../../../../../../src/network/api";
import { ngrokUrl } from "../../../../../../src/network/config";

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
        `https://${ngrokUrl}/OTP/verify`,
        { otp: "123456" }
      );
    });

    // await waitFor(() =>  {
    //   expect(mockApiPut).toHaveBeenCalledWith(
    //   `https://${ngrokUrl}/projects/123/users/userId`,
    //   {
    //     projectId: '123',
    //     userId: 'userId',
    //   }
    // )})

    // expect(mockNavigate).toHaveBeenCalledWith('/AdminDashboard');

    screen.debug();
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
