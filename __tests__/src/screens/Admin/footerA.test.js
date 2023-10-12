import React from "react";
import { render, screen } from "@testing-library/react";
import FooterA from "../../../../src/screens/Dashboard/Admin/footer";
import "@testing-library/jest-dom";


describe("Footer Component", () => {
  it("renders Footer component without errors", () => {
    render(<FooterA />);
  });


  it("renders tools links", () => {
    render(<FooterA />);
    
    
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("Jira")).toBeInTheDocument();
  });


});
