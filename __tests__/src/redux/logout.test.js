import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Logout from "../../../src/redux/Logout";
import api from "../../../src/network/api";
import { MemoryRouter } from "react-router-dom";
import { ngrokUrl } from "../../../src/network/config";
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
      ).toHaveBeenCalledWith(`https://${ngrokUrl}/users/${mockUser.id}/logout`);
    });
  });
});
