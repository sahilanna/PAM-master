import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PmDashboard from "../../../../src/screens/Dashboard/ProjectManager/PmDashboard";



describe("PmDashboard Component", () => {
  it("renders the component without crashing", () => {
    render(
        <MemoryRouter>
          <PmDashboard />
        </MemoryRouter>
    );
  });


it('calls handleSearchChange when the search input value changes', () => {
    const { getByPlaceholderText } = render(
     
        <MemoryRouter>
          <PmDashboard />
        </MemoryRouter>
      
    );

    const searchInput = getByPlaceholderText('Search Projects...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

  });


});
