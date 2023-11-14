import React from "react";
import {render,fireEvent,waitFor,getByTestId,} from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateDriveDetailsUI from "../../../../../../../src/screens/dashboard/admin/drive/createDrive/createDriveDetailsUI";

describe("CreateDriveDetailsUI", () => {
  const mockProps = {
    driveURL: "https://example.com",
    isValidUrl: true,
    proj: [
      { key: "project1", text: "Project 1", value: "Project 1" },
      { key: "project2", text: "Project 2", value: "Project 2" },
    ],
    handleUrlChange: jest.fn(),
    handleProjChange: jest.fn(),
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  it("renders the CreateDriveDetailsUI component", () => {
    const { getByTestId, getByText } = render(
      <CreateDriveDetailsUI {...mockProps} />
    );

    expect(getByTestId("projects")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("calls the handleUrlChange function when URL input changes", () => {
    const { getByPlaceholderText } = render(
      <CreateDriveDetailsUI {...mockProps} />
    );
    const input = getByPlaceholderText("Enter Drive Link");
    fireEvent.change(input, { target: { value: "https://new-example.com" } });

    expect(mockProps.handleUrlChange).toHaveBeenCalledTimes(1);
  });

  it("calls the handleProjChange function when the project dropdown changes", () => {
    const { getByTestId } = render(<CreateDriveDetailsUI {...mockProps} />);
    const dropdown = getByTestId("projects");

    fireEvent.click(dropdown);
  });

  it("calls the handleSubmit function when the form is submitted", async () => {
    const { getByText } = render(<CreateDriveDetailsUI {...mockProps} />);
    const submitButton = getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockProps.handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("calls the onClose function when the component is closed", () => {
    const { getByText } = render(<CreateDriveDetailsUI {...mockProps} />);
    const closeButton = getByText("X");
    fireEvent.click(closeButton);

    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });
});
