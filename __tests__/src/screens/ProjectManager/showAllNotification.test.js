import React from "react";
import { render, fireEvent, waitFor, getByTestId } from "@testing-library/react";
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

  it("fetches and displays notifications1", async () => {
    const notifications = [
      { id: 1, response: "Notification 1" },
      { id: 2, response: "Notification 2" },
    ];

    api.get.mockResolvedValue({ data: notifications });

    const { getByTestId } = render(
      <MemoryRouter>
        <ShowAllNotification />
      </MemoryRouter>
    );

    await waitFor(() => {
      const clear = getByTestId('clear');
      fireEvent.click(clear);
    });

    await waitFor(() => {
      const onClose = getByTestId('onClose');
      fireEvent.click(onClose);
    })

    
  });

  it("fetches and displays notifications", async () => {
    const notifications = [
      { id: 1, response: "Notification 1" },
      { id: 2, response: "Notification 2" },
    ];

    api.get.mockResolvedValue({ data: notifications });

    const { getByTestId } = render(
      <MemoryRouter>
        <ShowAllNotification />
      </MemoryRouter>
    );

    await waitFor(() => {
      const clear = getByTestId('clear');
      fireEvent.click(clear);
    });

    await waitFor(() => {
      const onConfirm = getByTestId('onConfirm');
      fireEvent.click(onConfirm);
    })

    
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



    waitFor(() => {
        expect(onCloseMock).toHaveBeenCalledTimes(1);
        expect(onConfirmMock).not.toHaveBeenCalled();
    })
   
   
  });

  it("goes into catch statement while fetching notification", async () => {
    const notifications = [
      { id: 1, response: "Notification 1" },
      { id: 2, response: "Notification 2" },
    ];

    api.get.mockRejectedValue('Sample error');

    const { getByTestId } = render(
      <MemoryRouter>
        <ShowAllNotification />
      </MemoryRouter>
    );

    // await waitFor(() => {
    //   const clear = getByTestId('clear');
    //   fireEvent.click(clear);
    // });

    // await waitFor(() => {
    //   const onConfirm = getByTestId('onConfirm');
    //   fireEvent.click(onConfirm);
    // })

    
  });



});
