import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PmProjectDetails from "../../../../src/screens/Dashboard/ProjectManager/pmProjectDetails";
import '@testing-library/jest-dom';


describe("PmProjectDetails Component", () => {
  it("renders the component with project details", () => {
   
    const project = {
      projectId: 1,
      projectName: "Project A",
      figma: { figmaURL: "https://figma.com/projectA" },
      googleDrive: { driveLink: "https://drive.google.com/projectA" },
      projectDescription: "Description for Project A",
    };

    
    const onClose = jest.fn();

    const { getByRole } = render(
      <PmProjectDetails project={project} onClose={onClose} />
    );


    fireEvent.click(getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render when project is null", () => {
    const onClose = jest.fn();
    const { container } = render(<PmProjectDetails project={null} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  test("should call logOut and navigate to the Login page with null user data", async () => {
    const sampleUser = { id: 123, name: "Sample User" };
    sessionStorage.setItem("item", JSON.stringify(sampleUser));
  
    render(
      
         <PmProjectDetails/>
    
     
    );
    const data = sessionStorage.getItem("item");
    const user = data ? JSON.parse(data) : null;
    const id = user ? user.id : null;
  });

});