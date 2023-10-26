import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivateRoutes from '../../../src/redux/PrivateRouting';
import AdminDashboard from '../../../src/screens/Dashboard/Admin/AdminDashboard';
import { MemoryRouter } from 'react-router-dom';
import api from '../../../src/network/api';

jest.mock('../../../src/network/api')
jest.mock('../../../src/screens/Dashboard/Admin/AdminDashboard', () => ({
  __esModule: true,
  default: () => <div data-testid="admin-dashboard">Admin Dashboard</div>,
}));



describe('PrivateRoutes', () => {

  const createComponent = (roleName, route) => {
    
    const mockUser = {
      enumRole: roleName,
    };
    jest
      .spyOn(window.sessionStorage.__proto__, "getItem")
      .mockReturnValue(JSON.stringify(mockUser));
   
    return render(
      <MemoryRouter initialEntries={[route]} >
          <PrivateRoutes />
      </MemoryRouter>
    );
  };

  it('should render the Admin Dashboard when the user role is ADMIN', () => {
    
    createComponent("ADMIN", "/AdminDashboard")
    createComponent("ADMIN", "/AddPmUserName")
    createComponent("ADMIN", "/CreateProject")
    createComponent("ADMIN", "/AddUserName")
    createComponent("ADMIN", "/Create")
    createComponent("ADMIN", "/AddPm")

    createComponent("ADMIN", "/Login")
    createComponent("ADMIN", "/RepoRead")
    createComponent("ADMIN", "/UserRead")
    createComponent("ADMIN", "/AddUserName")
    createComponent("ADMIN", "/PmCreate")
    createComponent("ADMIN", "/PmReadNew")
    createComponent("ADMIN", "//PmUpdate/:id")
    createComponent("ADMIN", "/UserCreate")
    createComponent("ADMIN", "/CreateRepo")
    createComponent("ADMIN", "/AddPm")
    createComponent("ADMIN", "/addUser")
    createComponent("ADMIN", "/repoRead")
    createComponent("ADMIN", "/FigmaRead")
    createComponent("ADMIN", "/FigmaCreate")
    createComponent("ADMIN", "/UserHistory")
    createComponent("ADMIN", "/Reports")
    createComponent("ADMIN", "/CreateFigmaDetails")
    createComponent("ADMIN", "/PmRequestUser")
    createComponent("ADMIN", "/addFile")
    createComponent("ADMIN", "/projectUsers")
    createComponent("ADMIN", "/addUserProject")
    createComponent("ADMIN", "/projectPms")
    createComponent("ADMIN", "/addPmProject")
    createComponent("ADMIN", "/Profile")
    createComponent("ADMIN", "/ProjectAnalytics")
    createComponent("ADMIN", "/Analytics")
    createComponent("ADMIN", "/userActivity")
    createComponent("ADMIN", "/createDriveDetails")
    // createComponent("ADMIN", "/ProjectDetails/:projectId/:projectName")
    createComponent("ADMIN", "/driveDetails")
    createComponent("ADMIN", "/Create")
    createComponent("ADMIN", "/addPm")
    createComponent("ADMIN", "/addUser")
    createComponent("ADMIN", "/createdriveDetails")
    createComponent("ADMIN", "*")

  });

  it('should render the Admin Dashboard when the user role is ADMIN', () => {
    
    createComponent("PROJECT_MANAGER", "/pmDashboard")
    createComponent("PROJECT_MANAGER", "/PmRequestForm")
    createComponent("PROJECT_MANAGER", "/repoPmDashboard")
    createComponent("PROJECT_MANAGER", "/pmProfile")
    createComponent("PROJECT_MANAGER", "/pmNotification")
    createComponent("PROJECT_MANAGER", "/showAllNotification")
    createComponent("PROJECT_MANAGER", "*")
  })

  it('should render the Admin Dashboard when the user role is ADMIN', () => {
    
    createComponent("USER", "/userProjects")
    createComponent("USER", "/userRepoRead")
    createComponent("USER", "/userProfile")
    createComponent("USER", "*")
  })

  test("should handle null user data", async () => {
    // Clear sessionStorage to ensure there's no user data
    const sampleUser = { id: 123, name: "Sample User" };
    sessionStorage.setItem("item", JSON.stringify(sampleUser));

    render(
      <MemoryRouter>
        <PrivateRoutes />
      </MemoryRouter>
    );
    const data = sessionStorage.getItem("item");
    const user = data ? JSON.parse(data) : null;
    const id = user ? user.id : null;
  
    
  });
  
  

  

});

