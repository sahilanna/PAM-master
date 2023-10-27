import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ProjectList from "../../../../../src/screens/Dashboard/Admin/Read/projectList";
import { MemoryRouter } from "react-router-dom";
import api from "../../../../../src/network/api";
import { ngrokUrl } from "../../../../../src/network/config";
import userEvent from "@testing-library/user-event";

jest.mock("../../../../../src/network/api", () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: [
          {
            id: "1",
            name: "Sample Name 1",
            email: "sample1@example.com",
            gitHubUsername: "github1",
          },
        ],
      })
    ),
  };
});

describe("ProjectList Component", () => {
  it('calls handleAddItem when the "Add User" button is clicked', () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const handleAddItemMock = jest.fn();

    render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          handleAddItem={handleAddItemMock}
        />
      </MemoryRouter>
    );
  });

  it("renders the list of PMs or users", () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "users";
    const items = [
      {
        id: "1",
        name: "User1",
        email: "user1@example.com",
        gitHubUsername: "user1github",
      },
      {
        id: "2",
        name: "User2",
        email: "user2@example.com",
        gitHubUsername: "user2github",
      },
    ];

    const { getByText, queryByText } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
        />
      </MemoryRouter>
    );
  });

  // it.only('calls close otp when button is clicked', async() => {
  //   const item = {
  //     gitHubUsername: null, // Set gitHubUsername to a falsy value
  //     // ...other properties
  //   };

  //   const { getByText } = render(<MemoryRouter>
  //      <ProjectList item={item} />
  //   </MemoryRouter>

  //   );

  //   // Use getByText to check if '--' is present in the rendered output
  //   const dashText = getByText('--');
  //   expect(dashText).toBeInTheDocument();

  // });

  it("calls close otp when button is clicked", async () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const getItemUrl = type === "pms" ? "project_manager" : "user";
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleDeleteItemMock = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleDeleteItem={handleDeleteItemMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://${ngrokUrl}/projects/${projectId}/users/${getItemUrl}`
      );
    });

    waitFor(() => {
      fireEvent.click(getByTestId("delete-user"));
    });

    waitFor(() => {
      fireEvent.click(screen.getByTestId("onClose"));
    });
  });

  it('calls handleDeleteItem when the "confirm" button is clicked', async () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const getItemUrl = type === "pms" ? "project_manager" : "user";
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleDeleteItemMock = jest.fn();

    api.post = jest.fn().mockResolvedValue({ data: "OTP sent" });

    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleDeleteItem={handleDeleteItemMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://${ngrokUrl}/projects/${projectId}/users/${getItemUrl}`
      );
    });

    waitFor(() => {
      fireEvent.click(getByTestId("delete-user"));
    });

    waitFor(() => {
      fireEvent.click(screen.getByTestId("confirm"));
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("close-otp"));
    });
  });

  it('calls handleDeleteItem when the "confirm" button is clicked', async () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const getItemUrl = type === "pms" ? "project_manager" : "user";
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleDeleteItemMock = jest.fn();
    const event = new Event("submit", { bubbles: true, cancelable: true });

    api.post = jest.fn().mockRejectedValue("Sample Error");

    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleDeleteItem={handleDeleteItemMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://${ngrokUrl}/projects/${projectId}/users/${getItemUrl}`
      );
    });

    waitFor(() => {
      fireEvent.click(getByTestId("delete-user"));
    });

    waitFor(() => {
      fireEvent.click(screen.getByTestId("confirm"));
    });
  });

  it('calls handleDeleteItem when the "confirm" button is clicked', async () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const getItemUrl = type === "pms" ? "project_manager" : "user";
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleDeleteItemMock = jest.fn();
    const event = new Event("submit", { bubbles: true, cancelable: true });

    api.post = jest.fn().mockResolvedValue({ data: "OTP sent" });

    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleDeleteItem={handleDeleteItemMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://${ngrokUrl}/projects/${projectId}/users/${getItemUrl}`
      );
    });

    waitFor(() => {
      fireEvent.click(getByTestId("delete-user"));
    });

    waitFor(() => {
      fireEvent.click(screen.getByTestId("confirm"));
    });

    await waitFor(() => {
      const githubUsernameInput = screen.getByTestId("otp-input");
      fireEvent.change(githubUsernameInput, { target: { value: "12345" } });
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit"), { event });
    });
  });

  it('calls handleDeleteItem when the "confirm" button is clicked and goes to if block', async () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const getItemUrl = type === "pms" ? "project_manager" : "user";
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleDeleteItemMock = jest.fn();
    const event = new Event("submit", { bubbles: true, cancelable: true });

    api.post = jest.fn().mockResolvedValue({ data: true });
    api.post = jest.fn().mockResolvedValue({ data: "OTP sent" });

    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleDeleteItem={handleDeleteItemMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://${ngrokUrl}/projects/${projectId}/users/${getItemUrl}`
      );
    });

    waitFor(() => {
      fireEvent.click(getByTestId("delete-user"));
    });

    waitFor(() => {
      fireEvent.click(screen.getByTestId("confirm"));
    });

    await waitFor(() => {
      const githubUsernameInput = screen.getByTestId("otp-input");
      fireEvent.change(githubUsernameInput, { target: { value: "12345" } });
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit"), { event });
    });
  });

  it("goes to catch block of handleConfirmDelete", async () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const getItemUrl = type === "pms" ? "project_manager" : "user";
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleDeleteItemMock = jest.fn();
    const event = new Event("submit", { bubbles: true, cancelable: true });

    api.post = jest.fn().mockResolvedValue({ data: "OTP sent" });
    api.delete = jest.fn().mockRejectedValue("Sample Error");
    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleDeleteItem={handleDeleteItemMock}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        `https://${ngrokUrl}/projects/${projectId}/users/${getItemUrl}`
      );
    });

    waitFor(() => {
      fireEvent.click(getByTestId("delete-user"));
    });

    waitFor(() => {
      fireEvent.click(screen.getByTestId("confirm"));
    });

    await waitFor(() => {
      const githubUsernameInput = screen.getByTestId("otp-input");
      fireEvent.change(githubUsernameInput, { target: { value: "12345" } });
    });

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("submit"), { event });
    });
  });

  it('calls handleAddItem when the "Add" button is clicked', async () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleAddItemMock = jest.fn();
    const navigateMock = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleAddItem={handleAddItemMock}
          navigate={navigateMock}
        />
      </MemoryRouter>
    );

    const addButton = getByTestId("add");

    await waitFor(() => {
      fireEvent.click(addButton);
    });

    waitFor(() => {
      expect(handleAddItemMock).toHaveBeenCalled();

      expect(navigateMock).toHaveBeenCalledWith(
        type === "pms" ? "/addPmProject" : "/addUserProject",
        {
          state: { projectId, projectName },
        }
      );
    });
  });

  it('calls handleAddItem when the "Add" button is clicked', async () => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "users";
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleAddItemMock = jest.fn();
    const navigateMock = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleAddItem={handleAddItemMock}
          navigate={navigateMock}
        />
      </MemoryRouter>
    );

    const addButton = getByTestId("add");

    await waitFor(() => {
      fireEvent.click(addButton);
    });

    waitFor(() => {
      expect(handleAddItemMock).toHaveBeenCalled();

      expect(navigateMock).toHaveBeenCalledWith(
        type === "pms" ? "/addPmProject" : "/addUserProject",
        {
          state: { projectId, projectName },
        }
      );
    });
  });

  it('handles otp submission with a successful response and user update', async() => {
    const projectId = "123";
    const projectName = "Sample Project";
    const type = "pms";
    const getItemUrl = type === 'pms' ? 'project_manager' : 'user';
    const items = [
      {
        id: "1",
        name: "PM1",
        email: "pm1@example.com",
        gitHubUsername: "pm1github",
      },
    ];
    const handleDeleteItemMock = jest.fn();
    const event = new Event("submit", { bubbles: true, cancelable: true });

    api.post = jest.fn().mockResolvedValue({ data: 'OTP sent' });

    const { getByTestId } = render(
      <MemoryRouter>
        <ProjectList
          projectId={projectId}
          projectName={projectName}
          type={type}
          items={items}
          handleDeleteItem={handleDeleteItemMock}
        />
      </MemoryRouter>
    );
   

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`https://${ngrokUrl}/projects/${projectId}/users/${getItemUrl}`);
    });
   
    waitFor(() =>{
      fireEvent.click(getByTestId('delete-user'));
    });

    waitFor(() =>{
      fireEvent.click(screen.getByTestId("confirm"));
    })



   
    await waitFor(() =>{
      const githubUsernameInput = screen.getByTestId("otp-input");
      fireEvent.change(githubUsernameInput, { target: { value: "12345" } });
    })
    
    await waitFor(() =>{
      fireEvent.click(screen.getByTestId("submit"), { event });
    })
   

  });



  


});
