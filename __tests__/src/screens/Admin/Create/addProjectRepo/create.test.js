import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Create from "../../../../../../src/screens/Dashboard/Admin/Create/addProjectRepo/Create";
import { MemoryRouter } from "react-router-dom";
import api from "../../../../../../src/network/api";
import { act } from "react-dom/test-utils";

jest.mock("../../../../../../src/network/api");

it("renders create component and close form on click of close button", async () => {
  await act(async () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
  });

  const onClose = screen.getByTestId("close");
  fireEvent.click(onClose);
});

it("handle submit and dropdown functions", async () => {
  const sampleProjects = [
    {
      repoId: 1,
      name: "First Project",
      description: "This is the first project",
    },
    {
      repoId: 2,
      name: "Second Project",
      description: "This is the second project",
    },
  ];

  const api = require("../../../../../../src/network/api");

  await api.default.get.mockResolvedValueOnce({ data: sampleProjects });

  const sampleRepos = [
    {
      projectId: 1,
      projectName: "Repo1",
      projectDescription: "This is the first repo",
    },
    {
      projectId: 2,
      projectName: "Repo2",
      projectDescription: "This is the second repo",
    },

    {
      projectId: 3,
      projectName: "Repo3",
      projectDescription: "This is the second repo",
    },
  ];

  await api.default.get.mockResolvedValueOnce({ data: sampleRepos });

  await act(async () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
  });

  const selectProjectDropdown = screen.getByTestId("project-dropdown");
  fireEvent.click(selectProjectDropdown);

  await waitFor(() => {
    const selectOption = screen.getByText("Repo3");
    fireEvent.click(selectOption);
  });

  await waitFor(() => {
    const selectRepoDropdown = screen.getByTestId("repo-dropdown");
    fireEvent.click(selectRepoDropdown);
  });

  const selectedOption = screen.getByText("Second Project");
  fireEvent.click(selectedOption);

  await waitFor(() => {
    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
  });

});
