import React from "react";
import {render,fireEvent,waitFor,screen,getByTestId,} from "@testing-library/react";
import AddPmProjectUI from "../../../../../../src/screens/Dashboard/Admin/Create/addPmProject/addPmProjectUI";
import "@testing-library/jest-dom";

describe("AddPmProjectUI Component", () => {
  const mockProps = {
    projectName: "Test Project",
    user: [
      { key: "1", value: "pm1", text: "PM 1" },
      { key: "2", value: "pm2", text: "PM 2" },
    ],
    errorMessage: "",
    selectedUser: "pm1",
    handleUserChange: jest.fn(),
    handleSubmit: jest.fn(),
    showOTPMoal: false,
    handleOTPClose: jest.fn(),
    setOtpp: jest.fn(),
    handleOTPSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  it("renders the component with initial props", () => {
    render(<AddPmProjectUI {...mockProps} />);

    expect(screen.getByText("Add PM to project")).toBeInTheDocument();
  });

  it("calls handleSubmit when submitting the form", async () => {
    render(<AddPmProjectUI {...mockProps} />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockProps.handleSubmit).toHaveBeenCalled();
    });
  });

  it("opens the OTP modal when showOTPMoal is true", async () => {
    const updatedProps = {
      ...mockProps,
      showOTPMoal: true,
    };

    render(<AddPmProjectUI {...updatedProps} />);

    expect(screen.getByText("Enter OTP")).toBeInTheDocument();

    const otpInput = screen.getAllByTestId("modal");

    otpInput.value = "123456";
    const otpSubmitButton = screen.getByText("Submit OTP");
    fireEvent.click(otpSubmitButton);

    waitFor(() => {
      expect(updatedProps.handleOTPSubmit).toHaveBeenCalledWith("123456");
    });
  });

  test("renders OTP input and handles input change", () => {
    const mockSetOtpp = jest.fn();

    const { getByTestId } = render(
      <AddPmProjectUI
        projectName="Test Project"
        user={[]}
        errorMessage=""
        selectedUser={null}
        handleUserChange={() => {}}
        handleSubmit={() => {}}
        showOTPMoal={true}
        handleOTPClose={() => {}}
        setOtpp={mockSetOtpp}
        handleOTPSubmit={() => {}}
        onClose={() => {}}
      />
    );

    const otpInput = getByTestId("otp");
    fireEvent.change(otpInput, { target: { value: "123456" } });

    expect(otpInput.value).toBe("123456");
    expect(mockSetOtpp).toHaveBeenCalledWith("123456");
  });
});
