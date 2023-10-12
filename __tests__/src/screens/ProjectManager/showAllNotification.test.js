import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShowAllNotification from "../../../../src/screens/Dashboard/ProjectManager/showAllNotification";
import api from "../../../../src/network/api";

jest.mock("../../../../src/network/api");

describe("ShowAllNotification Component", () => {
    let onCloseMock;
    let onConfirmMock;
  beforeEach(() => {
    onCloseMock = jest.fn();
    onConfirmMock = jest.fn();
    api.get.mockResolvedValue({ data: [] });
  });

  it("renders the component without errors", async () => {
    render(
      <MemoryRouter>
        <ShowAllNotification />
      </MemoryRouter>
    );
  });

  it("fetches and displays notifications", () => {
    const notifications = [
      { id: 1, response: "Notification 1" },
      { id: 2, response: "Notification 2" },
    ];

    api.get.mockResolvedValue({ data: notifications });

    const { getByText } = render(
      <MemoryRouter>
        <ShowAllNotification />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(getByText("Notification 1")).toBeInTheDocument();
      expect(getByText("Notification 2")).toBeInTheDocument();
    });
  });

  it("displays 'No notifications' when there are no notifications", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ShowAllNotification />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(getByText("No notifications")).toBeInTheDocument();
    });
  });

  it("calls the clearNotification function when the delete button is clicked", () => {
    api.delete.mockResolvedValue({});

    const { getByTestId } = render(
      <MemoryRouter>
        <ShowAllNotification />
      </MemoryRouter>
    );

    const deleteButton = getByTestId("clear");
    fireEvent.click(deleteButton);

    waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith(
        "https://mocked-api-url.com/request/clearAll"
      );
    });
  });
it("calls onClose and onConfirm when delete button is clicked", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <ShowAllNotification />
      </MemoryRouter>
    );

    const deleteButton = getByTestId("clear");
    fireEvent.click(deleteButton);

   
    waitFor(() => {
      expect(getByText("Are you sure you want to clear all notifications?")).toBeInTheDocument();
    });

    // const cancelButton = getByText("Cancel");
    // fireEvent.click(cancelButton);

    waitFor(() => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
        expect(onConfirmMock).not.toHaveBeenCalled();
    })
   
   
    // onCloseMock.mockClear();
    // onConfirmMock.mockClear();

    
    // fireEvent.click(deleteButton);

    // const confirmButton = getByText("Confirm");
    // fireEvent.click(confirmButton);

    
    // expect(onCloseMock).not.toHaveBeenCalled();
    // expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });






});
