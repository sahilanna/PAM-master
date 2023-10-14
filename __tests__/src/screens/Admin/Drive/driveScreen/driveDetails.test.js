import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DriveRead from "../../../../../../src/screens/Dashboard/Admin/Drive/driveScreen/driveDetails";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import LoadingPage from "../../../../../../src/atoms/loadingPage";


test("renders DriveRead component", () => {
  render(
    <MemoryRouter>
      <DriveRead />
    </MemoryRouter>
  );
});










// test("renders DriveRead component with loading", () => {
//   render(
//     <MemoryRouter>
//       <DriveRead />
//     </MemoryRouter>
//   );
// });

// test("handles search input", () => {
//   render(
//     <MemoryRouter>
//       <DriveRead />
//     </MemoryRouter>
//   );

  
//   const searchInput = screen.getByPlaceholderText("Search Project");
//   fireEvent.change(searchInput, { target: { value: "Project 1" } });


//   expect(searchInput).toHaveValue("Project 1");
// });


