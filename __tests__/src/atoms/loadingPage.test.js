import React from "react";
import { render } from "@testing-library/react";
import LoadingPage from "../../../src/atoms/loadingPage";
import "@testing-library/jest-dom";


describe("LoadingPage Component", () => {
  it("renders without errors", () => {
    render(<LoadingPage />);
  });

  it("initially sets loading to true", () => {
    const { getByText } = render(<LoadingPage />);
    const loader = getByText("Loading");
    
    
    const dimmer = loader.closest(".dimmer");
    expect(dimmer).toHaveClass("active");
  });

  it("renders Dimmer and Loader components when loading is true", () => {
    const { getByTestId } = render(<LoadingPage />);
    const dimmer = getByTestId("dimmer");
    const loader = getByTestId("loader");

    
    expect(dimmer).toBeInTheDocument();
    expect(loader).toBeInTheDocument();

   
    expect(dimmer).toHaveClass("active");
  });
});
