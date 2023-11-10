import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logout from "../../../src/redux/Logout";
import api from "../../../src/network/api";
import { MemoryRouter } from "react-router-dom";
import { NGROK_URL } from "../../../src/network/config";
jest.mock("../../../src/network/api");

describe("Logout Component", () => {
  it("should call logOut and navigate to the Login page", async () => {
    const mockNavigate = jest.fn();

    const mockUser = { id: 123 };
    sessionStorage.setItem("item", JSON.stringify(mockUser));

    render(
      <MemoryRouter>
        <Logout />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        require("../../../src/network/api").default.post
      ).toHaveBeenCalledWith(`https://${NGROK_URL}/users/${mockUser.id}/logout`);
    });
  });


  it("should call logOut and navigate to the Login page", async () => {
    const mockUser = { id: 123 };
    sessionStorage.setItem("item", JSON.stringify(mockUser));

    // Mock the api.post method to reject the promise
    api.post.mockRejectedValue(new Error("An error occurred"));

    // Create a mock object with navigate property
    const mockNavigate = jest.fn();
    const originalUseNavigate = require("react-router-dom").useNavigate;
    // require("react-router-dom").useNavigate = () => mockNavigate;

    render(<MemoryRouter><Logout /></MemoryRouter>);

  });

  it("should call logOut and navigate to the Login page with null user data", async () => {
    
    sessionStorage.removeItem("item");

   
    api.post.mockResolvedValue({});

    render(<MemoryRouter><Logout /></MemoryRouter>);

  
  });

  

  
});
