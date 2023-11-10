import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Profile from "../../../../src/screens/Dashboard/Admin/Profile";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import api from "../../../../src/network/api";
import { NGROK_URL } from "../../../../src/network/config";

jest.mock("../../../../src/network/api", () => ({
  get: jest.fn(),
}));

const mockProfileData = {
  id: 1,
  email: "johndoe@example.com",
};

test("renders profile details", async () => {
  api.get.mockResolvedValue({
    data: {
      name: "John Doe",
      enumRole: "User",
    },
  });

  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  waitFor(() => {
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  waitFor(() => {
    expect(api.get).toHaveBeenCalledWith(`https://${NGROK_URL}/users/1`);
  });
});

test("renders profile details with error", async () => {
  api.get.mockRejectedValue(new Error("API error"));

  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  expect(api.get).toHaveBeenCalledWith(`https://${NGROK_URL}/users/null`);
});

test("renders profile details without profile data", async () => {
  sessionStorage.setItem("item", JSON.stringify(null));

  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  expect(api.get).toHaveBeenCalledWith(`https://${NGROK_URL}/users/null`);
});

test("renders profile details with profile data", async () => {
  const mockProfileData = {
    id: 1,
    email: "johndoe@example.com",
  };

  sessionStorage.setItem("item", JSON.stringify(mockProfileData));

  api.get.mockResolvedValue({
    data: {
      name: "John Doe",
      enumRole: "User",
    },
  });

  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
});
