import React from "react";
import { render, screen } from "@testing-library/react";
import LandingPage from "../../../src/screens/LandingPage";
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';


jest.mock('../../../src/assets/photo.jpg', () => 'photo.jpg');
jest.mock('../../../src/assets/photo2.avif', () => 'photo2.avif');
jest.mock('../../../src/assets/photo3.avif', () => 'photo3.avif');


describe("LandingPage Component", () => {
  it("renders the component without crashing", () => {
    render(<MemoryRouter><LandingPage /></MemoryRouter>);
  });


  it("displays a header with text 'Build-Better-Together'", () => {
    render(<MemoryRouter><LandingPage /></MemoryRouter>);
  
    expect(screen.getByText("Build-Better-Together")).toBeInTheDocument();
  });

  it("displays project management information", () => {
    render(<MemoryRouter><LandingPage /></MemoryRouter>);
  
    expect(screen.getByText("Manage Projects With One Tool")).toBeInTheDocument();
    expect(screen.getByText("What we have created :")).toBeInTheDocument();
    expect(
      screen.getByText("All-in-one project management tool to streamline projects")
    ).toBeInTheDocument();
    expect(screen.getByText("Collaborate with your team, and track progress effectively.")).toBeInTheDocument();
  });


});
