import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../src/screens/Footer";
import "@testing-library/jest-dom";


describe("Footer Component", () => {
  it("renders Footer component without errors", () => {
    render(<Footer />);
  });

  it("renders social media links", () => {
    render(<Footer />);
    
   
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Instagram")).toBeInTheDocument();
  });

  it("renders business links", () => {
    render(<Footer />);
    
    
    expect(screen.getByText("LinkedIn")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("renders tools links", () => {
    render(<Footer />);
    
    
    expect(screen.getByText("Figma")).toBeInTheDocument();
    expect(screen.getByText("Jira")).toBeInTheDocument();
  });

    
  it("renders FAQ link", () => {
    render(<Footer />);
    
    
    const faqLink = screen.getByRole("link", { name: "FAQs" });
    expect(faqLink).toBeInTheDocument();
    expect(faqLink).toHaveAttribute("href", "/faq");
  });
});
