import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserProjects from "../../../../src/screens/Dashboard/UserDashboard/userProjects";


describe("PmDashboard Component", () => {
  it("renders the component without crashing", () => {
    render(
        <MemoryRouter>
          <UserProjects />
        </MemoryRouter>
    );
  });


it('calls handleSearchChange when the search input value changes', () => {
    const { getByPlaceholderText } = render(
     
        <MemoryRouter>
          <UserProjects/>
        </MemoryRouter>
      
    );

    const searchInput = getByPlaceholderText('Search Projects...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

  });


});
