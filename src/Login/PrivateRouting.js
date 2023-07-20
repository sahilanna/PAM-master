import React from "react";
import {BrowserRouter as Router,  Route,Routes } from 'react-router-dom';
import AdminDashboard from "../Components/Dashboard/Admin/AdminDashboard";
import PmCreate from "../Components/Dashboard/PM/pmCreate";
import Create from "../Components/Dashboard/Admin/Create/Create";
import PmReadNew from "../Components/Dashboard/PM/PmReadNew";
import UserCreate from "../Components/Dashboard/Users/userCreate";
import UserUpdate from "../Components/Dashboard/Users/userUpdate";
import UserAnalytics from "../Components/Dashboard/UserDashboard/userAnalytics";
import CreateRepo from "../Components/Dashboard/Admin/Create/CreateRepo";
import Reports from "../Components/Dashboard/Admin/Reports/Reports";
import PmRequestUser from "../Components/Dashboard/Admin/PmRequests/PmRequestUser";
import PmRequestForm from "../Components/Dashboard/ProjectManager/PmRequestForm";
import AddPm from "../Components/Dashboard/Admin/Create/addPm";
import AddUser from "../Components/Dashboard/Admin/Create/addUser";
import FigmaRead from "../Components/Dashboard/Admin/Figma/FigmaRead";
import FigmaCreate from "../Components/Dashboard/Admin/Figma/FigmaCreate";
import FigmaPmDashboard from "../Components/Dashboard/ProjectManager/figmaPmDashboard";
import RepoPmDashboard from "../Components/Dashboard/ProjectManager/repoPmDashboard";
import CreateFigmaDetails from "../Components/Dashboard/Admin/Figma/createFigmaDetails";
import UserHistory from "../Components/Dashboard/Admin/userHistory/userHistory";
import UserProjects from "../Components/Dashboard/UserDashboard/userProjects";
import NavBarA from "../Components/Dashboard/Admin/NavbarA";
import Login from './Login'
import RepoRead from "../Components/Dashboard/Admin/Repository/repoRead";
import UserRead from "../Components/Dashboard/Users/userRead";
import PmDashboard from "../Components/Dashboard/ProjectManager/PmDashboard";
import UserRepoRead from "../Components/Dashboard/UserDashboard/userRepoRead";
import UserFigmaRead from "../Components/Dashboard/UserDashboard/userFigmaRead";
import Analytics from "../Components/Dashboard/Admin/Analytics/Analytics";
import Profile from "../Components/Dashboard/Admin/Profile";
import UserProfile from "../Components/Dashboard/UserDashboard/userProfile";
import PmProfile from "../Components/Dashboard/ProjectManager/pmprofile";
import AddUserName from "../Components/Dashboard/Users/AddUserName";
import CreateProject from "../Components/Dashboard/Admin/Create/CreateProject";
import AddPmUserName from "../Components/Dashboard/PM/addPmUsername";
import DeleteRepo from "../Components/Dashboard/Admin/Repository/deleteRepo";
import AddFile from "../Components/Dashboard/Admin/Create/addFile";
import ProjectUsers from "../Components/Dashboard/Admin/Read/projectUsers";
import AddUserProject from "../Components/Dashboard/Admin/Create/addUserProject";
import ProjectAnalytics from "../Components/Dashboard/Admin/Analytics/projectAnalytics";
import ProjectPms from "../Components/Dashboard/Admin/Read/projectPms";
import AddPmProject from "../Components/Dashboard/Admin/Create/addPmProject";

const PrivateRoutes = () => {
    let data = sessionStorage.getItem("item");
    console.log(data.enumRole)
    console.log(data)
    let user = JSON.parse(data);
    console.log(user.role)
    const role=user.enumRole
   const id = user ? user.id : null;
    console.log(id)
   
    return (
        <>
          {role === "ADMIN" && (
            <Routes>
                <Route path="/AddPmUserName" element={<AddPmUserName/>} />
               <Route path="/AdminDashboard" element={<AdminDashboard />} />
               <Route path='/CreateProject' element={<CreateProject/>}/>
              <Route path="/AddUserName" element={<AddUserName/>} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/RepoRead" element={<RepoRead/>} />
              <Route path="/UserRead" element={<UserRead/>} />
              <Route path="/PmCreate" element={<PmCreate />} />
              <Route path="/PmReadNew" element={<PmReadNew />} />
              <Route path="//PmUpdate/:id" element={<PmReadNew />} />
              <Route path="/UserCreate" element={<UserCreate />} />
              <Route path="/CreateRepo" element={<CreateRepo />} />
              <Route path="/addCollab" element={<addCollab />} />
              <Route path="/AddPm" element={<AddPm/>} />
              <Route path="/addUser" element={<AddUser />} />
              <Route path="/NavbarA" element={<NavBarA/>} />
              <Route path="/repoRead" element={<repoRead/>} />
              <Route path="/FigmaRead" element={<FigmaRead/>} />
              <Route path="/FigmaCreate" element={<FigmaCreate />} />
              <Route path="/UserHistory" element={<UserHistory />} />
              <Route path="/Reports" element={<Reports />} />
              <Route path="/CreateFigmaDetails" element={<CreateFigmaDetails/>} />
              <Route path="/PmRequestUser" element={<PmRequestUser/>} />
              <Route path='/deleteRepo' element={<DeleteRepo/>}/>
              <Route path='/addFile' element={<AddFile/>}/>
              <Route path='/projectUsers' element={<ProjectUsers/>}/>
              <Route path='/addUserProject' element={<AddUserProject/>}/>
              <Route path='/projectPms' element={<ProjectPms/>}/>
              <Route path='/addPmProject' element={<AddPmProject/>}/>
              <Route path='/Profile' element={<Profile/>}/>
              <Route path='/ProjectAnalytics' element={<ProjectAnalytics/>}/>
              <Route path='/Analytics' element={<Analytics/>}/>
             <Route path='/Create' element={<Create/>}/>
             <Route path='/addPm' element={<AddPm/>}/>
             <Route path='/addUser' element={<AddUser/>}/>
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          )}
          {role === "PROJECT_MANAGER" && (
            <Routes>
              <Route path="/pmDashboard" element={<PmDashboard />} />
              <Route path="/figmaPmDashboard" element={<FigmaPmDashboard />} />
              <Route path="/PmRequestForm" element={<PmRequestForm />} />
              <Route path="/repoPmDashboard" element={<RepoPmDashboard/>} />
              <Route path='/pmProfile' element={<PmProfile/>}/>
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          )}
          {role === "USER" && (
            <Routes>
              <Route path="/userProjects" element={<UserProjects/>} />
              <Route path="/userAnalytics" element={<UserAnalytics/>} />
              <Route path="/userRepoRead" element={<UserRepoRead />} />
              <Route path="/userFigmaRead" element={<UserFigmaRead/>} />
              <Route path='/userProfile' element={<UserProfile/>}/>
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          )}
        </>
      );
}
export default PrivateRoutes;