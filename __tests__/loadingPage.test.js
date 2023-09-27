import React from "react";
import { render } from "@testing-library/react";
import LoadingPage from "../src/atoms/loadingPage";
import "@testing-library/jest-dom";


describe("LoadingPage Component", () => {
  it("renders without errors", () => {
    render(<LoadingPage />);
  });

  it("initially sets loading to true", () => {
    const { getByText } = render(<LoadingPage />);
    const loader = getByText("Loading");
    
    // Assuming "active" is the class applied when loading is true
    const dimmer = loader.closest(".dimmer");
    expect(dimmer).toHaveClass("active");
  });

  it("renders Dimmer and Loader components when loading is true", () => {
    const { getByTestId } = render(<LoadingPage />);
    const dimmer = getByTestId("dimmer");
    const loader = getByTestId("loader");

    // Check if Dimmer and Loader components are rendered
    expect(dimmer).toBeInTheDocument();
    expect(loader).toBeInTheDocument();

    // Assuming "active" is the class applied when loading is true
    expect(dimmer).toHaveClass("active");
  });
});
