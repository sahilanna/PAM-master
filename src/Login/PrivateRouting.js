import React from "react";
import {BrowserRouter as Router , Route,Routes } from 'react-router-dom';
import AdminDashboard from "../Components/Dashboard/Admin/AdminDashboard";
import PmCreate from "../Components/Dashboard/PM/pmCreate";
import Create from "../Components/Dashboard/Admin/Create/Create";
import Read from "../Components/Dashboard/Admin/Read/Read";
import Update from "../Components/Dashboard/Admin/Update/Update";
import PmReadNew from "../Components/Dashboard/PM/PmReadNew";
import PmUpdate from "../Components/Dashboard/PM/pmUpdate";
import UserCreate from "../Components/Dashboard/Users/userCreate";
import UserUpdate from "../Components/Dashboard/Users/userUpdate";

import CreateRepo from "../Components/Dashboard/Admin/Create/CreateRepo";
import Reports from "../Components/Dashboard/Admin/Reports/Reports";
import PmRequestUser from "../Components/Dashboard/Admin/PmRequests/PmRequestUser";
import PmRequestForm from "../Components/Dashboard/ProjectManager/PmRequestForm";
import addCollab from "../Components/Dashboard/Admin/addCollab/addCollab";
import AddPm from "../Components/Dashboard/Admin/Create/addPm";
import AddUser from "../Components/Dashboard/Admin/Create/addUser";
import FigmaRead from "../Components/Dashboard/Admin/Figma/FigmaRead";
import FigmaCreate from "../Components/Dashboard/Admin/Figma/FigmaCreate";
import FigmaPmDashboard from "../Components/Dashboard/ProjectManager/figmaPmDashboard";
import RepoPmDashboard from "../Components/Dashboard/ProjectManager/repoPmDashboard";
import CreateFigmaDetails from "../Components/Dashboard/Admin/Figma/createFigmaDetails";
import UserHistory from "../Components/Dashboard/Admin/userHistory/userHistory";
import UserProjects from "../Components/Dashboard/UserDashboard/userProjects";
import FinalForm from "../Components/Dashboard/Admin/Create/finalForm";
import { Navigate } from "react-router-dom";
import NavBarA from "../Components/Dashboard/Admin/NavbarA";
import Login from './Login'
import RepoRead from "../Components/Dashboard/Admin/Repository/repoRead";
import UserRead from "../Components/Dashboard/Users/userRead";
import PmDashboard from "../Components/Dashboard/ProjectManager/PmDashboard";
import UserRepoRead from "../Components/Dashboard/UserDashboard/userRepoRead";
import UserFigmaRead from "../Components/Dashboard/UserDashboard/userFigmaRead";
import Logout from "./Logout";
import Analytics from "../Components/Dashboard/Admin/Analytics/Analytics";
import ProjectAnalytics from "../Components/Dashboard/Admin/Analytics/projectAnalytics";
import Profile from "../Components/Dashboard/Admin/Profile";
import UserProfile from "../Components/Dashboard/UserDashboard/userProfile";
import PmProfile from "../Components/Dashboard/ProjectManager/pmprofile";
import AddUserName from "../Components/Dashboard/Users/AddUserName";
import CreateProject from "../Components/Dashboard/Admin/Create/CreateProject";
import AddPmUserName from "../Components/Dashboard/PM/addPmUsername";
import DeleteRepo from "../Components/Dashboard/Admin/Repository/deleteRepo";
import AddFile from "../Components/Dashboard/Admin/Create/addFile";
import ViewFile from "../Components/Dashboard/Admin/Read/ViewFile";


const PrivateRoutes = () => {
    let data = sessionStorage.getItem("item");
    console.log(data.enumRole)
    console.log(data)
    
    let user = JSON.parse(data);
    console.log(user.role)
    const role=user.enumRole
   const id = user ? user.id : null;
    // console.log(id)
    // if (!user || !user.role) {
    //   return <Navigate to="/Login" />

    // }
    return (
        <>
          {role== "ADMIN" && (
            <Routes>
                
                <Route path="/AddPmUserName" element={<AddPmUserName/>} />
               <Route path="/AdminDashboard" element={<AdminDashboard />} />
               <Route path='/CreateProject' element={<CreateProject/>}/>
              <Route path="/AddUserName" element={<AddUserName/>} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/Read" element={<Read/>} />
              <Route path="/RepoRead" element={<RepoRead/>} />
              <Route path="/UserRead" element={<UserRead/>} />
              <Route path='/Analytics' element={<Analytics/>}/>
              <Route path="/Update/:projectId" element={<Update />} />
              <Route path="/PmCreate" element={<PmCreate />} />
              <Route path="/PmReadNew" element={<PmReadNew />} />
              <Route path="//PmUpdate/:id" element={<PmReadNew />} />
              <Route path="/UserCreate" element={<UserCreate />} />
              <Route path="/UserUpdate/:id" element={<UserUpdate />} />
            
              <Route path="/CreateRepo" element={<CreateRepo />} />
              <Route path="/addCollab" element={<addCollab />} />
              <Route path="/AddPm" element={<AddPm/>} />
              <Route path="/addUser" element={<AddUser />} />
              <Route path="/finalForm" element={<FinalForm />} />
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
            
              <Route path='/Profile' element={<Profile/>}/>
              <Route path='/projectAnalytics' element={<ProjectAnalytics/>}/>
              {/* <Route path='/gitCreate' element={<GitCreate/>}/> */}
             
             {/* <Route path='/projectAnalytics' element={<ProjectAnalytics/>}/> */}
             <Route path='/Create' element={<Create/>}/>
             <Route path='/addPm' element={<AddPm/>}/>
             <Route path='/addUser' element={<AddUser/>}/>
             
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          )}
          {role=== "PROJECT_MANAGER" && (
            <Routes>
               <Route path='/Logout' element={<Logout/>}/>
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
               <Route path='/Logout' element={<Logout/>}/>
              <Route path='/userProjects' element={<UserProjects/>} />
              <Route path='/userFigmaRead' element={<UserFigmaRead/>}/>
              <Route path='/userRepoRead' element={<UserRepoRead/>}/>
              

             
              <Route path='/userProfile' element={<UserProfile/>}/>
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
          )}
        </>
      );

}

export default PrivateRoutes;