import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Router, useNavigate } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import Test from "../../../src/redux/Login";
import "@testing-library/jest-dom";
import { ngrokLogin } from "../../../src/network/config";
import { decodeIdToken } from "../../../src/redux/Login";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("axios"); // Mock axios calls
jest.mock("../../src/Assets/logo1.png", () => "logo1.png");

window.google = {
  accounts: {
    id: {
      initialize: jest.fn(),
      renderButton: jest.fn(),
    },
  },
};

describe("Test Component", () => {
  beforeEach(() => {
    // Mock axios response for the Google login test
    axios.get.mockResolvedValue({
      data: {
        enumRole: "USER",
        token: "example-token",
      },
    });
  });

  it("renders the component", () => {
    render(<Test />);
    expect(screen.getByText("Welcome to PAM")).toBeInTheDocument();
  });

  it("handles Google login", async () => {
    render(<Test />);

    const signInButton = screen.getByTestId("signIn");
    fireEvent.click(signInButton);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(window.google.accounts.id.initialize).toHaveBeenCalledWith({
      client_id: process.env.REACT_APP_googleClientID,
      callback: expect.any(Function),
    });
  });


  it("handles Google lsssogin", async () => {
    render(<Test />);

    const signInButton = screen.getByTestId("signIn");
    fireEvent.click(signInButton);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(window.google.accounts.id.initialize).toHaveBeenCalledWith({
      client_id: process.env.REACT_APP_googleClientID,
      callback: expect.any(Function),
    });
  });


  it("correctly decodes a JWT token", () => {
    const sampleToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    const decodedData = decodeIdToken(sampleToken);

    const expectedDecodedData = {
      sub: "1234567890",
      name: "John Doe",
      iat: 1516239022,
    };

    expect(decodedData).toEqual(expectedDecodedData);
  });

  it("handles Google login correctly", async () => {
    // Define a sample response from the API
    const sampleResponse = {
      data: {
        enumRole: "USER",
        token: "sampleToken",
      },
    };

    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    // Mock the axios.get method to simulate an API call
    await axios.get.mockResolvedValue(sampleResponse);

    const { container } = render(<Test />);

    // Simulate a click on the Google login button
    const googleLoginButton = container.querySelector("#signIn");

    fireEvent.click(googleLoginButton);
    

   


    screen.debug();
  });



  it('handles Google login through useEffect', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const { container } = render(<Test />);

    // Verify that the Google login button is rendered
    const googleLoginButton = container.querySelector('#signIn');
    expect(googleLoginButton).toBeInTheDocument();

    

    // Simulate the Google login button click
    fireEvent.click(googleLoginButton);
   
    // Wait for the asynchronous code within handleGoogleLogin to complete
    await waitFor(() => {
      // You can add assertions here to check the behavior of handleGoogleLogin
      // For example, check if axios.get was called and if navigation occurred.

      // Example assertion: Check if axios.get was called
      expect(axios.get).toHaveBeenCalledTimes(1);

      // Example assertion: Check if navigation occurred
      expect(mockNavigate).toHaveBeenCalledWith('/userProjects', { state: { data: {} } });
    });

    // Add more assertions as needed
  });

 



});
