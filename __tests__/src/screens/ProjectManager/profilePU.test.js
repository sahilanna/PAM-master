import React from "react";
import { render, screen } from "@testing-library/react";
import commonProfile from "../../../../src/screens/Dashboard/ProjectManager/commonProfile";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

// Mock the profile data
const mockProfileData = {
  id: 1,
  name: "John Doe",
  email: "johndoe@example.com",
  enumRole: "PM",
};

test("renders profile details for a PM", () => {
  render(
    <MemoryRouter>
      <commonProfile profileData={mockProfileData} />
    </MemoryRouter>
  );

  // Check if the component renders the profile details correctly
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
  expect(screen.getByText("Role")).toBeInTheDocument();
  expect(screen.getByText("PM")).toBeInTheDocument();
  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
});

test("renders profile details for a User", () => {
  const userProfileData = {
    ...mockProfileData,
    enumRole: "User",
  };

  render(
    <MemoryRouter>
      <commonProfile profileData={userProfileData} />
    </MemoryRouter>
  );

  // Check if the component renders the profile details correctly
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
  expect(screen.getByText("Role")).toBeInTheDocument();
  expect(screen.getByText("User")).toBeInTheDocument();
  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("1")).toBeInTheDocument();
});
